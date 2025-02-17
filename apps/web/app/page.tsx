import JoinNow from "../components/JoinNow";
import CreateRoom from "../components/CreateRoom";
export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center relative">
      <div className="flex flex-col items-center justify-center">
        <label htmlFor="room-id">Enter the room id</label>
          <JoinNow />
          <CreateRoom />
      </div>
    </div>
  );
}
