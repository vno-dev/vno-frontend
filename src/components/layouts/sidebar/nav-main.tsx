"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Bot,
  Calendar,
  ChevronRight,
  Circle,
  FileText,
  LayoutGrid,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain() {
  const pathname = usePathname();
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutGrid,
    },
    {
      title: "Assigned to me",
      url: "#",
      icon: Circle,
    },
    {
      title: "Tasks",
      url: "#",
      icon: Star,
    },
    {
      title: "Shedule",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Dafts",
      url: "#",
      icon: FileText,
    },
  ];
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Bot className="text-[#6e3ff3]" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#6e3ff3] to-[#df3674]">
              AI Assistant
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {items.map((item) => {
          const hasChilds =
            "items" in item &&
            Array.isArray(item?.items) &&
            item?.items.length > 0;
          const isActive = pathname === item.url;
          if (hasChilds)
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {((item?.items as Array<any>) || [])?.map((subItem) => {
                        const isActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={isActive}>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
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
