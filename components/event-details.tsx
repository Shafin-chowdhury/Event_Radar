import { Badge } from "./ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

interface Event {
  _id: string
  title: string
  description: string
  category: string
  location: string
  date: string
  price: number
  availableTickets: number
  maxTickets: number
  imageUrl?: string
}

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center overflow-hidden">
        {event.imageUrl ? (
          <img src={event.imageUrl || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <Calendar className="h-24 w-24 text-primary" />
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="capitalize text-sm">
              {event.category}
            </Badge>
            <span className="text-2xl font-bold text-primary">Tk{event.price}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">{event.title}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-card rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-card-foreground">Date & Time</p>
              <p className="text-muted-foreground">
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-card-foreground">Location</p>
              <p className="text-muted-foreground">{event.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-card-foreground">Availability</p>
              <p className="text-muted-foreground">
                {event.availableTickets} of {event.maxTickets} tickets left
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-card-foreground">Duration</p>
              <p className="text-muted-foreground">3 hours</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">About This Event</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground leading-relaxed text-pretty">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
