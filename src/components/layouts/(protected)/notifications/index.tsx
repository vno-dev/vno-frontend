import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import React from "react";

const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary"size={"icon"}>
          <Bell />
          <span className="absolute top-0 right-0 size-2.5 animate-pulse bg-rose-500 rounded-full border-2 border-card" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              Mark all as read
            </Button>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
          <Avatar className="size-8 mt-0.5">
            <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Alex" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">New lead assigned</p>
            <p className="text-xs text-muted-foreground">
              Alex Ray assigned you a new lead
            </p>
            <p className="text-xs text-muted-foreground">2 min ago</p>
          </div>
          <span className="size-2 bg-blue-500 rounded-full mt-2" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
          <Avatar className="size-8 mt-0.5">
            <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Mina" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">Lead status updated</p>
            <p className="text-xs text-muted-foreground">
              Mina Swan changed status to Qualified
            </p>
            <p className="text-xs text-muted-foreground">15 min ago</p>
          </div>
          <span className="size-2 bg-blue-500 rounded-full mt-2" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer opacity-60">
          <Avatar className="size-8 mt-0.5">
            <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=John" />
            <AvatarFallback>JK</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">Comment added</p>
            <p className="text-xs text-muted-foreground">
              John Kim commented on Lead #LD21305
            </p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
