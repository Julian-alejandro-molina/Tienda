
import Navbar from "@/app/Componets/Navbar"
import { DataUserContextProvider } from "@/app/Context/nameUserContext"
export default function DashboardLayout({ children }) {
  return (
    <DataUserContextProvider>
      <section>
        {children}
        <Navbar />
      </section>
    </DataUserContextProvider>
  )
};