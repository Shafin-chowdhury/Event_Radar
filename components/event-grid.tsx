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

interface EventGridProps {
  events: Event[]
}

export function EventGrid({ events }: EventGridProps) {
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = entry.target.getAttribute("data-event-id")
            if (eventId) {
              setVisibleEvents((prev) => new Set([...prev, eventId]))
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    const eventCards = document.querySelectorAll("[data-event-id]")
    eventCards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [events])

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No events found.</p>
        <Button asChild className="mt-4">
          <Link href="/">View All Events</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <Card
          key={event._id}
          data-event-id={event._id}
          className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-3 transform cursor-pointer ${
            visibleEvents.has(event._id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${(index % 6) * 100}ms` }}
        >
          <CardHeader className="p-0">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center overflow-hidden relative">
              {event.imageUrl ? (
                <img
                  src={event.imageUrl || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-t-lg transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
              ) : (
                <Calendar className="h-12 w-12 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant="secondary"
                className="capitalize transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105"
              >
                {event.category}
              </Badge>
              <span className="text-lg font-bold text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-accent">
                Tk{event.price}
              </span>
            </div>

            <h3 className="font-semibold text-xl text-card-foreground mb-3 text-balance transition-all duration-300 group-hover:text-primary">
              {event.title}
            </h3>

            <p className="text-muted-foreground mb-4 line-clamp-3 text-pretty transition-colors duration-300 group-hover:text-foreground">
              {event.description}
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1">
                <Calendar className="h-4 w-4 transition-colors duration-300 group-hover:text-primary" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1">
                <MapPin className="h-4 w-4 transition-colors duration-300 group-hover:text-primary" />
                {event.location}
              </div>
              <div className="flex items-center gap-2 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1">
                <Users className="h-4 w-4 transition-colors duration-300 group-hover:text-primary" />
                {event.availableTickets} tickets available
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0">
            <Button
              asChild
              className="w-full transition-all duration-300 hover:shadow-xl transform hover:scale-105 hover:bg-primary/90 relative overflow-hidden group/btn"
              size="lg"
            >
              <Link href={`/event/${event._id}`}>
                <span className="relative z-10">Book Now</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
