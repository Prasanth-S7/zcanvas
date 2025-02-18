'use client'
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function ChatRoomClient({
    messages,
    id,
    setChats
}: {
    messages: any[];
    id: string;
    setChats: React.Dispatch<React.SetStateAction<any[]>>;
}) {
    const { socket, loading } = useSocket();
    const [message, setMessage] = useState("");
    
    const [chats, setLocalChats] = useState<any[]>(messages);

    useEffect(() => {
        setLocalChats(messages);
    }, [messages]);

    useEffect(() => {
        console.log(chats);
    }, [chats]);

    useEffect(() => {
        if (socket && !loading) {
            socket.send(JSON.stringify({ type: "join-room", roomId: id }));

            const handleMessage = (event: MessageEvent) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === "chat") {
                    setLocalChats((prev) => [...prev, parsedData.message]); 
                    setChats((prev) => [...prev, parsedData.message]); 
                }
            };

            socket.onmessage = handleMessage;

            return () => {
                socket.onmessage = null;
            };
        }
    }, [socket, loading, id]);

    const handleSendMessage = () => {
        if (socket && message.trim()) {
            socket.send(JSON.stringify({ type: "chat", message, roomId: id }));
            setMessage("");
            const newMessage = { message }; 
            setLocalChats((prev) => [...prev, newMessage]);
            setChats((prev) => [...prev, newMessage]); 
        }
    };

    return (
        <div>
            <div>
                {chats.map((chat, index) => (
                    <p className="text-white text-lg" key={index}>{chat.message}</p>
                ))}
            </div>
            <div className="flex space-x-2 justify-center items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Send message"
                    className="bg-black border border-white/10 px-5 py-2 rounded-3xl"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-400 text-white px-5 py-2 rounded-3xl"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
