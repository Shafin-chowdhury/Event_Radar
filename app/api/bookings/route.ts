import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import dbConnect from "../../../lib/mongodb"
import Booking from "../../../models/Booking"
import Event from "../../../models/Event"
import User from "../../../models/User"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { eventId, numberOfTickets, totalAmount } = await request.json()

    if (!eventId || !numberOfTickets || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await dbConnect()

    // Get event and check availability
    const event = await Event.findById(eventId)
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    if (event.availableTickets < numberOfTickets) {
      return NextResponse.json({ error: "Not enough tickets available" }, { status: 400 })
    }

    // Get user details
    const user = await User.findById(session.user.id)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create booking
    const booking = await Booking.create({
      userId: session.user.id,
      eventId,
      userName: user.name,
      userEmail: user.email,
      numberOfTickets,
      totalAmount,
    })

    // Update event availability
    await Event.findByIdAndUpdate(eventId, {
      $inc: { availableTickets: -numberOfTickets },
    })

    return NextResponse.json({ message: "Booking created successfully", bookingId: booking._id }, { status: 201 })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
