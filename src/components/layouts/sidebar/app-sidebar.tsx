"use client";

import * as React from "react";

import { NavMain } from "@/components/layouts/sidebar/nav-main";
import { NavProjects } from "@/components/layouts/sidebar/nav-projects";
import { NavUser } from "@/components/layouts/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { useLayout } from "@/providers/layouts";
import { NavStorage } from "@/components/layouts/sidebar/nav-storage";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { collapsible, variant } = useLayout();
  return (
    <Sidebar variant={variant} collapsible={collapsible} {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
        <NavStorage/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
