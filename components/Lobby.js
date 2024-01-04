"use client"
import { useSocket } from '@/context/SocketProvider';
import React from 'react'

const Lobby = () => {
    const socket = useSocket();
  return (
    <div>Lobby</div>
  )
}

export default Lobby