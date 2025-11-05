import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/auth"
import dbConnect from "../../../../lib/mongodb"
import Event from "../../../../models/Event"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const eventData = await request.json()

    await dbConnect()

    const event = await Event.create(eventData)

    return NextResponse.json({ message: "Event created successfully", eventId: event._id }, { status: 201 })
  } catch (error) {
    console.error("Create event error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
