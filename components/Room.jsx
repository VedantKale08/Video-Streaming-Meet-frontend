"use client";
import { useEffect, useState } from "react";
import Peer from "peerjs";
import { useParams } from "next/navigation";
import { useSocket } from "@/context/SocketProvider";
import ReactPlayer from "react-player";
import usePlayer from "@/hooks/usePlayer";
import BottomControl from "./BottomControl";
import { cloneDeep, isEmpty } from "lodash";
import { MicOff, VideoOff } from "lucide-react";
import CopySection from "./CopySection";
import { getName } from "@/store/userStore";
import UserSideBar from "./UserSideBar";

const Room = () => {
  const [myPeer, setMyPeer] = useState(null);
  const [peerIns, setPeerIns] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const roomId = useParams().id;
  const socket = useSocket();
  const { players, setPlayers, toggleAudio, toggleVideo, leaveRoom } =
    usePlayer(myPeer, peerIns);
  const [users, setUser] = useState([]);
  const name = getName((state) => state.name);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const initPeer = () => {
      const peer = new Peer();
      peer.on("open", (id) => {
        console.log("Your peer id is " + id);
        setMyPeer(id);
        socket.emit("join-room", roomId, id, name);
      });

      peer.on("call", (call) => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setMyStream(stream);
            setPlayers((prev) => ({
              ...prev,
              [myPeer]: {
                url: stream,
                playing: true,
                muted: true,
                name: name,
              },
            }));
            call.answer(stream);
            call.on("stream", (incomingStream) => {
              const userName = call.metadata.name;
              console.log("Incoming Stream: ", incomingStream);
              setPlayers((prev) => ({
                ...prev,
                [call.peer]: {
                  url: incomingStream,
                  playing: true,
                  muted: true,
                  name: userName,
                },
              }));
              setUser((prev) => ({
                ...prev,
                [call.peer]: call,
              }));
            });
          })
          .catch((err) =>
            console.error("Error while accessing video stream: ", err)
          );
      });

      peer.on("error", (err) => {
        console.error("PeerJS error: ", err);
      });

      return peer;
    };

    const connectToNewUser = (userId, stream, peer, userName) => {
      const call = peer.call(userId, stream, { metadata: { name: name } });

      if (call) {
        call.on("stream", (incomingStream) => {
          console.log("Incoming Stream: ", incomingStream);
          setPlayers((prev) => ({
            ...prev,
            [userId]: {
              url: incomingStream,
              playing: true,
              muted: true,
              name: userName,
            },
          }));
          setUser((prev) => ({
            ...prev,
            [userId]: call,
          }));
        });
      } else {
        console.error("Call object is undefined.");
      }
    };

    const peerInstance = initPeer();
    setPeerIns(peerInstance);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyStream(stream);
        setPlayers((prev) => ({
          ...prev,
          [myPeer]: {
            url: stream,
            playing: true,
            muted: true,
            name: name,
          },
        }));
        socket.on("user-connected", (userId, userName) => {
          connectToNewUser(userId, stream, peerInstance, userName);
        });
      })
      .catch((err) =>
        console.error("Error accessing camera and microphone:", err)
      );

    return () => {
      socket.off("user-connected", (userId) => {
        // cleanup
      });
      peerInstance.destroy();
    };
  }, []);

  useEffect(() => {
    const handleToggleAudio = (userId) => {
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId) => {
      users[userId]?.close();
      setPlayers((prevPlayers) => {
        const { [userId]: _, ...newPlayers } = prevPlayers;
        return newPlayers;
      });
    };

    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);
    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, []);

  const numberOfVideos = Object.keys(players).length;
  const gridColumns = `md:repeat(${Math.min(numberOfVideos, 3)}, 1fr)`;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-md p-5 pb-9 flex flex-col items-center gap-3">
        <div className={`grid ${gridColumns} gap-6 grid-flow-col transition `}>
          {Object.keys(players).map((playerId) => {
            const { url, playing, muted, name } = players[playerId];
            return (
              <div className="relative">
                <ReactPlayer
                  key={playerId}
                  url={playing && url}
                  playing={playing}
                  muted={muted}
                  style={{ borderRadius: "2%", border: "1px solid #ff6452" }}
                />
                <div className="absolute top-3 right-4">
                  {muted && <MicOff size={19} className="text-white" />}
                </div>
                <div className="absolute top-3 left-4">
                  {!playing && <VideoOff size={19} className="text-white" />}
                </div>
                <div className="absolute bottom-3 right-4">
                  {name && <p className="text-white text-sm">{name}</p>}
                </div>
              </div>
            );
          })}
        </div>
        <CopySection />
        {show && <UserSideBar players={players} setShow={setShow} />}
        {!isEmpty(players) && (
          <BottomControl
            playing={players[null].playing}
            muted={players[null].muted}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            leaveRoom={leaveRoom}
            setShow={setShow}
            show={show}
          />
        )}
      </div>
    </div>
  );
};

export default Room;
