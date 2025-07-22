"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  type SidebarVariant,
  type SidebarCollapsible,
  type ContentLayout,
} from "@/types/preferences/layout";
import { LayoutControls } from "./sidebar/layout-controls";
import { SearchDialog } from "./sidebar/search-dialog";
import { ThemeSwitcher } from "./sidebar/theme-switcher";
import { NavUser } from "./sidebar/nav-user";

interface AuthenticatedLayoutContentProps {
  children: ReactNode;
  layoutPreferences: {
    contentLayout: ContentLayout;
    variant: SidebarVariant;
    collapsible: SidebarCollapsible;
  };
}

export function AuthenticatedLayoutContent({ children, layoutPreferences }: AuthenticatedLayoutContentProps) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-1 lg:gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            <SearchDialog />
          </div>
          <div className="flex items-center gap-2">
            <LayoutControls {...layoutPreferences} />
            <ThemeSwitcher />
            <NavUser />
          </div>
        </div>
      </header>
      <div className="h-full p-4 md:p-6">{children}</div>
    </>
  );
}
