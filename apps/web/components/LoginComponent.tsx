"use client"
import { useState } from "react"
import { toast } from "sonner"
import { BACKEND_URL } from "../config/config"
import { axiosInstance } from "../config/axiosInstance"
import { useRouter } from "next/navigation"
export default function LoginComponent() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const onHandleLogin = async () => {
        try{
            const res = await axiosInstance.post(`${BACKEND_URL}/api/v1/user/signin`, {
                username: username,
                password: password
            }, {
                withCredentials: true
            })
            if(res.status === 200){
                toast.success("Logged in successfully");
                router.push("/")
            }
            else{
                toast.error("Error logging in");
            }
        }
        catch(error){
            console.log(error)
            toast.error("Error logging in")
        }
    }
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex space-x-5 justify-center items-center">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    className="bg-transparent border rounded-2xl text-black px-4 py-2 mt-2"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="flex space-x-5 justify-center items-center">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="bg-transparent border rounded-2xl text-black px-4 py-2 mt-2"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="border w-full border-white/10 p-3 rounded-xl bg-gradient-to-t from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700" onClick={onHandleLogin}>Login</button>
            <div className="text-center">or</div>
            <button className="border w-full border-white/10 p-3 rounded-xl bg-gradient-to-t from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700" onClick={() => router.push("/signup")}>Sign Up</button>
        </div>
    )
}