import axios from "axios"
import { axiosInstance } from "../config/axiosInstance"
import { BACKEND_URL } from "../config/config"
import ChatRoomClient from "./ChatRoomClient"

const getChats = async (roomId: string) => {
    const res = await axiosInstance.get(`${BACKEND_URL}/api/v1/chat/${roomId}`)
    return res.data.chats;
}

export default async function ChatRoom({
    id
}: {
    id: string
}) {
    const chats = await getChats(id)

    return(
        <ChatRoomClient id={id} messages={chats} />
    )
}