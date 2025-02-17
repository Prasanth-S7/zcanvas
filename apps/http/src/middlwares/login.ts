import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/secrets";

export async function loginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token?.split(" ")[1];
  console.log(req.cookies.token)
  console.log(token);

  if (!token) {
    res.status(403).json({
      msg: "Unauthorized",
    });
  } else {
    const decoded = jwt.verify(token, JWT_SECRET as string);

    if (decoded) {
      console.log(decoded);
      //@ts-ignore
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({
        msg: "Unauthorized",
      });
    }
  }
}
