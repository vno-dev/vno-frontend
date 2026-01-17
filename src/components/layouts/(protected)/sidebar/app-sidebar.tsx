"use client";

import * as React from "react";

import { NavMain } from "@/components/layouts/(protected)/sidebar/nav-main";
import { NavProjects } from "@/components/layouts/(protected)/sidebar/nav-projects";
import { NavStorage } from "@/components/layouts/(protected)/sidebar/nav-storage";
import { NavUser } from "@/components/layouts/(protected)/sidebar/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { useLayout } from "@/providers/layouts";
import { TeamSwitcher } from "./team-switcher";

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
                <NavStorage />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
