'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8000');

const Home = () => {
  const { data: session, status } = useSession();
  const [allOnlineUsers, setallOnlineUsers] = useState<string[]>([]);
  const [allUsers, setallUsers] = useState<string[]>([]);

  const getAllUsers = async () => {

    const response = await fetch("/api/getUsers")
    const data = await response.json()
    setallUsers(data.users.map((user: { email: any; }) => user.email))

  }


  useEffect(() => {
    getAllUsers()





    if (status === 'authenticated') {
      const emailToSend = session?.user?.email;
      if (emailToSend) {
        socket.emit("newUser", emailToSend);
      }

      socket.on("sendUserArray", (users: string[]) => {
        setallOnlineUsers(users);
        console.log("Updated online users:", users);
      });
    }



  }, [session]);

  return (
    <div className="mainscreen w-screen h-screen flex flex-row justify-evenly items-center">
      <div className="left h-screen w-[70vw] bg-slate-500 text-white">
        <h1 className='text-center text-white text-xl'>Contacts</h1>

        <p className='text-sm mt-10 px-5 italic'> Online Now : </p>
        <ul className="p-4">
          {allOnlineUsers.map((email) => (
            <li key={email} className="py-1">{email === session?.user?.email ? `${email} (You) ` : `${email}`}</li>
          ))}
        </ul>

        <p className='text-sm mt-10 px-5 italic'> All Users  : </p>


        <ul className='px-5'>

          {allUsers.map((email) => (
            <li key={email} className="py-1">
              {email === session?.user?.email ? `${email} (You)` : email}
            </li>
          ))}

        </ul>

      </div>
      <div className="right w-[30vw]">
      </div>
    </div>
  );
};

export default Home;
