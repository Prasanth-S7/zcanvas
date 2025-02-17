"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { axiosInstance } from "../config/axiosInstance";
import { BACKEND_URL } from "../config/config";

export default function JoinNow() {

    const [roomId, setRoomId] = useState("");
    const router = useRouter();

    const handleJoinNow = async () => {
        const trimmedRoomId = roomId.trim();
        if(trimmedRoomId === "") return;

        const res = await axiosInstance.get(`${BACKEND_URL}/api/v1/room/slug/${roomId}`, {
            withCredentials: true
        })

        if(res.status === 404){
            toast.error("Room not found")
        }

        if(res.status === 200){
            toast.success("Joining Room!")
            router.push(`/room/${trimmedRoomId}`)
        }
    }
    return (
        <div className="flex space-x-3 items-center justify-center">
            <input
                id="room-id"
                type="text"
                placeholder="room id"
                className="bg-black border rounded-2xl text-white px-4 py-2 mt-2"
                onChange={(e) => setRoomId(e.target.value)}
            />
            <button className="border bg-blue-400 px-5 py-2 rounded-2xl" onClick={handleJoinNow}>Join now</button>
        </div>
    )
}