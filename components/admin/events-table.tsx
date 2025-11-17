"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { EditEventDialog } from "./edit-event-dialog"

interface Event {
  _id: string
  title: string
  category: string
  location: string
  date: string
  price: number
  availableTickets: number
  maxTickets: number
  featured: boolean
}

interface EventsTableProps {
  events: Event[]
}

export function EventsTable({ events }: EventsTableProps) {
  const router = useRouter()
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    setIsDeleting(eventId)
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert("Failed to delete event")
      }
    } catch (error) {
      alert("An error occurred")
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <>
      <Card className="bg-gradient-to-br from-cyan-500 to-teal-600">
        <CardHeader>
          <CardTitle className="text-sidebar">All Events ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-sidebar-border hover:bg-black/10">
                <TableHead className="text-sidebar/80">Event</TableHead>
                <TableHead className="text-sidebar/80">Category</TableHead>
                <TableHead className="text-sidebar/80">Date</TableHead>
                <TableHead className="text-sidebar/80">Price</TableHead>
                <TableHead className="text-sidebar/80">Tickets</TableHead>
                <TableHead className="text-sidebar/80">Status</TableHead>
                <TableHead className="w-[70px] text-sidebar/80">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event._id} className="border-sidebar-border hover:bg-black/10">
                  <TableCell>
                    <div>
                      <p className="font-medium text-sidebar">{event.title}</p>
                      <p className="text-sm text-sidebar/70">{event.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="capitalize bg-white/20 text-white hover:bg-white/30">
                      {event.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sidebar">{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-sidebar">TK{event.price}</TableCell>
                  <TableCell className="text-sidebar">
                    {event.availableTickets} / {event.maxTickets}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {event.featured && (
                        <Badge variant="default" className="text-xs bg-blue-500 hover:bg-blue-600">
                          Featured
                        </Badge>
                      )}
                      <Badge variant={event.availableTickets > 0 ? "default" : "destructive"}>
                        {event.availableTickets > 0 ? "Available" : "Sold Out"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-sidebar hover:bg-black/20 hover:text-sidebar">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(`/event/${event._id}`, "_blank")}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingEvent(event)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(event._id)}
                          disabled={isDeleting === event._id}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {isDeleting === event._id ? "Deleting..." : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {events.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sidebar/70">No events found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {editingEvent && <EditEventDialog event={editingEvent} onClose={() => setEditingEvent(null)} />}
    </>
  )
}