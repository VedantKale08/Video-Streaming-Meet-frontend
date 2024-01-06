const { useState, useEffect } = require("react");
import { useSocket } from "@/context/SocketProvider";
import { useParams } from "next/navigation";
import { Peer } from "peerjs";
const usePeer = () => {
  const [myId, setMyId] = useState(null); //to store unique peer id given by peer after initialization
  const peer = new Peer();
  const socket = useSocket();
  const roomId = useParams().id;

  useEffect(() => {
    peer.on("open", (id) => {
      console.log("Your peer id is " + id);
      setMyId(id);
      socket.emit("join-room", roomId, id);
    });
  }, [socket,roomId]);

  return {
    peer,
    myId,
  };
};

export default usePeer;
