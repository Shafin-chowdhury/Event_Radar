import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import dbConnect from "../../../lib/mongodb"
import User from "../../../models/User"
import { AdminSidebar } from "../../../components/admin/admin-sidebar"
import { UsersTable } from "../../../components/admin/users-table"

async function getUsers() {
  await dbConnect()
  const users = await User.find({}).sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(users))
}

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  const users = await getUsers()

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Users Management</h1>
            <p className="text-muted-foreground">View and manage all registered users</p>
          </div>

          <UsersTable users={users} />
        </div>
      </main>
    </div>
  )
}
