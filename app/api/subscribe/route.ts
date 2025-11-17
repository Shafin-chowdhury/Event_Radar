import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth" 
import dbConnect from "@/lib/mongodb" 
import User from "@/models/User" 

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session?.user?.email) {
      return new NextResponse(JSON.stringify({ message: "Not authenticated" }), { status: 401 })
    }

    await dbConnect()

    // Find the user in the database and set their notification preference to true
    await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { wantsNewEventNotifications: true } }
    )

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    console.error("Error in /api/subscribe:", error)
    return new NextResponse(JSON.stringify({ message: "Internal server error" }), { status: 500 })
  }
}