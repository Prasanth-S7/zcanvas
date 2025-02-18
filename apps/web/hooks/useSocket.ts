import { useEffect, useState, useRef } from "react";
import { WEBSOCKET_URL } from "../config/config";

export default function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const socketRef = useRef<WebSocket | null>(null); // Use ref to store WebSocket instance

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        console.error("No token found in cookies");
        return;
      }

      const decodedToken = decodeURIComponent(token);
      const authToken = decodedToken.startsWith("Bearer ")
        ? decodedToken.slice(7)
        : decodedToken;

      if (socketRef.current) {
        console.log("WebSocket connection already established");
        return; // If socket already exists, don't open a new one
      }

      // Only create a new WebSocket connection if it's not already open
      const ws = new WebSocket(`${WEBSOCKET_URL}?token=${authToken}`);

      ws.onopen = () => {
        setLoading(false);
        setSocket(ws);
        socketRef.current = ws; // Store WebSocket in ref for future reference
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        socketRef.current = null; // Clean up ref when the connection is closed
      };

      return () => {
        // Cleanup WebSocket connection on component unmount
        if (ws) {
          ws.close();
        }
        socketRef.current = null; // Reset ref when the component unmounts
      };
    }
  }, []);

  return { socket, loading };
}
