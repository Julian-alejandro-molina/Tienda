'use client'
import '@/app/styles/dashboard.css'
import Seeker from '@/app/Componets/seeker';
import { BsCart3 } from "react-icons/bs";
import Image from 'next/image';
import DashboardLayout from './layout';
import Navbar from '@/app/Componets/Navbar';
import { useContext, useState } from 'react';
import { DataUserContext, DataUserContextProvider } from '@/app/Context/nameUserContext';


export default function Dashboard({ className, children }) {
    const { name, setName } = useContext(DataUserContext) || {};
    useState(()=>{

        console.log('re', name);
    },[])
    return (
        
            <div className="container contaner-dashboard">

                <div className='contaniner-seeker-BsCart3'>
                    <div className='user'>
                        <Image className='icon-menu' src="/images/agregar-usuario.png" alt="" width={60} height={60} priority />
                        <p className='user-name'>{name}</p>
                    </div>
                    <Seeker />
                    <BsCart3 className='icon-BsCart3' />
                </div>
                <div className='container container-dashborad-card'></div>


              

            </div>


        
    );
}