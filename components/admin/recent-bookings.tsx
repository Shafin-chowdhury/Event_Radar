import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

interface Booking {
  _id: string
  userName: string
  userEmail: string
  numberOfTickets: number
  totalAmount: number
  bookingDate: string
  status: string
  eventId: {
    title: string
  }
}

interface RecentBookingsProps {
  bookings: Booking[]
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No bookings yet</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-card-foreground">{booking.userName}</p>
                  <p className="text-sm text-muted-foreground">{booking.eventId.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>

                <div className="text-right space-y-1">
                  <p className="font-semibold text-primary">${booking.totalAmount}</p>
                  <p className="text-sm text-muted-foreground">{booking.numberOfTickets} tickets</p>
                  <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
