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
import { Inbox, Settings } from "lucide-react";
import React from "react";

const Messages = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size={"icon"}>
          <Inbox />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Messages</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              <Settings className="size-3.5 mr-1" />
              Settings
            </Button>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
          <Avatar className="size-8 mt-0.5">
            <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Sarah" />
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Sarah Lee</p>
              <span className="text-xs text-muted-foreground">5m</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              Hey, can you check the new lead from Acme Corp? They seem
              interested...
            </p>
          </div>
          <span className="size-2 bg-blue-500 rounded-full mt-2" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
          <Avatar className="size-8 mt-0.5">
            <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Alex" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Alex Ray</p>
              <span className="text-xs text-muted-foreground">1h</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              The meeting with TechStart is confirmed for tomorrow at 2 PM
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer opacity-60">
          <Avatar className="size-8 mt-0.5">
            <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Mina" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Mina Swan</p>
              <span className="text-xs text-muted-foreground">2d</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              Thanks for the update! I&apos;ll follow up with them next week.
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
          View all messages
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Messages;
