import {
  MessageCircleMore,
  Mic,
  MicOff,
  Users,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useSocket } from "@/context/SocketProvider";
import { getCookie } from "cookies-next";

const UserSideBar = ({ players, setShow, show, myPeer }) => {
  const [view, setView] = useState("users"); // State to toggle between users and chat
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useSocket();

  const name = getCookie("name");

  useEffect(() => {
    socket.on("receiveMessage", (messageData) => {
      if(messageData.sender !== name){
        setChatMessages((prevMessages) => [...prevMessages, messageData]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = { text: newMessage, sender: name };

      socket.emit("sendMessage", messageData);
      setChatMessages([...chatMessages, messageData]);
      setNewMessage("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-[#17202F] text-white h-screen w-[20%] flex flex-col justify-between shadow-md md:block border border-gray-800 ${
        !show ? "hidden" : "block"
      }`}
    >
      <div>
        <div className="flex gap-3 p-4">
          <div
            onClick={() => setView("users")}
            className={twMerge(
              `flex-1 cursor-pointer flex justify-center items-center gap-2 text-center bg-[#27303F] rounded-lg py-2 text-sm ${
                view === "users" ? "bg-blue-500 text-white" : ""
              }`
            )}
          >
            <Users size={15} />
            People
          </div>
          <div
            onClick={() => setView("chat")}
            className={twMerge(
              `flex-1 cursor-pointer flex justify-center items-center gap-2 text-center bg-[#27303F] rounded-lg py-2 text-sm ${
                view === "chat" ? "bg-blue-500 text-white" : ""
              }`
            )}
          >
            <MessageCircleMore size={15} />
            Chats
          </div>
        </div>
        <hr className="border-gray-800 mb-6" />
      </div>
      {view === "users" ? (
        <div className="px-5">
          <div className="flex gap-7 items-center">
            <p className="flex-1 text-lg">People</p>
          </div>
          <div className="my-6 flex flex-col gap-4">
            {Object.keys(players).map((playerId) => {
              const { playing, muted, name } = players[playerId];
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
                      className={`text-white rounded-full px-2 cursor-pointer transition duration-150`}
                    >
                      {muted ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>
                    <button
                      className={`text-white rounded-full px-2 cursor-pointer transition duration-150`}
                    >
                      {playing ? <Video size={18} /> : <VideoOff size={18} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="px-5 flex flex-col pb-5">
          <div className="flex-1 overflow-y-auto">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg break-words ${
                  msg.sender === name
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-700"
                } mb-2`}
              >
                <strong>{msg.sender}: </strong>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2 w-full">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-md w-[80%] bg-gray-800 text-white"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 p-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UserSideBar;
