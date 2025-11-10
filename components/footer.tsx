import Link from "next/link"
import { Calendar, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-card-foreground">Event_Radar</span>
            </div>
            <p className="text-muted-foreground text-pretty">
              Your premier destination for discovering and booking amazing events.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-card-foreground transition-colors">
                Home
              </Link>
              <Link
                href="/?category=music"
                className="block text-muted-foreground hover:text-card-foreground transition-colors"
              >
                Music Events
              </Link>
              <Link
                href="/?category=tech"
                className="block text-muted-foreground hover:text-card-foreground transition-colors"
              >
                Tech Events
              </Link>
              <Link
                href="/?category=sports"
                className="block text-muted-foreground hover:text-card-foreground transition-colors"
              >
                Sports Events
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@eventRadar.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>01817647434</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Mirpur-2, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Newsletter</h3>
            <p className="text-muted-foreground text-sm text-pretty">Stay updated with the latest events and offers.</p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 EventRadar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
