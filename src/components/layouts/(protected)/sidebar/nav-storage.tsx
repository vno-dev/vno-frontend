"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Folder,
  Mail,
  Paperclip,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavStorage() {
  const pathname = usePathname();
  const items = [
    {
      title: "Attachment",
      url: "#",
      icon: Paperclip,
    },
    {
      title: "Document",
      url: "#",
      icon: Folder,
    },
    {
      title: "Email",
      url: "#",
      icon: Mail,
    },
    
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Storage</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.url === pathname;
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={isActive}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
