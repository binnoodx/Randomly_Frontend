import { dbConnect } from "@/connectDB/dbconnect";
import User from "@/model/userSchema";
import { NextResponse } from "next/server";

await dbConnect()

export async function GET() {

    const allUsers = await User.find({})


    

    return NextResponse.json({

        users:allUsers

    })
    
}