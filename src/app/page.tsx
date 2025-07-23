// app/signin/page.tsx or any client component
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { data: session,status } = useSession();


  
  const Router = useRouter()

    useEffect(() => {
    if (session) {
      Router.push("/home"); // ✅ Correct place to navigate
    }
  }, [session]);

  if(status === "loading"){
    return(
      <>
      <h1>Loading...</h1>
      </>
    )
  }


//TODO Make Landing Page

  return (
    // <div>

        

    //   {session ? (
    //     <>
    //       <p>Welcome, {session.user?.name}</p>
    //       <button onClick={() => signOut()}>Sign Out</button>
    //     </>
    //   ) : (
    //     
    //   )}
    // </div>



    <>
    
<div className="main h-screen w-screen flex flex-col justify-start items-center   bg-[linear-gradient(to_top,_#cfd9df_0%,_#e2ebf0_100%)]">

  <Navbar/>

  <div className="bodyPart flex flex-col justify-center items-center h-[93vh] w-screen">

    <h1 className="mb-5 text-3xl">RandomlyTV - Join Now</h1>
    <button className="px-10 py-4 bg-green-400 rounded-2xl text-lg cursor-pointer" onClick={() => signIn("google", { callbackUrl: "/home" })}>Get Started</button>



  </div>

 

</div>

    
    </>


  );
}
