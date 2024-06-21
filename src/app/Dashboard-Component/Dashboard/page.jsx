import '@/app/styles/dashboard.css'
import Seeker from '@/app/Componets/seeker';
import { BsCart3 } from "react-icons/bs";
import Image from 'next/image';
import DashboardLayout from './DashboardLayout';
export default function Dashboard({ className, children }) {
    return (
        <>
            <div className="container contaner-dashboard">

                <div className='contaniner-seeker-BsCart3'>
                    <Image className='icon-menu' src="/images/comercio.png" alt="" width={60} height={60}/>
                  
                    <Seeker />
                    <BsCart3 className='icon-BsCart3' />
                </div>
                <div className='container container-dashborad-card'></div>

                <DashboardLayout />

            </div>


        </>
    );
}