import React from "react";
import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";
import usePlayer from "@/hooks/usePlayer";

const BottomControl = ({
  muted,
  playing,
  toggleAudio = () => void 0,
  toggleVideo = () => void 0,
  leaveRoom = () => void 0,
}) => {
  return (
    <div className="flex gap-8 fixed bottom-20">
      <button
        className={`text-white bg-[#1e293b] rounded-full p-4 cursor-pointer ${
          muted && "bg-[#ff6452]"
        }`}
        onClick={toggleAudio}
      >
        {muted ? <MicOff /> : <Mic />}
      </button>
      <button
        className={`text-white bg-[#1e293b] rounded-full p-4 cursor-pointer ${
          !playing && "bg-[#ff6452]"
        }`}
        onClick={toggleVideo}
      >
        {playing ? <Video /> : <VideoOff />}
      </button>
      <button
        className={`text-white bg-[#1e293b] rounded-full p-4 cursor-pointer`}
        onClick={leaveRoom}
      >
        <PhoneOff />
      </button>
    </div>
  );
};

export default BottomControl;
