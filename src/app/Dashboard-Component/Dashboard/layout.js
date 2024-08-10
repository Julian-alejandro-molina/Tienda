'use client'
import Navbar from "@/app/Componets/Navbar"
import { DataUserContextProvider } from "@/app/Context/nameUserContext"
export default function DashboardLayout({ children }) {
  return (

      <section>
        {children}
        <Navbar />
      </section>
      
    
  )
};
