"use client"
import { useParams } from "next/navigation"
import { axiosInstance } from "../../../config/axiosInstance"
import { BACKEND_URL } from "../../../config/config"
import ChatRoom from "../../../components/ChatRoom"
export default async function RoomId(){

    const {slug} = useParams()

    const getRoomId = async() => {
        const res = await axiosInstance.get(`${BACKEND_URL}/api/v1/room/slug/${slug}`)
        return res.data.roomId
    }

    const roomId = await getRoomId()

    return(
        <div className= "bg-black text-white min-h-screen flex items-center justify-center">
            Hi there, You have entered the room with slug {slug}
            <div>
                <ChatRoom id = {roomId}/>
            </div>
        </div>
    )
}