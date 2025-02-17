import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginMiddleware } from "../../middlwares/login";
import { JWT_SECRET } from "@repo/common/secrets";
import { LoginSchema } from "@repo/common/zodSchema";
import { hashPassword } from "../../utils/hashPassword";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";

export const userRouter: Router = Router();

userRouter.post(
  "/signin",
  async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    const data = LoginSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(403).json({
        msg: "Incorrect inputs",
      });
    }

    try {
      const storedPassword = await prisma.user.findFirst({
        where: {
          username: username,
        },
        select: {
          password: true,
          id: true,
        },
      });

      if (!storedPassword) {
        return res.status(403).json({
          msg: "Invalid username",
        });
      }

      const passwordMatched = await bcrypt.compare(
        password,
        storedPassword?.password
      );

      if (passwordMatched) {
        const token = jwt.sign(
          {
            id: storedPassword.id,
          },
          JWT_SECRET
        );
        res.cookie("token", `Bearer ${token}`, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });
        return res.status(200).json({
          msg: "Logged in sucessfully",
          token: token,
        });
      } else {
        return res.status(403).json({
          msg: "Invalid password",
        });
      }
    } catch (error) {
      return res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
);

userRouter.post(
  "/signup",
  async (req: Request, res: Response): Promise<any> => {
    const { firstName, lastName, username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
      const isUserExists = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      if (isUserExists) {
        return res.status(403).json({
          msg: "User already exists",
        });
      }
      const user = await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName,
        },
        select: {
          id: true,
        },
      });

      const token = jwt.sign(
        {
          id: user.id,
        },
        JWT_SECRET as string
      );
      res.cookie("token", `Bearer ${token}`, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      return res.json({
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
);
