import ChatRoom from "./ChatRoom"
export default function ChatComponent({roomId}:{
    roomId: string
}) {
    return (
        <div>
            {
                roomId ? (
                    <div>
                        <ChatRoom id={roomId} />
                    </div >
                ) : (
                    <div>Loading...</div>
                )
            }
        </div>
    )
}