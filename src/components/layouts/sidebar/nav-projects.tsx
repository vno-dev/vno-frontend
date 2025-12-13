"use client";

import { Folder, MoreHorizontal, Share, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { apiClient } from "@/apis/vno";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { QueryArrayWrapper } from "@/components/query-data";
import { WorkspacesSkeleton } from "./nav-projects-skeleton";

export function NavProjects() {
  const { isMobile } = useSidebar();
  const { data, isLoading } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => {
      return apiClient.workspaces.getAll({});
    },
  });

  const workspaces = useMemo(() => {
    return data?.data || [];
  }, [data]);

  return (
    <QueryArrayWrapper
      data={workspaces}
      fallBackEmpty={null}
      fallbackLoading={<WorkspacesSkeleton />}
      isLoading={isLoading}
    >
      {(workspaces) => (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            {workspaces.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link href={"/workspaces/" + item.id}>
                    {/* <Badge className={cn('p-0 size-2 rounded shrink-0', item.color)}/> */}
                    <span>{item?.iconEmoji}</span>
                    <span>{item?.name}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem>
                      <Folder className="text-muted-foreground" />
                      <span>View Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="text-muted-foreground" />
                      <span>Share Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Trash2 className="text-muted-foreground" />
                      <span>Delete Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <MoreHorizontal />
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}
    </QueryArrayWrapper>
  );
}
