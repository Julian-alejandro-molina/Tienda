'use client'
import Navbar from "@/app/Componets/Navbar"
import { DataUserContextProvider } from "@/app/Context/nameUserContext"
import { ApiDataProvider } from "@/app/Context/apiContext"
export default function DashboardLayout({ children }) {
  return (
    <ApiDataProvider>
      <section>
        {children}
        <Navbar />
      </section>
    </ApiDataProvider>
  )
};
