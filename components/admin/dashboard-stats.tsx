

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Calendar, Ticket, Users, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface DashboardStatsProps {
  totalEvents: number
  totalBookings: number
  totalUsers: number
  totalRevenue: number
}

export function DashboardStats({ 
  totalEvents, 
  totalBookings, 
  totalUsers, 
  totalRevenue 
}: DashboardStatsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { title: "Total Events", value: totalEvents.toString(), icon: Calendar, trend: "+2 this week" },
    { title: "Total Bookings", value: totalBookings.toString(), icon: Ticket, trend: "+1 from yesterday" },
    { title: "Total Users", value: totalUsers.toString(), icon: Users, trend: "+3 new users" },
    { title: "Revenue", value: `Tk ${totalRevenue.toLocaleString()}`, icon: TrendingUp, trend: "+15% this month" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {stats.map((stat, index) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className={cn(
              "bg-gradient-to-br from-cyan-500 to-teal-600",
              
              "text-white transition-all duration-500 hover:shadow-lg hover:-translate-y-1 transform cursor-pointer group",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">
                {stat.title}
              </CardTitle>
              <Icon
                className="h-16 w-16 text-[#C1DAB0] transition-all duration-300 group-hover:scale-125 group-hover:rotate-12"
              />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-xl font-bold transition-all duration-300 group-hover:scale-105">
                {stat.value}
              </div>
              <p className="text-xs text-white/80 pt-1">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}