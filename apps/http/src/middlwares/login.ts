import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/secrets";

export async function loginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(403).json({
      msg: "Unauthorized",
    });
  } else {
    const decoded = jwt.verify(token, JWT_SECRET as string);

    if (decoded) {
      //@ts-ignore
      req.userId = decoded.userId;
      next();
    } else {
      res.status(403).json({
        msg: "Unauthorized",
      });
    }
  }
}
