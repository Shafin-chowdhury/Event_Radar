import { Suspense } from "react"
import dbConnect from "../lib/mongodb"
import Event from "../models/Event"
import { HeroSection } from "../components/hero-section"
import { FeaturedEvents } from "../components/featured-events"
import { CategoryFilter } from "../components/category-filter"
import { EventGrid } from "../components/event-grid"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

async function getEvents() {
  await dbConnect()
  const events = await Event.find({}).sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(events))
}

async function getFeaturedEvents() {
  await dbConnect()
  const featuredEvents = await Event.find({ featured: true }).limit(4).lean()
  return JSON.parse(JSON.stringify(featuredEvents))
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const [allEvents, featuredEvents] = await Promise.all([getEvents(), getFeaturedEvents()])

  const filteredEvents = searchParams.category
    ? allEvents.filter((event: any) => event.category === searchParams.category)
    : allEvents

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Featured Events</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Discover the most exciting events happening near you
              </p>
            </div>

            <Suspense fallback={<div>Loading featured events...</div>}>
              <FeaturedEvents events={featuredEvents} />
            </Suspense>
          </div>
        </section>
<section className="px-4">
  <div className="max-w-7xl mx-auto">
    <CategoryFilter currentCategory={searchParams.category} />
  </div>
</section>



        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
                {searchParams.category
                  ? `${searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)} Events`
                  : "All Events"}
              </h2>
              <p className="text-muted-foreground text-lg text-pretty">{filteredEvents.length} events available</p>
            </div>

            <Suspense fallback={<div>Loading events...</div>}>
              <EventGrid events={filteredEvents} />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
