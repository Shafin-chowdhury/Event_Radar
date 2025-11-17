// import { redirect } from "next/navigation"
// import { getServerSession } from "next-auth" // <-- 1. MAKE SURE THIS IS IMPORTED
// import { authOptions } from "@/lib/auth" 
// import { AdminSidebar } from "@/components/admin/admin-sidebar" 
// import { DashboardStats } from "@/components/admin/dashboard-stats"
// import { RecentBookings } from "@/components/admin/recent-bookings"
// import { RevenueChart } from "@/components/admin/revenue-chart"
// import { BookingsPieChart } from "@/components/admin/bookings-pie-chart"
// import { CreateEventDialog } from "@/components/admin/create-event-dialog" 
// import { RecentUsers } from "@/components/admin/recent-users" 

// // ... (Your getDashboardData function) ...
// import dbConnect from "@/lib/mongodb" 
// import Event from "@/models/Event"
// import Booking from "@/models/Booking"
// import User from "@/models/User"

// async function getDashboardData() {
//   // ... (Your data fetching logic is here)
//   await dbConnect()

//   const [
//     totalEvents,
//     totalBookings,
//     totalUsers,
//     recentBookings,
//     revenueResult,
//     recentUsers
//   ] = await Promise.all([
//     Event.countDocuments(),
//     Booking.countDocuments(),
//     User.countDocuments(),
//     Booking.find().populate("eventId", "title").sort({ bookingDate: -1 }).limit(5).lean(),
//     Booking.aggregate([
//       { $match: { status: "confirmed" } },
//       { $group: { _id: null, total: { $sum: "$totalAmount" } } },
//     ]),
//     User.find().sort({ createdAt: -1 }).limit(5).lean(),
//   ])

//   const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0

//   const revenueData = [ /* ... mock data ... */ ]
//   const pieData = [ /* ... mock data ... */ ]

//   return {
//     stats: { totalEvents, totalBookings, totalUsers, totalRevenue },
//     recentBookings: JSON.parse(JSON.stringify(recentBookings)),
//     recentUsers: JSON.parse(JSON.stringify(recentUsers)), 
//     revenueData,
//     pieData,
//   }
// }
// // --- End Data Fetching ---


// export default async function DashboardPage() {
  
//   // --- 2. THIS IS THE FIX ---
//   // You were missing these lines to get the session
//   const session = await getServerSession(authOptions)
//   if (!session || session.user.role !== "admin") {
//     redirect("/login")
//   }
//   // --- END FIX ---

//   // Fetch all data
//   const { stats, recentBookings, recentUsers, revenueData, pieData } =
//     await getDashboardData()

//   return (
//     <div className="flex min-h-screen bg-background">
      
//       <AdminSidebar />

//       <div className="flex-1 space-y-8 p-8 bg-muted/40">
        
//         <div className="flex items-center justify-between space-y-2">
//           <div>
//             <h2 className="text-3xl text-chart-2 font-bold tracking-tight">Dashboard</h2>
//             {/* 3. This will work now because 'session' exists */}
//             <p className="text-muted-foreground">
//               Welcome back, {session.user.name}!
//             </p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <CreateEventDialog />
//           </div>
//         </div>

//         {/* ... (rest of your components) ... */}
//         <DashboardStats
//           totalEvents={stats.totalEvents}
//           totalBookings={stats.totalBookings}
//           totalUsers={stats.totalUsers}
//           totalRevenue={stats.totalRevenue}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="md:col-span-2 space-y-8">
//             <RevenueChart data={revenueData} />
//             <BookingsPieChart data={pieData} />
//           </div>
//           <div className="md:col-span-1 space-y-8">
//             <RecentBookings bookings={recentBookings} />
//             <RecentUsers users={recentUsers} /> 
//           </div>
//         </div>
        
//       </div>
//     </div>
//   )
// }


import { redirect } from "next/navigation"
import { getServerSession } from "next-auth" // <-- 1. MAKE SURE THIS IS IMPORTED
import { authOptions } from "@/lib/auth" 
import { AdminSidebar } from "@/components/admin/admin-sidebar" 
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentBookings } from "@/components/admin/recent-bookings"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { BookingsPieChart } from "@/components/admin/bookings-pie-chart"
import { CreateEventDialog } from "@/components/admin/create-event-dialog" 
import { RecentUsers } from "@/components/admin/recent-users" // <-- This import will now work

// ... (Your getDashboardData function) ...
import dbConnect from "@/lib/mongodb" 
import Event from "@/models/Event"
import Booking from "@/models/Booking"
import User from "@/models/User"

async function getDashboardData() {
  // ... (Your data fetching logic is here)
  await dbConnect()

  const [
    totalEvents,
    totalBookings,
    totalUsers,
    recentBookings,
    revenueResult,
    recentUsers
  ] = await Promise.all([
    Event.countDocuments(),
    Booking.countDocuments(),
    User.countDocuments(),
    Booking.find().populate("eventId", "title").sort({ bookingDate: -1 }).limit(5).lean(),
    Booking.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
    User.find().sort({ createdAt: -1 }).limit(5).lean(),
  ])

  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0

  // Mock data - replace with real aggregation later
  const revenueData = [
    { name: "Jan", total: Math.floor(Math.random() * 5000) },
    { name: "Feb", total: Math.floor(Math.random() * 5000) },
    { name: "Mar", total: Math.floor(Math.random() * 5000) },
    { name: "Apr", total: Math.floor(Math.random() * 5000) },
    { name: "May", total: Math.floor(Math.random() * 5000) },
    { name: "Jun", total: Math.floor(Math.random() * 5000) },
  ]
  const pieData = [
    { name: "Event A", value: 400 },
    { name: "Event B", value: 300 },
    { name: "Event C", value: 300 },
    { name: "Event D", value: 200 },
  ]

  return {
    stats: { totalEvents, totalBookings, totalUsers, totalRevenue },
    recentBookings: JSON.parse(JSON.stringify(recentBookings)),
    recentUsers: JSON.parse(JSON.stringify(recentUsers)), 
    revenueData,
    pieData,
  }
}
// --- End Data Fetching ---


export default async function DashboardPage() {
  
  // --- 2. THIS IS THE FIX ---
  // You were missing these lines to get the session
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }
  // --- END FIX ---

  // Fetch all data
  const { stats, recentBookings, recentUsers, revenueData, pieData } =
    await getDashboardData()

  return (
    <div className="flex min-h-screen bg-background">
      
      <AdminSidebar />

      <div className="flex-1 space-y-8 p-8 bg-muted/40">
        
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl text-chart-2 font-bold tracking-tight">Dashboard</h2>
            {/* 3. This will work now because 'session' exists */}
            <p className="text-muted-foreground">
              Welcome back, {session.user.name}!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <CreateEventDialog />
          </div>
        </div>

        {/* ... (rest of your components) ... */}
        <DashboardStats
          totalEvents={stats.totalEvents}
          totalBookings={stats.totalBookings}
          totalUsers={stats.totalUsers}
          totalRevenue={stats.totalRevenue}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <RevenueChart data={revenueData} />
            <BookingsPieChart data={pieData} />
          </div>
          <div className="md:col-span-1 space-y-8">
            <RecentBookings bookings={recentBookings} />
            <RecentUsers users={recentUsers} /> 
          </div>
        </div>
        
      </div>
    </div>
  )
}