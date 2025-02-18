"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import { BACKEND_URL } from "../../../config/config";
import ChatRoom from "../../../components/ChatRoom";

export default function RoomId() {
  const { slug } = useParams();
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const getRoomId = async () => {
      try {
        const res = await axiosInstance.get(`${BACKEND_URL}/api/v1/room/slug/${slug}`);
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
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="flex flex-col space-y-3">
        <div>
          Hi there, You have entered the room with slug {slug}
        </div>
        {roomId ? (
          <div>
            <ChatRoom id={roomId} />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
