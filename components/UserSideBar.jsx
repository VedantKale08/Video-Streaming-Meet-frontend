import {
  MessageCircleMore,
  Mic,
  MicOff,
  Users,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const UserSideBar = ({ players, setShow, show }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-[#17202F] text-white h-screen w-[20%] shadow-md md:block border border-gray-800  ${
        !show ? "hidden" : "block"
      }`}
    >
      <div className="flex gap-3 p-4">
        <div
          className={twMerge(
            `flex-1 cursor-pointer flex justify-center items-center gap-2 text-center bg-[#27303F] rounded-lg py-2 text-sm bg-blue-500 text-white border border-gray-600`
          )}
        >
          <Users size={15} />
          People
        </div>
        <div
          className={twMerge(
            `flex-1 cursor-pointer flex justify-center items-center gap-2 text-center bg-[#27303F] rounded-lg py-2 text-sm border border-gray-600`
          )}
        >
          <MessageCircleMore size={15} />
          Chats
        </div>
      </div>
      <hr className="border-gray-800 mb-6" />
      <div className="px-5">
        <div className="flex gap-7 items-center ">
          <p className="flex-1 text-lg">People</p>
          {/* <X
            size={20}
            onClick={() => setShow(false)}
            style={{ cursor: "pointer" }}
          /> */}
        </div>
        <div className="my-6 flex flex-col gap-4">
          {Object.keys(players).map((playerId) => {
            const { playing, muted, name, isHost } = players[playerId];
            return (
              <div
                className="flex gap-2 items-center text-sm justify-center"
                key={playerId}
              >
                <p className="w-8 h-8 bg-[#ff6452] rounded-lg flex justify-center items-center text-white">
                  {name && name[0]}
                </p>
                <p className="flex-1 truncate">{name}</p>
                <div>
                  <button
                    className={`text-white rounded-full px-2  cursor-pointer  transition duration-150`}
                  >
                    {muted ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  <button
                    className={`text-white rounded-full px-2  cursor-pointer  transition duration-150`}
                  >
                    {playing ? <Video size={18} /> : <VideoOff size={18} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default UserSideBar;
