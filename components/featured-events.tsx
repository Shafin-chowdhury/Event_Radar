"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import { useEffect, useState } from "react"

interface Event {
  _id: string
  title: string
  description: string
  category: string
  location: string
  date: string
  price: number
  availableTickets: number
  imageUrl?: string
}

interface FeaturedEventsProps {
  events: Event[]
}

export function FeaturedEvents({ events }: FeaturedEventsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("featured-events")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No featured events available at the moment.</p>
      </div>
    )
  }

  return (
    <div id="featured-events" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((event, index) => (
        <Card
          key={event._id}
          className={`group hover:shadow-lg transition-all duration-500 hover:-translate-y-2 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <CardHeader className="p-0">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center overflow-hidden">
              {event.imageUrl ? (
                <img
                  src={event.imageUrl || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <Calendar className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
              )}
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant="secondary"
                className="capitalize transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
              >
                {event.category}
              </Badge>
              <span className="text-sm font-semibold text-primary transition-all duration-300 group-hover:scale-110">
                Tk{event.price}
              </span>
            </div>

            <h3 className="font-semibold text-lg text-card-foreground mb-2 text-balance transition-colors duration-300 group-hover:text-primary">
              {event.title}
            </h3>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 text-pretty">{event.description}</p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 transition-colors duration-300 group-hover:text-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 transition-colors duration-300 group-hover:text-foreground">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
              <div className="flex items-center gap-2 transition-colors duration-300 group-hover:text-foreground">
                <Users className="h-4 w-4" />
                {event.availableTickets} tickets left
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full transition-all duration-300 hover:shadow-lg transform hover:scale-105">
              <Link href={`/event/${event._id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}



