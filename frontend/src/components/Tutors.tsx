import { useEffect } from "react"

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
    
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"

import TutorTable from "@/tables/tutor/Table"

import Layout from "./ui/component/Layout"



const imgs = ["/notification.svg", "/chat.svg", "user.svg"]

export default function Tutors() {
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
        <Layout>


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

              <div className="w-full">

                <TutorTable />
              </div>



            </SidebarInset>


        </Layout>
    )
}
