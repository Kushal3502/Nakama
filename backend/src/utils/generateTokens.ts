import jwt from "jsonwebtoken";

export const generateAccessToken = (id: number, username: string) => {
  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  return token;
};

export const generateRefreshToken = (id: number, username: string) => {
  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  return token;
};
