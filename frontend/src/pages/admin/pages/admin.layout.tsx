import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/sidebar/admin-sidebar";
import AdminNavbar from "../components/navbar/admin-navbar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminNavbar />
        <main className="p-5">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
