

// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { signOut } from "next-auth/react"
// import { Button } from "../ui/button"
// import { Calendar, LayoutDashboard, Ticket, Users, LogOut, Home, Radar } from "lucide-react"
// import { cn } from "../../lib/utils"

// const navigation = [
//   { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
//   { name: "Events", href: "/admin/events", icon: Calendar },
//   { name: "Bookings", href: "/admin/bookings", icon: Ticket },
//   { name: "Users", href: "/admin/users", icon: Users },
// ]

// export function AdminSidebar() {
//   const pathname = usePathname()

//   return (
//     // CHANGED:
//     // 1. `bg-chart-2` -> `bg-background` (to use standard card/page background)
//     // 2. `border-sidebar-border` -> `border-border` (standard shadcn border)
//     <div className="w-64 bg-background border-r border-border">
//       <div className="p-6">
//         <div className="flex items-center gap-2 mb-8 group cursor-pointer">
//           {/* CHANGED: `text-sidebar` -> `text-primary` (use main brand color) */}
//           <Radar className="h-15 w-15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
          
//           {/* CHANGED:
//           // 1. `text-sidebar` -> `text-foreground` (standard text)
//           // 2. `group-hover:text-sidebar-primary` -> `group-hover:text-primary`
//           // 3. (Polish) Put "Admin" in a separate, muted-text span
//           */}
//           <span className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
//             EventRadar
//             <span className="ml-2 font-medium text-muted-foreground">Admin</span>
//           </span>
//         </div>

//         <nav className="space-y-2">
//           {navigation.map((item, index) => {
//             const isActive = pathname === item.href
//             const Icon = item.icon

//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={cn(
//                   "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:translate-x-1",
                  
//                   // CHANGED:
//                   // 1. `bg-sidebar-accent` -> `bg-primary` (active link is primary)
//                   // 2. `text-sidebar-accent-foreground` -> `text-primary-foreground`
//                   // 3. `text-sidebar` -> `text-muted-foreground` (inactive link)
//                   // 4. `hover:bg-sidebar-accent` -> `hover:bg-accent`
//                   // 5. `hover:text-sidebar-accent-foreground` -> `hover:text-accent-foreground`
//                   isActive
//                     ? "bg-primary text-primary-foreground shadow-lg"
//                     : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md",
//                 )}
//                 style={{ transitionDelay: `${index * 50}ms` }}
//               >
//                 <Icon className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
//                 {item.name}
//               </Link>
//             )
//           })}
//         </nav>

//         <div className="mt-8 pt-8 border-t border-border space-y-2">
//           {/* CHANGED: `text-sidebar` -> `text-muted-foreground` */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="w-full justify-start text-muted-foreground transition-all duration-300 hover:scale-105 hover:translate-x-1"
//             asChild
//           >
//             <Link href="/">
//               {/* CHANGED: `text-sidebar` -> `text-muted-foreground` */}
//               <Home className="h-4 w-4 mr-2 transition-transform text-muted-foreground duration-300 hover:scale-110" />
//               Back to Site
//             </Link>
//           </Button>

//           {/* This logout button is already good! `text-destructive` is standard. */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="w-full justify-start text-destructive hover:text-destructive transition-all duration-300 hover:scale-105 hover:translate-x-1 hover:bg-destructive/10"
//             onClick={() => signOut()}
//           >
//             <LogOut className="h-4 w-4 mr-2 transition-transform duration-300 hover:scale-110" />
//             Sign Out
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { Calendar, LayoutDashboard, Ticket, Users, LogOut, Home, Radar } from "lucide-react"
import { cn } from "../../lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Bookings", href: "/admin/bookings", icon: Ticket },
  { name: "Users", href: "/admin/users", icon: Users },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-[#C1DAB0] border-r border-border">
      <div className="p-6">
        
        {/* --- THIS IS THE UPDATED LOGO SECTION --- */}
        {/* 1. Changed to flex-col and items-center */}
        <div className="flex flex-col items-center gap-2 mb-8 group cursor-pointer">
          
          {/* 2. Made the Radar icon bigger (h-12 w-12) */}
          <Radar className="h-15 w-15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
          
          {/* 3. Made the text stack vertically and centered */}
          <span className="flex flex-col items-center text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
            EventRadar
            {/* 4. Removed ml-2, "Admin" is now on its own line */}
            <span className="text-sm font-medium text-muted-foreground">Admin</span>
          </span>
        </div>
        {/* --- END OF UPDATED SECTION --- */}

        <nav className="space-y-2">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:translate-x-1",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-chart-2 hover:text-accent-foreground hover:shadow-md",
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Icon className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-border space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground transition-all duration-300 hover:chart-2 hover:translate-x-1"
            asChild
          >
            <Link href="/">
              <Home className="h-4 w-4 mr-2 transition-transform text-muted-foreground duration-300 hover:scale-110" />
              Back to Site
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive transition-all duration-300 hover:scale-105 hover:translate-x-1 hover:bg-destructive/10"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 mr-2 transition-transform duration-300 hover:chart-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}