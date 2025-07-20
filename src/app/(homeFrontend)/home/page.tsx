'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8000');

const Home = () => {
  const { data: session, status } = useSession();
  const [allUsers, setAllUsers] = useState<string[]>([]);
  


  useEffect(() => {
    if (status === 'authenticated') {
      const emailToSend = session?.user?.email;
      if (emailToSend) {
        socket.emit("newUser", emailToSend);
      }

      socket.on("sendUserArray", (users: string[]) => {
        setAllUsers(users);
        console.log("Updated online users:", users);
      });
    }

  
  }, [session]);

  return (
    <div className="mainscreen w-screen h-screen flex flex-row justify-evenly items-center">
      <div className="left h-screen w-[70vw] bg-slate-500 text-white">
        <h1 className='text-center text-white text-xl'>Contacts</h1>
        <ul className="p-4">
          {allUsers.map((email) => (
            <li key={email} className="py-1">{email === session?.user?.email ? `${email} (You) ` : `${email}` }</li>
          ))}
        </ul>
      </div>
      <div className="right w-[30vw]">
        {/* Chat or content */}
      </div>
    </div>
  );
};

export default Home;
