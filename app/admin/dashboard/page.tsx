import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import dbConnect from "../../../lib/mongodb"
import Event from "../../../models/Event"
import Booking from "../../../models/Booking"
import User from "../../../models/User"
import { AdminSidebar } from "../../../components/admin/admin-sidebar"
import { DashboardStats } from "../../../components/admin/dashboard-stats"
import { RecentBookings } from "../../../components/admin/recent-bookings"

async function getDashboardData() {
  await dbConnect()

  const [totalEvents, totalBookings, totalUsers, recentBookings] = await Promise.all([
    Event.countDocuments(),
    Booking.countDocuments(),
    User.countDocuments(),
    Booking.find().populate("eventId", "title").sort({ bookingDate: -1 }).limit(5).lean(),
  ])

  return {
    totalEvents,
    totalBookings,
    totalUsers,
    recentBookings: JSON.parse(JSON.stringify(recentBookings)),
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  const dashboardData = await getDashboardData()

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {session.user.name}</p>
          </div>

          <DashboardStats
            totalEvents={dashboardData.totalEvents}
            totalBookings={dashboardData.totalBookings}
            totalUsers={dashboardData.totalUsers}
          />

          <RecentBookings bookings={dashboardData.recentBookings} />
        </div>
      </main>
    </div>
  )
}
