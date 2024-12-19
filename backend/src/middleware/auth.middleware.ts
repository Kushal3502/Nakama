import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { client } from "..";

export interface AuthRequest extends Request {
  user?: JwtCustomPayload;
}

interface JwtCustomPayload {
  id: number;
  username: string;
  avatar?: string | null;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  // Check for missing token
  if (!token) {
    res.status(401).json({ message: "Unauthorized request" });
    return;
  }

  try {
    // verify token
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtCustomPayload;

    const currUser = await client.user.findUnique({
      where: { id: decodedToken.id },
      select: {
        id: true,
        avatar: true,
        username: true,
      },
    });

    if (!currUser) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    req.user = {
      id: currUser.id,
      username: currUser.username,
      avatar: currUser.avatar,
    };
    next();
  } catch (error) {
    console.log("Auth middleware error :: ", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
