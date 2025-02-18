'use client'
import { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { BACKEND_URL } from "../config/config";
import ChatRoomClient from "./ChatRoomClient";

const getChats = async (roomId: string) => {
    const res = await axiosInstance.get(`${BACKEND_URL}/api/v1/chat/${roomId}`);
    console.log(res.data);
    return res.data.chats;
};

export default function ChatRoom({ id }: { id: string }) {
    const [chats, setChats] = useState<any[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            const fetchedChats = await getChats(id);
            setChats(fetchedChats);
        };

        fetchChats();
    }, [id]); // Fetch chats when `id` changes

    return <ChatRoomClient id={id} messages={chats} setChats={setChats} />;
}
