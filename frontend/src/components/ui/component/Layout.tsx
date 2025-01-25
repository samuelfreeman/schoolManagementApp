import React from 'react'

import {
    SidebarInset,
    SidebarProvider,

} from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <SidebarProvider>

                <AppSidebar />
                <SidebarInset>

                    <main className='flex'>{children}</main>
                </SidebarInset>
            </SidebarProvider>

        </div>
    )
}

export default Layout
