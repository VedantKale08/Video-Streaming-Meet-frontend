import { Mic, MicOff, Video, VideoOff, X } from "lucide-react";
import React, { useState } from "react";
import {motion} from 'framer-motion'

const UserSideBar = ({ players ,setShow}) => {
  return (
    <motion.div
    initial={{opacity: 0,x:100}}
    animate={{opacity: 1,x:0}}
    transition={{duration: 0.5}}
    className="absolute right-0 top-0 bg-white h-screen w-[20%] p-5 rounded-md">
      <div className="flex gap-7 items-center">
        <p className="flex-1 text-lg">People</p>
        <X
          size={20}
          onClick={() => setShow(false)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="my-6">
        {Object.keys(players).map((playerId) => {
          const { playing, muted, name } = players[playerId];
          return (
            <div className="flex gap-2 items-center justify-center">
              <p className="w-10 h-10 bg-[#ff6452] rounded-full flex justify-center items-center text-white">
                {name[0]}
              </p>
              <p className="flex-1 truncate">{name}</p>
              <div>
                <button
                  className={`text-black rounded-full p-4 cursor-pointer  transition duration-150`}
                >
                  {muted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <button
                  className={`text-black rounded-full p-4 cursor-pointer  transition duration-150`}
                >
                  {playing ? <Video size={20} /> : <VideoOff size={20} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default UserSideBar;
