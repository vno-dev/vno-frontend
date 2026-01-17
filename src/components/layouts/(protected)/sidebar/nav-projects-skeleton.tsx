"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function WorkspacesSkeleton({ count = 5 }: { count?: number }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden animate-pulse">
      <SidebarGroupLabel>
        <Skeleton className="h-4 w-24" />
      </SidebarGroupLabel>

      <SidebarMenu>
        {Array.from({ length: count }).map((_, idx) => (
          <SidebarMenuItem key={idx}>
            <SidebarMenuButton>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-4 w-32" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
          <SidebarMenuButton>
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-4 w-16" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
