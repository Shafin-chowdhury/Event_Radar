import { notFound } from "next/navigation"
import dbConnect from "../../../lib/mongodb"
import Event from "../../../models/Event"
import { EventDetails } from "../../../components/event-details"
import { BookingForm } from "../../../components/booking-form"
import { Header } from "../../../components/header"
import { Footer } from "../../../components/footer"

async function getEvent(id: string) {
  await dbConnect()
  const event = await Event.findById(id).lean()
  return event ? JSON.parse(JSON.stringify(event)) : null
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EventDetails event={event} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingForm event={event} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>

  )
}
