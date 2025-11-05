import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import dbConnect from "../../../lib/mongodb"
import Booking from "../../../models/Booking"
import { AdminSidebar } from "../../../components/admin/admin-sidebar"
import { BookingsTable } from "../../../components/admin/bookings-table"

async function getBookings() {
  await dbConnect()
  const bookings = await Booking.find({})
    .populate("eventId", "title category")
    .populate("userId", "name email")
    .sort({ bookingDate: -1 })
    .lean()
  return JSON.parse(JSON.stringify(bookings))
}

export default async function AdminBookingsPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  const bookings = await getBookings()

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bookings Management</h1>
            <p className="text-muted-foreground">View and manage all event bookings</p>
          </div>

          <BookingsTable bookings={bookings} />
        </div>
      </main>
    </div>
  )
}
