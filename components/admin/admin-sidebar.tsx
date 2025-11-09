"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { Calendar, LayoutDashboard, Ticket, Users, LogOut, Home } from "lucide-react"
import { cn } from "../../lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Bookings", href: "/admin/bookings", icon: Ticket },
  { name: "Users", href: "/admin/users", icon: Users },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8 group cursor-pointer">
          <Calendar className="h-8 w-8 text-sidebar-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
          <span className="text-xl font-bold text-sidebar-foreground transition-colors duration-300 group-hover:text-sidebar-primary">
            EventRadar Admin
          </span>
        </div>

        <nav className="space-y-2">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:translate-x-1",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-lg"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md",
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Icon className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-sidebar-border space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start transition-all duration-300 hover:scale-105 hover:translate-x-1"
            asChild
          >
            <Link href="/">
              <Home className="h-4 w-4 mr-2 transition-transform duration-300 hover:scale-110" />
              Back to Site
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive transition-all duration-300 hover:scale-105 hover:translate-x-1 hover:bg-destructive/10"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 mr-2 transition-transform duration-300 hover:scale-110" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
