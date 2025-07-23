'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8000');

const Home = () => {
  const { data: session, status } = useSession();
  const [allOnlineUsers, setallOnlineUsers] = useState<string[]>([]);
  const [allUsers, setallUsers] = useState<string[]>([]);
  const [hasVideoAudio, sethasVideoAudio] = useState(false);
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const partnerVideo = useRef<HTMLVideoElement | null>(null);

  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/getUsers");
      const data = await response.json();
      setallUsers(data.users.map((user: { email: string }) => user.email));
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const getVideoPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }

      // Placeholder: assign stream to peer later
      sethasVideoAudio(true);
    } catch (error) {
      console.error("Error accessing webcam/mic:", error);
      sethasVideoAudio(false);
    }
  };

  const start = () => {
    // TODO: WebRTC peer connection logic goes here
  };

  useEffect(() => {
    getAllUsers();

    if (status === 'authenticated') {
      const emailToSend = session?.user?.email;
      if (emailToSend) {
        socket.emit("newUser", emailToSend);
      }

      const handleUsers = (users: string[]) => {
        setallOnlineUsers(users);
        console.log("Updated online users:", users);
      };

      socket.on("sendUserArray", handleUsers);

      return () => {
        socket.off("sendUserArray", handleUsers); // cleanup on unmount
      };
    }
  }, [session]);

  return (
    <div className="mainscreen w-screen bg-slate-500 h-screen text-white flex flex-row max-sm:flex-col justify-evenly items-center">
      <div className="left h-screen max-sm:hidden max-sm:w-screen w-[30vw] text-white">
        <h1 className="text-center text-white text-xl">Contacts</h1>

        <p className="text-sm mt-10 max-sm:mt-1 px-5 italic">Online Now:</p>
        <ul className="p-4">
          {allOnlineUsers.map((email) => (
            <li key={email} className="py-1 max-sm:py-0 text-sm">
              {email === session?.user?.email ? `${email} (You)` : `${email}`}
            </li>
          ))}
        </ul>
      </div>

      <div className="right w-[70vw] h-screen max-sm:gap-5 max-sm:items-start justify-center items-center flex flex-col gap-5">
        <video
          ref={myVideo}
          autoPlay
          playsInline
          muted
          
          className="bg-black max-sm:h-[30vh] max-sm:w-[80vw] h-[40vh] w-[30vw] rounded-lg"
        />

        <video
          ref={partnerVideo}
          autoPlay
          playsInline
          className="bg-black max-sm:h-[30vh] max-sm:w-[80vw] h-[40vh] w-[30vw] rounded-lg"
        />

        {!hasVideoAudio && (
          <button
            onClick={getVideoPermission}
            className="cursor-pointer px-10 bg-green-500 rounded-lg py-2"
          >
            Open Video
          </button>
        )}

        <button
          onClick={start}
          className="cursor-pointer px-10 bg-green-500 rounded-lg py-2"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;
