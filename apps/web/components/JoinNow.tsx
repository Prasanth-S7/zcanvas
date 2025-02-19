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

        try {
            const res = await axiosInstance.get(`${BACKEND_URL}/api/v1/room/slug/${roomId}`, {
                withCredentials: true
            });

            if(res.status === 200){
                toast.success("Joining Room!");
                router.push(`/room/${trimmedRoomId}`);
            }
        } catch (error) {
            toast.error("Room not found");
        }
    }

    return (
        <div className="flex flex-col space-y-4 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white text-center">Join a Room</h2>
            <div className="flex space-x-3 items-center justify-center">
                <input
                    id="room-id"
                    type="text"
                    placeholder="Enter Room ID"
                    className="flex-1 bg-transparent border border-black/10 rounded-xl text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onChange={(e) => setRoomId(e.target.value)}
                    value={roomId}
                />
                <button 
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-white font-semibold transition-colors duration-200"
                    onClick={handleJoinNow}
                >
                    Join
                </button>
            </div>
        </div>
    );
}