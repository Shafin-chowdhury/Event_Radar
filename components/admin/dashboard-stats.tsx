"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Calendar, Ticket, Users, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

interface DashboardStatsProps {
  totalEvents: number
  totalBookings: number
  totalUsers: number
}

export function DashboardStats({ totalEvents, totalBookings, totalUsers }: DashboardStatsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: Ticket,
      color: "text-accent",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: TrendingUp,
      color: "text-green-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className={`transition-all duration-500 hover:shadow-lg hover:-translate-y-2 transform cursor-pointer group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {stat.title}
              </CardTitle>
              <Icon
                className={`h-5 w-5 ${stat.color} transition-all duration-300 group-hover:scale-125 group-hover:rotate-12`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-primary">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
