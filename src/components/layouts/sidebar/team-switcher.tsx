"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { apiClient } from "@/apis/vno";
import { useAuthStore } from "@/stores/auth";
import { useSession } from "next-auth/react";

/* --------------------------------------------------
 * Helpers
 * -------------------------------------------------- */

const ORG_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
];

const getOrgInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const getOrgColor = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash + id.charCodeAt(i)) % ORG_COLORS.length;
  }
  return ORG_COLORS[hash];
};

/* --------------------------------------------------
 * Skeletons
 * -------------------------------------------------- */

function TeamSwitcherSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" disabled>
          <Skeleton className="flex size-8 rounded-lg" />
          <div className="ml-2 flex flex-1 flex-col gap-1">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-2 w-16 rounded" />
          </div>
          <ChevronsUpDown className="ml-auto size-4 opacity-40" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

/* --------------------------------------------------
 * Service Layer
 * -------------------------------------------------- */

async function switchOrganization(orgId: string) {
  const res = await apiClient.auth.switchOrganizer({ params: { orgId } });
  if (!res?.data?.token) throw new Error("Failed to switch organization");
  return res.data.token;
}

/* --------------------------------------------------
 * Component
 * -------------------------------------------------- */

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { user, setUser } = useAuthStore();
  const { update } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["organizers"],
    queryFn: () => apiClient.organizers.getAll({}),
    staleTime: 60_000,
  });

  const organizers = useMemo(() => data?.data ?? [], [data]);

  const currentOrganizer = useMemo(() => {
    if (!user?.currentOrgId) return null;
    return organizers.find((org) => org.id === user.currentOrgId);
  }, [organizers, user]);

  const mutation = useMutation({
    mutationFn: switchOrganization,
    onMutate: async (orgId: string) => {
      const previousOrgId = user?.currentOrgId;
      setUser(() => ({ currentOrgId: orgId ?? undefined }));
      return { previousOrgId };
    },
    onError: (_err, _orgId, context) => {
      if (context?.previousOrgId !== undefined) {
        setUser(() => ({ currentOrgId: context.previousOrgId }));
      }
      toast.error("Failed to switch team");
    },
    onSuccess: async (token) => {
      try {
        await update({ accessToken: token });
        window?.location?.reload();
      } catch (err) {
        toast.error("Failed to update session");
        console.error(err);
      }
    },
  });

  const handleSwitchOrg = async (orgId: string) => {
    if (orgId === user?.currentOrgId) return;
    await mutation.mutateAsync(orgId);
  };

  if (isLoading || !user) return <TeamSwitcherSkeleton />;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* ---------- Trigger ---------- */}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className={cn(
                  "flex aspect-square size-8 items-center justify-center rounded-lg text-sm font-semibold text-white",
                  currentOrganizer
                    ? getOrgColor(currentOrganizer.id)
                    : "bg-muted"
                )}
              >
                {currentOrganizer ? getOrgInitials(currentOrganizer.name) : "?"}
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {currentOrganizer?.name ?? "No team"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {currentOrganizer?.plan ?? "—"}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* ---------- Content ---------- */}
          <DropdownMenuContent
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>

            {organizers.map((team) => {
              const isCurrent = team.id === user.currentOrgId;

              return (
                <DropdownMenuItem
                  key={team.id}
                  disabled={isCurrent || mutation.isPending}
                  className={cn(
                    "gap-2 p-2",
                    isCurrent && "cursor-default opacity-60"
                  )}
                  onClick={async () => handleSwitchOrg(team.id)}
                >
                  <div
                    className={cn(
                      "flex size-6 items-center justify-center rounded-md text-xs font-semibold text-white",
                      getOrgColor(team.id)
                    )}
                  >
                    {getOrgInitials(team.name)}
                  </div>

                  <span className="flex-1 truncate">{team.name}</span>

                  {isCurrent && (
                    <DropdownMenuShortcut>Current</DropdownMenuShortcut>
                  )}
                  {mutation.isPending && <Spinner />}
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <span className="font-medium text-muted-foreground">
                Add team
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
