"use client"
import { createContext, useContext, useEffect, useState } from 'react'
import {io} from 'socket.io-client'

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket;
}

export const SocketProvider = (props) => {
    const {children} = props;
    const [socket,setSocket] = useState(null)
    useEffect(()=>{
        // const connection = io("http://localhost:5000");
        const connection = io(
          "https://video-streaming-meet-backend.onrender.com"
        );
        setSocket(connection);
    },[])
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}