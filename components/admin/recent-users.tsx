import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button" 
import { User, ArrowUpRight } from "lucide-react" 


interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string; 
  image?: string; 
}

interface RecentUsersProps {
  users: User[];
}


function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + "y ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "m ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m ago";
  }
  return Math.floor(seconds) + "s ago";
}


export function RecentUsers({ users }: RecentUsersProps) {
  return (
    <Card className="bg-chart-2">
      <CardHeader>
        <CardTitle className="text-white">Recent Users</CardTitle>
        <CardDescription className="text-white">
          The 5 most recent users who signed up.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 ">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 "
              key={user._id}
            >
              <Avatar className="h-9 w-9">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : null}
                <AvatarFallback>
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 truncate text-white">
                <p className="text-sm font-semibold leading-none truncate">
                  {user.name}
                </p>
                <p className="text-sm  truncate text-white">
                  {user.email}
                </p>
              </div>

              
              <div className="ml-auto text-xs text-white whitespace-nowrap">
                {timeAgo(user.createdAt)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No users found.
          </p>
        )}
      </CardContent>
      
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full hover:bg-chart-2">
          <a href="/admin/users">
            View all users
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}