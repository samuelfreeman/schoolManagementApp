import * as React from "react"
// import { GalleryVerticalEnd } from "lucide-react"
import { useAppDispatch } from "@/store/hooks"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

// This is sample data.
const navigation = {
  main: [
    {
      label: "Dashboard",
      href: "/",
      icon: "/dashboard.svg"
    },
    {
      label: "Tutors",
      href: "/Tutors",
      icon: "/tutors.svg"
    },
    {
      label: "Students",
      href: "/Students",
      icon: "/student.svg"
    },
    {
      label: "Guadians",
      href: "/Guadians",
      icon: "/guardian.svg"
    },
    {
      label: "Payment",
      href: "/payment",
      icon: "/wallet.svg"
    }, {
      label: "Settings",
      href: "/settings",
      icon: "/setting.svg"
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  async function handleClick() {
    const result = dispatch({ type: "admin/logout" })
    console.log(result)
    navigate("/login")

  }
  return (
    <Sidebar {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[0F225E] text-sidebar-primary-foreground">
                  <img src="/schoolhat.svg" alt="" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">KleeSam
                    Educational Complex</span>

                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu >
            {
              navigation.main.map((item) => (

                <SidebarMenuItem key={item.label} className="flex py-3 p-4">
                  <SidebarMenuButton asChild >
                    <div>
                      <Label> <img src={item.icon} alt="" />  </Label>

                      <a href={item.href} className="font-medium">
                        {item.label}
                      </a>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            }

            <SidebarMenuButton asChild className="mt-16 w-full h-16">
              <div className="p-0">

                <Button className="w-full h-full m-0 p-0 bg-transparent justify-start hover:bg-white hover:text-black" onClick={handleClick}>
                  <img src="/logout.svg" className="w-10 h-10" alt="" />


                  {"Logout"}

                </Button>
              </div>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
