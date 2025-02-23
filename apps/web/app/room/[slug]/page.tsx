"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import { BACKEND_URL } from "../../../config/config";
import ChatRoom from "../../../components/ChatRoom";
import CanvasComponent from "../../../components/CanvasComponent";

export default function RoomId() {
  const { slug } = useParams();
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const getRoomId = async () => {
      try {
        const res = await axiosInstance.get(`${BACKEND_URL}/api/v1/room/slug/${slug}`);
        console.log(res.data.roomId)
        setRoomId(res.data.roomId);
      } catch (error) {
        console.error("Error fetching room ID", error);
      }
    };

    if (slug) {
      getRoomId();
    }
  }, [slug]);

  return (
    <div>
      <CanvasComponent slug = {slug} roomId = {roomId} />
    </div>
  );
}
