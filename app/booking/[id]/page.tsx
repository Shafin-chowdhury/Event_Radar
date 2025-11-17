
import dbConnect from "@/lib/mongodb"
import Booking from "@/models/Booking"
import Event from "@/models/Event" // This import seems unused but is harmless
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import ReceiptActions from "./ReciptAction"

async function getBooking(id: string) {
  await dbConnect()
  const booking = await Booking.findById(id).populate("eventId", "title").lean()
  if (!booking) {
    notFound()
  }

  return JSON.parse(JSON.stringify(booking))
}

export default async function BookingReceiptPage({ params }: { params: { id: string } }) {

  
   
  const booking = await getBooking(params.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 px-4">
        <div id="booking-receipt" className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-green-100/50">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-10 w-10 text-green-600" />
                <div>
                  <CardTitle className="text-2xl font-bold text-green-800">
                    Booking Confirmed!
                  </CardTitle>
                  <p className="text-muted-foreground">This is your receipt.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Payment to BUBT Bank</h3>
                <p className="text-muted-foreground">Transaction successful.</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                <h4 className="font-semibold text-lg">Invoice Details</h4>
                <div className="flex justify-between">
                  <span>Event:</span>
                  <span className="font-medium">{booking.eventId.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booked by:</span>
                  <span className="font-medium">{booking.userName} ({booking.userEmail})</span>
                </div>
                <div className="flex justify-between">
                  <span>Tickets:</span>
                  <span className="font-medium">{booking.numberOfTickets}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant="default" className="bg-green-600 hover:bg-green-700 capitalize">
                    {booking.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Booking ID:</span>
                  <span className="font-mono text-sm">{booking._id}</span>
                </div>
              </div>

              <div className="p-6 bg-primary/10 rounded-lg flex items-center justify-between">
                <span className="text-xl font-bold">Total Amount Paid</span>
                <span className="text-3xl font-extrabold text-primary">
                  Tk{booking.totalAmount.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="max-w-3xl mx-auto mt-8 text-center">
          <ReceiptActions receiptId="booking-receipt" />
        </div>

      </main>
      <Footer />
    </div>
  )
}