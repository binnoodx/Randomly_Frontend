// app/signin/page.tsx or any client component
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session,status } = useSession();


  
  const Router = useRouter()

  if(status === "authenticated"){
    Router.push("/home")
  }


//TODO Make Login Page

  return (
    <div>

        

      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn("google", { callbackUrl: "/home" })}>Sign In with Google</button>
      )}
    </div>
  );
}
