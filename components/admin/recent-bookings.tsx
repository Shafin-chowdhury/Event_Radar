import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge, BadgeProps } from "../ui/badge"

interface Booking {
  _id: string
  userName: string
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

// Helper function for better status badges
const getStatusVariant = (status: string): BadgeProps["variant"] => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "default" // This will be your primary/brand color
    case "pending":
      return "secondary" // Gray
    case "cancelled":
      return "destructive" // Red
    default:
      return "outline"
  }
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    // 1. ADDED: Teal background to match your charts
    <Card >
      <CardHeader>
        {/* 2. ADDED: Light text color (from your sidebar) */}
        <CardTitle className="text-primary">Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent >
        {bookings.length === 0 ? (
          // 3. ADDED: Light text color
          <p className="text-sidebar/70 text-center py-4">No bookings yet</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              // 4. CHANGED: Border color to be subtle on teal
              <div key={booking._id} className="flex space-y-1 bg-chart-2  items-center justify-between p-4 rounded-lg">
                <div className="">
                  {/* 5. ADDED: Light text colors */}
                  <p className="font-medium text-sidebar capitalize">{booking.userName}</p>
                  <p className="text-sm text-sidebar/70">{booking.eventId.title}</p>
                  <p className="text-xs text-sidebar/70">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>

                <div className="text-right space-y-1">
                  {/* 6. CHANGED: Price to be white */}
                  <p className="font-semibold text-white">Tk {booking.totalAmount.toLocaleString()}</p>
                  <p className="text-sm text-sidebar/70">{booking.numberOfTickets} tickets</p>
                  <Badge variant={getStatusVariant(booking.status)} className="capitalize">
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}