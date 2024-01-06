"use client";
import { useSocket } from "@/context/SocketProvider";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const [myStream, setMyStream] = useState(null);
  const { players, setPlayers } = usePlayer();

  useEffect(() => {
    const openMyStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log("getUserMedia success");
        setMyStream(stream);
      } catch (error) {
        console.error("getUserMedia error", error);
      }
    };
    openMyStream();
  }, []);

  const handleUserConnected = (newUser) => {
    console.log(`User connected in room with userId ${newUser}`);
    var call = peer.call(newUser, myStream);

    call.on("stream", (incomingStream) => {
      console.log(`Incoming stream from ${newUser}`);
      setPlayers((prev) => ({
        ...prev,
        [newUser]: {
          url: incomingStream,
          muted: true,
          playing: true,
        },
      }));
    });
  };

  useEffect(() => {
    socket.on("user-connected", handleUserConnected);
    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, socket, myStream, handleUserConnected]);

  useEffect(() => {
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(myStream);

      call.on("stream", (incomingStream) => {
        console.log(`Incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
      });
    });
  }, [peer, myStream]);

  useEffect(() => {
    if (!myStream || !myId) {
      return;
    }
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: myStream,
        muted: true,
        playing: true,
      },
    }));
  }, [myStream, myId, setPlayers]);

  return (
    <div className="bg-[#eee] h-screen flex justify-center items-center">
      <div className="bg-white rounded-md p-5 pb-9  shadow-md flex flex-col items-center gap-3">
        <div>
          {Object.keys(players).map((playerId) => {
            const { url, muted, playing } = players[playerId];
            return (
              <ReactPlayer
                url={url}
                playing={playing}
                muted={muted}
                key={playerId}
                width="500px"
                height="300px"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
