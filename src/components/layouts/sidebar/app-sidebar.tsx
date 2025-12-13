"use client";

import * as React from "react";
import {
  AudioWaveform,
  CheckSquare,
  Command,
  FileText,
  GalleryVerticalEnd,
  Home,
  LifeBuoy,
  Search,
  Send,
} from "lucide-react";

import { NavMain } from "@/components/layouts/sidebar/nav-main";
import { NavProjects } from "@/components/layouts/sidebar/nav-projects";
import { NavSecondary } from "@/components/layouts/sidebar/nav-secondary";
import { NavUser } from "@/components/layouts/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";

export const sidebarConfigs = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/images/avatars/user1.svg",
  },
  teams: [
    {
      name: "VNO Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: FileText,
      items: [
        {
          title: "My Notes",
          url: "/notes/my-notes",
        },
        {
          title: "Shared with me",
          url: "#",
        },
      ],
    },
    {
      title: "Tasks",
      url: "#",
      icon: CheckSquare,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      title: "Workspace",
      url: "#",
      color: "bg-blue-500",
    },
    {
      title: "Learning",
      url: "#",
      color: "bg-cyan-500",
    },
    {
      title: "Users feedback",
      url: "#",
      color: "bg-orange-500",
    },
    {
      title: "Design",
      url: "#",
      color: "bg-red-500",
    },
    {
      title: "Testing",
      url: "#",
      color: "bg-green-500",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarConfigs.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarConfigs.navMain} />
        <NavProjects />
        <NavSecondary items={sidebarConfigs.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarConfigs.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
