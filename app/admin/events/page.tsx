// import { redirect } from "next/navigation"
// import { getServerSession } from "next-auth"
// import { authOptions } from "../../../lib/auth"
// import dbConnect from "../../../lib/mongodb"
// import Event from "../../../models/Event"
// import { AdminSidebar } from "../../../components/admin/admin-sidebar"
// import { EventsTable } from "../../../components/admin/events-table"
// import { CreateEventDialog } from "../../../components/admin/create-event-dialog"

// async function getEvents() {
//   await dbConnect()
//   const events = await Event.find({}).sort({ createdAt: -1 }).lean()
//   return JSON.parse(JSON.stringify(events))
// }

// export default async function AdminEventsPage() {
//   const session = await getServerSession(authOptions)

//   if (!session || session.user.role !== "admin") {
//     redirect("/login")
//   }

//   const events = await getEvents()

//   return (
//     <div className="flex min-h-screen bg-background">
//       <AdminSidebar />

//       <main className="flex-1 p-8">
//         <div className="max-w-7xl mx-auto space-y-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Events Management</h1>
//               <p className="text-muted-foreground">Manage all events in your platform</p>
//             </div>
//             <CreateEventDialog />
//           </div>

//           <EventsTable events={events} />
//         </div>
//       </main>
//     </div>
//   )
// }



import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Event from "@/models/Event"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { EventsTable } from "@/components/admin/events-table"
import { CreateEventDialog } from "@/components/admin/create-event-dialog"

// --- Real Data Fetching ---
async function getEvents() {
  await dbConnect()
  // Fetch all events, sort by newest date
  const events = await Event.find().sort({ date: -1 }).lean()
  return JSON.parse(JSON.stringify(events))
}
// --- End Data Fetching ---

export default async function EventsPage() {
  // Authentication check
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  const events = await getEvents()

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      {/* 1. MAIN FIX: Add gray background and padding */}
      <main className="flex-1 space-y-8 p-8 bg-muted/40">
        
        {/* 2. ADDED: Page Header with Create Event button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Events Management</h2>
            <p className="text-muted-foreground">
              Manage all events on your platform
            </p>
          </div>
          <CreateEventDialog />
        </div>

        {/* 3. Your Events Table Component */}
        <EventsTable events={events} />
        
      </main>
    </div>
  )
}