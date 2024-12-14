import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
import { AuthRequest } from "../middleware/auth.middleware";

const client = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, avatar } = req.body;

  if (!username || !password || !avatar)
    throw new Error("All fields are required");

  try {
    //  check if the username already exists or not
    const isExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (isExists) {
      res.status(404).json({
        success: false,
        message: "Username already taken",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
      username,
      password: hashedPassword,
      avatar,
    };

    const newUser = await client.user.create({
      data,
    });

    if (!newUser) {
      res.status(404).json({
        success: false,
        message: "User not created",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) throw new Error("All fields are required");

  try {
    //   first check if the username already exists or not
    const currUser = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (!currUser) {
      res.status(404).json({
        success: false,
        message: "Invalid username",
      });
      return;
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(password, currUser.password);

    if (!isPasswordCorrect) {
      res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // if successful -> generate tokens and set cookie
    const accessToken = generateAccessToken(currUser.id, currUser.username);
    const refreshToken = generateRefreshToken(currUser.id, currUser.username);

    // add refresh token to database
    await client.user.update({
      where: { id: currUser.id },
      data: { refreshToken },
    });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        user: {
          id: currUser.id,
          username: currUser.username,
        },
        message: "User logged in successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const logoutUser = async (req: AuthRequest, res: Response) => {
  try {
    // clear all cookies
    res.clearCookie("accessToken").clearCookie("refreshToken");

    // set req.user = null and remove refresh token from database
    if (req.user) {
      const currUser = await client.user.findFirst({
        where: {
          id: req.user.id,
        },
      });

      if (currUser) {
        await client.user.update({
          where: {
            id: req.user.id,
          },
          data: { refreshToken: null },
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const currentUser = async (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
      message: "User fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const generateNewAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401).json({ message: "No refresh token provided" });
    return;
  }
  try {
    // verify the refresh token
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { id: number; username: string };

    const user = await client.user.findFirst({
      where: {
        id: decodedToken.id,
        refreshToken,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid refresh token" });
    }

    // generate new access token
    const newAccessToken = generateAccessToken(
      decodedToken.id,
      decodedToken.username
    );

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Access token refreshed successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
