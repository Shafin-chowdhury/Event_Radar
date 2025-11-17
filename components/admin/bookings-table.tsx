import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

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
    category: string
  }
}

interface BookingsTableProps {
  bookings: Booking[]
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <Card className="bg-gradient-to-br from-cyan-500 to-teal-600">
      <CardHeader>
        <CardTitle>All Bookings ({bookings.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Tickets</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.userName}</p>
                    <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.eventId.title}</p>
                    <Badge variant="secondary" className="capitalize text-xs">
                      {booking.eventId.category}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
                <TableCell>{booking.numberOfTickets}</TableCell>
                <TableCell className="font-semibold text-primary">${booking.totalAmount}</TableCell>
                <TableCell>
                  <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {bookings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No bookings found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
