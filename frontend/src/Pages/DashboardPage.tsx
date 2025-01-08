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
      <SidebarInset>
        <header className="flex  h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex justify-between w-full items-center gap-2 px-3">
            <div className="flex items-center gap-2 px-3" >

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
              {
                imgs.map((img, index) => (
                  <div key={index} className="items-center gap-2 px-3">
                    <img src={img} alt="" className="w-8 h-8" />
                  </div>))
              }
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
