"use client";

import { ChevronsUpDown, LogOut, Settings, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/use-logout";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/stores/auth";
import { getPlaceholderName } from "@/utils";
import { Link } from "@/lib/navigation";

export function NavUser() {
  const { user } = useAuthStore();
  const { logout, isLoading } = useLogout();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex w-full items-center gap-2 rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <Avatar className="size-7 sm:size-8">
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback className="text-xs">
                    {getPlaceholderName(user?.name || user?.email || "VN")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs sm:text-sm">
                    {user?.name || "VNO's User"}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
                <ChevronsUpDown className="size-4 text-muted-foreground shrink-0" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]" align="end">
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <UserIcon className="size-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/settings/billing">
                <UserIcon className="size-4 mr-2" />
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="size-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={async () => await logout()}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Logging out
                </>
              ) : (
                <>
                  <LogOut className="size-4 mr-2 text-destructive" />
                  Log out
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
