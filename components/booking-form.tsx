"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import { Minus, Plus, ShoppingCart, CheckCircle } from "lucide-react"

interface Event {
  _id: string
  title: string
  price: number
  availableTickets: number
}

interface BookingFormProps {
  event: Event
}

export function BookingForm({ event }: BookingFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [tickets, setTickets] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  

  const totalAmount = tickets * event.price

  const handleTicketChange = (change: number) => {
    const newTickets = tickets + change
    if (newTickets >= 1 && newTickets <= Math.min(event.availableTickets, 10)) {
      setTickets(newTickets)
    }
  }

  const handleBooking = async () => {
    if (!session) {
      router.push("/login")
      return
    }

    setIsLoading(true)
    setError("")


    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event._id,
          numberOfTickets: tickets,
          totalAmount,
        }),
      })

      const data = await response.json()

      if (response.ok) {
      
        router.push(`/booking/${data.booking._id}`)
       
      } else {
        setError(data.error || "Booking failed")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
          Book Tickets
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

      

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg transition-all duration-300 hover:bg-muted/80 hover:scale-105">
            <span className="font-medium">Price per ticket</span>
            <span className="text-lg font-bold text-primary transition-colors duration-300 hover:text-accent">
              Tk{event.price}
            </span>
          </div>

          <div className="space-y-2">
            <Label>Number of tickets</Label>
            <div className="flex items-center gap-3">
        
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTicketChange(-1)}
                disabled={tickets <= 1}
                className="transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Input
                type="number"
                value={tickets}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value)
                  if (value >= 1 && value <= Math.min(event.availableTickets, 10)) {
                    setTickets(value)
                  }
                }}
                className="w-20 text-center transition-all duration-300 focus:scale-105"
                min="1"
                max={Math.min(event.availableTickets, 10)}
              />

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTicketChange(1)}
                disabled={tickets >= Math.min(event.availableTickets, 10)}
                className="transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Maximum 10 tickets per booking</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20 transition-all duration-300 hover:bg-primary/15 hover:scale-105">
            <span className="font-semibold">Total Amount</span>
            <span className="text-xl font-bold text-primary transition-all duration-300 hover:scale-110">
              Tk{totalAmount} 
            </span>
          </div>
        </div>

        <Button
          onClick={handleBooking}
          disabled={isLoading || event.availableTickets === 0}
          className="w-full transition-all duration-300 hover:shadow-xl transform hover:scale-105 relative overflow-hidden group"
          size="lg"
        >
      
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
            )}
            {isLoading
              ? "Processing..."
              : event.availableTickets === 0
                ? "Sold Out"
                : session
                  ? "Book Now"
                  : "Sign In to Book"}
          </span>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Button>

        {!session && (
          <p className="text-sm text-muted-foreground text-center animate-pulse">Please sign in to book tickets</p>
        )}
      </CardContent>
    </Card>
  )
}