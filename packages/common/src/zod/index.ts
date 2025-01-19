import z from "zod"
export const LoginSchema = z.object({
    username: z.string().min(3).max(15),
    password: z.string().min(6).max(15),
})

export const signUpSchema = z.object({
    username: z.string().min(3).max(15),
    password: z.string().min(6).max(15),
    firstName: z.string().min(3),
    lastName: z.string().min(1)
})
