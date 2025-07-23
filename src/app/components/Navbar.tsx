import React from 'react'
import { MdLiveTv } from "react-icons/md";


const Navbar = () => {
  return (
     <div className="navbar border-b-2 w-screen h-[7vh] text-black flex flex-row justify-evenly items-center max-sm:px-1 px-10">
    <div className="logo h-full justify-center flex flex-row gap-2 items-center">
      <MdLiveTv className="scale-125" />
      <h1 className="text-xl title font-bold cursor-pointer">RandomlyTV</h1>
    </div>
    <div className="items ml-auto">

      <ul className="flex max-sm:text-sm flex-row h-full justify-center items-center gap-5">

        <li className="cursor-pointer font-semibold ">Get Started</li>
        <li className="cursor-pointer font-semibold ">Login</li>
        <li className="cursor-pointer font-semibold ">About Us</li>
        <li className="cursor-pointer font-semibold ">Developers</li>

      </ul>

    </div>
  </div>
  )
}

export default Navbar
