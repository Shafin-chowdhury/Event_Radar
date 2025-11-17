"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input" 
import { Search, Radar , User, LogOut, Mail, X, Loader2 } from "lucide-react" 
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu" 
 

export  function Header() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  
  
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  
  useEffect(() => {
    if (session) {
      const dismissed = localStorage.getItem("notificationDismissed")
      if (dismissed !== "true") {
        setIsNotificationVisible(true)
      }
    } else {
     
      setIsNotificationVisible(false)
    }
  }, [session]) 

  const handleDismiss = () => {
    localStorage.setItem("notificationDismissed", "true")
    setIsNotificationVisible(false)
  }

  const handleSubscribe = async () => {
    setIsLoading(true)
    try {
      
      await fetch('/api/subscribe', {
        method: 'POST',
      })
     
      handleDismiss()
    } catch (error) {
      console.error("Failed to subscribe:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-border ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
     
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Radar className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
          <span className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
            Event_Radar
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/sponsers", label: "Sponsers" },
              { href: "/contacts", label: "Contacts" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 transition-all duration-300 focus:w-72 focus:shadow-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-primary"
                >
                  <User className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                  {session.user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="animate-in slide-in-from-top-2 duration-200">
                {session.user.role === "admin" && (
                  <DropdownMenuItem asChild className="transition-colors duration-200 hover:bg-primary/10">
                    <Link href="/admin/dashboard">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="transition-colors duration-200 hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="transition-all duration-300 hover:bg-chart-2 hover:scale-105">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      
      {isNotificationVisible && (
        <div className="bg-red-500 text-secondary-foreground shadow-inner">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">
                Get notified by email when new events are posted?
              </p>
            </div>
            
           
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                size="sm"
                onClick={handleSubscribe}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Yes, notify me"
                )}
              </Button>
              <Button
                size="icon" 
                variant="ghost"
                onClick={handleDismiss}
                disabled={isLoading}
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}