"use client";


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
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
import { usePathname } from "next/navigation";

export function NavProjects() {
  const pathname = usePathname();
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
          <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
          <SidebarMenu>
            {workspaces.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/workspaces/" + item.id}
                >
                  <Link href={"/workspaces/" + item.id}>
                    {/* <Badge className={cn('p-0 size-2 rounded shrink-0', item.color)}/> */}
                    <span>{item?.iconEmoji}</span>
                    <span>{item?.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </QueryArrayWrapper>
  );
}
