// // "use client"

// // import { useState, useEffect } from "react"
// // import { useSession } from "next-auth/react"
// // import { Button } from "@/components/ui/button" 
// // import { X, Mail, Loader2 } from "lucide-react"

// // interface NotificationBarProps {
// //   session: any; 
// // }

// // export function NotificationBar({ session }: NotificationBarProps) {
// //   const [isVisible, setIsVisible] = useState(false)
// //   const [isLoading, setIsLoading] = useState(false)

// //   useEffect(() => {
// //     if (session) {
// //       const dismissed = localStorage.getItem("notificationDismissed")
// //       if (dismissed !== "true") {
// //         setIsVisible(true)
// //       }
// //     }
// //   }, [session])

// //   const handleDismiss = () => {
// //     localStorage.setItem("notificationDismissed", "true")
// //     setIsVisible(false)
// //   }

// //   const handleSubscribe = async () => {
// //     setIsLoading(true)
// //     try {
// //       await fetch('/api/subscribe', {
// //         method: 'POST',
// //       })
      
// //       handleDismiss()
// //     } catch (error) {
// //       console.error("Failed to subscribe:", error)
     
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   if (!isVisible) {
// //     return null
// //   }

// //   return (
// //     <div className="fixed bottom-0 left-0 right-0 z-50 text-secondary-foreground p-4 shadow-lg animate-in slide-in-from-bottom-5 duration-500">
// //       <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 ">
// //         <div className="flex items-center gap-3 ">
// //           <Mail className="h-5 w-5 text-primary" />
// //           <p className="text-sm font-medium">
// //             Get notified by email when new events are posted?
// //           </p>
// //         </div>
        
// //         <div className="flex items-center gap-2">
// //           <Button
// //             size="sm"
// //             onClick={handleSubscribe}
// //             disabled={isLoading}
// //             className="bg-primary hover:bg-primary/90 text-primary-foreground"
// //           >
// //             {isLoading ? (
// //               <Loader2 className="h-4 w-4 animate-spin" />
// //             ) : (
// //               "Yes, notify me"
// //             )}
// //           </Button>
// //           <Button
// //             size="sm"
// //             variant="ghost"
// //             onClick={handleDismiss}
// //             disabled={isLoading}
// //           >
// //             No, thanks
// //           </Button>
// //           <button
// //             onClick={handleDismiss}
// //             disabled={isLoading}
// //             className="p-1 rounded-full hover:bg-black/10 transition-colors"
// //             aria-label="Dismiss"
// //           >
// //             <X className="h-4 w-4" />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }


// "use client"

// import { useState, useEffect } from "react"
// import { useSession } from "next-auth/react"
// import { Button } from "@/components/ui/button"
// import { X, Mail, Loader2 } from "lucide-react"

// interface NotificationBarProps {
//   session: any;
// }

// export function NotificationBar({ session }: NotificationBarProps) {
//   const [isVisible, setIsVisible] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     if (session) {
//       const dismissed = localStorage.getItem("notificationDismissed")
//       if (dismissed !== "true") {
//         setIsVisible(true)
//       }
//     }
//   }, [session])

//   const handleDismiss = () => {
//     localStorage.setItem("notificationDismissed", "true")
//     setIsVisible(false)
//   }

//   const handleSubscribe = async () => {
//     setIsLoading(true)
//     try {
//       await fetch('/api/subscribe', {
//         method: 'POST',
//       })
//       handleDismiss()
//     } catch (error) {
//       console.error("Failed to subscribe:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (!isVisible) {
//     return null
//   }

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50 bg-red-600 text-white p-4 shadow-lg animate-in slide-in-from-bottom-5 duration-500"> {/* Changed bg-secondary to bg-red-600 and text-secondary-foreground to text-white */}
//       <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 ">
//         <div className="flex items-center gap-3 ">
//           <Mail className="h-5 w-5 text-white" /> {/* Changed text-primary to text-white for better contrast */}
//           <p className="text-sm font-medium">
//             Get notified by email when new events are posted?
//           </p>
//         </div>
        
//         <div className="flex items-center gap-2">
//           <Button
//             size="sm"
//             onClick={handleSubscribe}
//             disabled={isLoading}
//             className="bg-white text-red-600 hover:bg-white/90" // Changed button colors for contrast
//           >
//             {isLoading ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               "Yes, notify me"
//             )}
//           </Button>
//           <Button
//             size="sm"
//             variant="ghost"
//             onClick={handleDismiss}
//             disabled={isLoading}
//             className="text-white hover:bg-white/20" // Changed button colors for contrast
//           >
//             No, thanks
//           </Button>
//           <button
//             onClick={handleDismiss}
//             disabled={isLoading}
//             className="p-1 rounded-full text-white hover:bg-white/20 transition-colors" // Changed button colors for contrast
//             aria-label="Dismiss"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }