import React from "react";
import { Mic, Video, PhoneOff, MicOff, VideoOff, Users, MonitorUp } from "lucide-react";
import usePlayer from "@/hooks/usePlayer";

const BottomControl = ({
  muted,
  playing,
  isScreenSharing,
  toggleAudio = () => void 0,
  toggleVideo = () => void 0,
  leaveRoom = () => void 0,
  setShow = () => void 0,
  toggleScreenShare = () => void 0,
  show,
}) => {
  return (
    <div className="flex gap-8 fixed bottom-20">
      <button
        className={`text-white bg-[#1e293b] rounded-full p-4 cursor-pointer  hover:bg-[#ff6452] transition duration-150 ${
          muted && "bg-[#ff6452]"
        }`}
        onClick={toggleAudio}
      >
        {muted ? <MicOff /> : <Mic />}
      </button>
      <button
        className={`text-white bg-[#1e293b] rounded-full p-4 cursor-pointer  hover:bg-[#ff6452] transition duration-150 ${
          !playing && "bg-[#ff6452]"
        }`}
        onClick={toggleVideo}
      >
        {playing ? <Video /> : <VideoOff />}
      </button>
      <button
        className={`text-white bg-[#1e293b] rounded-full p-4 cursor-pointer hover:bg-[#ff6452] transition duration-150 ${isScreenSharing && "bg-[#ff6452]"}`}
        onClick={toggleScreenShare}
      >
        <MonitorUp />
      </button>
      <button
        className={`text-white bg-[#1e293b] rounded-full p-4 cursor-pointer hover:bg-[red] transition duration-150 `}
        onClick={leaveRoom}
      >
        <PhoneOff />
      </button>
      <button
        className={`text-white bg-[#1e293b] rounded-full p-4 cursor-pointer hover:bg-[#ff6452] transition duration-150 `}
        onClick={() => setShow(!show)}
      >
        <Users />
      </button>
    </div>
  );
};

export default BottomControl;
