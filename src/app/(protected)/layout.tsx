import { auth } from "@/auth";
import { Search } from "@/components/common/search";
import { Header } from "@/components/layouts/header";
import { ProfileDropdown } from "@/components/layouts/profile-dropdown";
import { AppSidebar } from "@/components/layouts/sidebar/app-sidebar";
import { ThemeSwitch } from "@/components/layouts/themes/toggle-mode";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/providers/search";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { PropsWithChildren } from "react";
type NotionAppLayoutProps = PropsWithChildren;
const NotionAppLayout = async ({ children }: NotionAppLayoutProps) => {
  const session = await auth();
  if (session)
    return (
      <SearchProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header>
              <Search />
              <div className="ms-auto flex items-center space-x-4">
                <ThemeSwitch />
                {/* <ConfigDrawer /> */}
                <ProfileDropdown />
              </div>
            </Header>
            <div className="flex flex-1 flex-col gap-4 p-3 lg:p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </SearchProvider>
    );

  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  redirect(`/login?redirect=${pathname}`, RedirectType.replace);
};

export default NotionAppLayout;
