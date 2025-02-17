"use client"
import axios from "axios"
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BACKEND_URL } from "../config/config";
import { useRouter } from "next/navigation";
export default function CreateRoom() {

    const router = useRouter();

    const onHandleCreateRoom = async () => {
        try{
            const res = await axios.post(`${BACKEND_URL}/api/v1/room/`, {
                slug: roomName,
            }, {
                withCredentials: true
            })
            if(res.status === 200){
                router.push(`/room/${res.data.slug}`)
                toast.success("Room created successfully")
            }
            else{
                toast.error("Error creating room")
            }
        }
        catch(error){
            toast.error("Error creating room");
        }
    }

    const handleSignUp = async () => {
        const res = await axios.post("api/user/signup");
    }

    const [isDialogBoxOpen, setIsDialogBoxOpen] = useState(false);
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        console.log(isDialogBoxOpen)
    }, [isDialogBoxOpen])
    return (
        <div className="absolute w-full top-2 right-2 flex space-x-3 items-center justify-end">
            <button className="bg-blue-400 px-5 py-2 rounded-2xl" onClick={() => setIsDialogBoxOpen((prev) => !prev)}>Create Room</button>
            <button className="bg-blue-400 px-5 py-2 rounded-2xl" onClick={handleSignUp}>Sign Up/Login</button>
            {
                isDialogBoxOpen && (
                    <div className="fixed z-50 w-[600px] h-[200px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-5 rounded-xl border border-white/10">
                        <div className="flex flex-col space-y-10">
                            <div className="flex space-x-5 items-center justify-center">
                                <label htmlFor="room-id" className="text-nowrap">Room name</label>
                                <input
                                    id="room-id"
                                    type="text"
                                    placeholder="enter a unique room name"
                                    className="bg-black border rounded-2xl text-white px-4 py-2 mt-2"
                                    onChange={(e) => setRoomName(e.target.value)}
                                />
                                <button className="bg-blue-400 px-5 py-2 rounded-2xl text-nowrap">Generate random name</button>
                            </div>
                            <button className="bg-blue-400 px-5 py-2 rounded-2xl" onClick={onHandleCreateRoom}>Create Room</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}