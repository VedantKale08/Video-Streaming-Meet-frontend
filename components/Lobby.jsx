"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Lobby = () => {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const createAndJoin = () => {
    const newRoomId = uuidv4();
    router.push(`/room/${newRoomId}`);
  };

  const joinRoom = () => {
    if(roomId) {
      router.push(`/room/${roomId}`);
    }
  }

  return (
    <div className="bg-[#eee] h-screen flex justify-center items-center">
      <div className="bg-white rounded-md p-5 pb-9 md:w-[30%] shadow-md flex flex-col items-center gap-3">
        <p className="text-xl font-bold py-5">Video Meet And Streaming</p>
        <div className="relative h-10 w-full">
          <input
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            id="name"
            type="text"
            required="true"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <label
            htmlFor="name"
            className="text-gray-500 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
          >
            Room id
          </label>
        </div>
        <button onClick={joinRoom} className="bg-[#0e1111] text-white rounded-full px-8 py-1">
          Join Room
        </button>
        <p>OR</p>
        <button
          onClick={createAndJoin}
          className="bg-[#0e1111] text-white rounded-full px-8 py-1"
        >
          Create new Room
        </button>
      </div>
    </div>
  );
};

export default Lobby;