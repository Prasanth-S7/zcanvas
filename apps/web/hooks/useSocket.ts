import { useEffect, useState } from "react";
import { WEBSOCKET_URL } from "../config/config";

export default function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            console.error("No token found in cookies");
            return;
        }

        const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        };

        return () => {
            ws.close();
        };
    }, []);

    return { socket, loading };
}
