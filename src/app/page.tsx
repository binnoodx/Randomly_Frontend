// app/home/page.tsx
"use client";

import { useRouter } from 'next/navigation';

import React from 'react'


const page = () => {
  const Router = useRouter()
  
  const handleLogin = ()=>{
  
    Router.push("/userLogin")
  
  }
  return (

    //TODO Make proper Landing Page

    
    <div>

      <h1>Hello , Welcome to Randomly TV</h1>
      <button onClick={handleLogin} > Get Started </button>

      
    </div>
  )
}

export default page

