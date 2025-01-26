import type * as React from "react";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navigation } from "./nav-links";

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4">
        <Link to="/admin" className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F225E]">
            <img src="/schoolhat.svg" alt="Logo" className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-tight">KleeSam</span>
            <span className="text-xs text-muted-foreground">
              Educational Complex
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigation.main.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.href}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <img src={`/${item.icon}.svg`} alt="" className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4">
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3 px-3 py-2 h-auto font-normal hover:bg-accent hover:text-accent-foreground"
        >
          <img src="/logout.svg" alt="" className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
