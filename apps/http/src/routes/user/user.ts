import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { loginMiddleware } from "../../middlwares/login";
import { JWT_SECRET } from "@repo/common/secrets"
import { LoginSchema } from "@repo/common/zodSchema"
import { hashPassword } from "../../utils/hashPassword";
import { prisma } from "@repo/db/src"
import bcrypt from "bcrypt"


const userRouter = Router();

userRouter.post('/signin', async (req: Request, res: Response): Promise<any> => {

    const { username, password } = req.body;

    const data = LoginSchema.safeParse(req.body);
    if(!data.success){
        return res.status(403).json({
            msg: "Incorrect inputs"
        })
    }

    const storedPassword  = await prisma.user.findFirst({
        where:{
            username: username
        },
        select:{
            password:true,
            id:true
        }
    })

    if(!storedPassword){
        return res.status(403).json({
            msg: "Invalid username"
        })
    }

    const passwordMatched = await bcrypt.compare(password, storedPassword?.password);

    if(passwordMatched){
        const token = jwt.sign(storedPassword.id, JWT_SECRET)
        return res.status(200).json({
            msg: "Logged in sucessfully",
            token: token
        })
    }
    else{
        return res.status(403).json({
            msg: "Invalid password"
        })
    }
})

userRouter.post('/signup', async (req: Request, res: Response): Promise<any> => {
    const { firstName, lastName, username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data:{
            username:username,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        },
        select:{
            id: true
        }
    })

    const token = jwt.sign(user.id, JWT_SECRET as string)
    return res.json({
        token : token
    })
})

