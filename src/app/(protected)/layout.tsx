import { auth } from "@/auth";
import { Header } from "@/components/layouts/(protected)/header";
import Messages from "@/components/layouts/(protected)/messages";
import Notifications from "@/components/layouts/(protected)/notifications";
import { Search } from "@/components/layouts/(protected)/search";
import { AppSidebar } from "@/components/layouts/(protected)/sidebar/app-sidebar";
import { ConfigDrawer } from "@/components/layouts/config-drawer";
import { ThemeSwitch } from "@/components/layouts/themes/toggle-mode";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LayoutProvider } from "@/providers/layouts";
import { SearchProvider } from "@/providers/searchs";
import { cookies, headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { PropsWithChildren } from "react";

type NotionAppLayoutProps = PropsWithChildren;
const NotionAppLayout = async ({ children }: NotionAppLayoutProps) => {
    const session = await auth();
    const cookieList = await cookies();

    const defaultOpen = cookieList.get("sidebar_state")?.value !== "false";
    if (session)
        return (
            <SearchProvider>
                <LayoutProvider>
                    <SidebarProvider defaultOpen={defaultOpen}>
                        <AppSidebar />
                        <SidebarInset
                            className={cn(
                                // Set content container, so we can use container queries
                                "@container/content",

                                // If layout is fixed, set the height
                                // to 100svh to prevent overflow
                                "has-data-[layout=fixed]:h-svh",

                                // If layout is fixed and sidebar is inset,
                                // set the height to 100svh - spacing (total margins) to prevent overflow
                                "peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]"
                            )}
                        >
                            <Header fixed>
                                <Search />
                                <div className="hidden sm:flex items-center gap-2">
                                    <Notifications />
                                    <Messages />
                                    <ThemeSwitch />
                                    <ConfigDrawer />
                                    {/* <ProfileDropdown /> */}
                                </div>
                            </Header>

                            {children}
                        </SidebarInset>
                    </SidebarProvider>
                </LayoutProvider>
            </SearchProvider>
        );

    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    redirect(`/login?redirect=${pathname}`, RedirectType.replace);
};

export default NotionAppLayout;
