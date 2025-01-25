<<<<<<< HEAD:frontend/src/archive/components/Dashboard.tsx
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getTutorAnalytics } from "@/archive/api/slices/tutorthunk";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import Layout from "@/archive/components/Layout";
import { useAppDispatch, useAppSelector } from "@/archive/store/hooks";
import { StudentAnalyticsChart } from "@/archive/components/Chart";

const imgs = ["/notification.svg", "/chat.svg", "user.svg"];

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { analytics, loading } = useAppSelector((state) => state.tutor);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getTutorAnalytics());
    }
  }, [token, dispatch]);

  return (
    <Layout>
=======
import  { useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"


const imgs = ["/notification.svg", "/chat.svg", "user.svg"]

export default function Dashboard() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  
  useEffect(
    () => {
      if (!token) {
        navigate("/login")

      }
      else {
        console.log("token available")
      }
    },
    [token]
  )

 
  return (
    <SidebarProvider>
      <AppSidebar  />
>>>>>>> parent of 3dc7d4e (Included the analytics):frontend/src/Pages/DashboardPage.tsx
      <SidebarInset>
        <header className="flex  h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex justify-between w-full items-center gap-2 px-3">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
            </div>
            <div className="flex">
              {imgs.map((img, index) => (
                <div key={index} className="items-center gap-2 px-3">
                  <img src={img} alt="" className="w-8 h-8" />
                </div>
              ))}
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
<<<<<<< HEAD:frontend/src/archive/components/Dashboard.tsx
            <div className="aspect-video rounded-xl bg-muted/50">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <p className="text-2xl">Total Tutors: </p>
                  </CardTitle>
                  <CardDescription>Total number of tutors</CardDescription>
                </CardHeader>
                <CardContent>
                  {analytics !== null ? (
                    <div className="flex flex-col justify-center items-center gap-4 p-4">
                      <p className="text-xl">{analytics}</p>
                    </div>
                  ) : (
                    <p>Loading analytics...</p>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              {loading ? "Loading..." : <StudentAnalyticsChart />}
            </div>
=======
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
>>>>>>> parent of 3dc7d4e (Included the analytics):frontend/src/Pages/DashboardPage.tsx
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
<<<<<<< HEAD:frontend/src/archive/components/Dashboard.tsx
    </Layout>
  );
=======
    </SidebarProvider>
  )
>>>>>>> parent of 3dc7d4e (Included the analytics):frontend/src/Pages/DashboardPage.tsx
}
