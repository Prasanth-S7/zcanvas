import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function ChatRoomClient({
    messages,
    id
}: {
    messages: any[],
    id: string
}) {
    const { socket, loading } = useSocket();
    const [chats, setChats] = useState<any[]>(messages);

    useEffect(() => {
        if (socket && !loading) {

            socket.send(JSON.stringify({
                type: "join-room",
                roomId: id
            }))
            const handleMessage = (event: MessageEvent) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === "chat") {
                    setChats((prev) => [...prev, parsedData.message]);
                }
            };

            socket.onmessage = handleMessage;

            return () => {
                socket.onmessage = null;
            };
        }
    }, [socket, loading]);

    return (
        <div>
            {chats.map((chat, index) => (
                <p key={index}>{chat}</p>
            ))}
            <input type="text" placeholder="Send message" />
        </div>
    );
}
