import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/generateTokens";
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
    const refreshToken = generateAccessToken(currUser.id, currUser.username);

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

export const checkAuth = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}