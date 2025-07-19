// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "@/connectDB/dbconnect";
import User from "@/model/userSchema";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
   session: {
    strategy: "jwt" as const,
    maxAge: 2 * 24 * 60 * 60,
  },
  callbacks:{

    async signIn({ user, account }: any) {
      await dbConnect();

      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new User({
            userName: user.name.replace(/\s+/g, "").toLowerCase(),
            email: user.email,
            createdAt: Date.now(),
          });
          await newUser.save();
        }
      }
      return true;
    },

  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
