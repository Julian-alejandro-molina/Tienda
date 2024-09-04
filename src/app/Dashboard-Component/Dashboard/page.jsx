'use client'

import '@/app/styles/dashboard.css'
import Seeker from '@/app/Componets/seeker';
import { BsCart3 } from "react-icons/bs";
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { DataUserContext } from '@/app/Context/nameUserContext';
import useLocalStorage from '@/app/Tools/uselocalstorage';
import { ApiDataContext, ApiDataProvider } from '@/app/Context/apiContext';
import ProductItem from '@/app/Componets/ProductItem';
import { element } from 'prop-types';



export default function Dashboard() {

    const { products } = useContext(ApiDataContext) || {};
   if (products&& products.length>0) {
    console.log(products);
    
   }
   
      

    const { name, visitor, setVisitor } = useContext(DataUserContext) || {};


    // Estado para controlar si la aplicación ya ha sido hidratada
    const [hydrated, setHydrated] = useState(false);

    const [storedName, setStoredName] = useLocalStorage('name', '');

    useEffect(() => {
        // Marca la aplicación como hidratada
        setHydrated(true);
        if (visitor) {
            setStoredName(visitor);
        }
        if (name) {
            setStoredName(name)
        }
    }, [visitor, name]);

    if (!hydrated) {
        // Si la aplicación no está hidratada, evita renderizar el contenido dependiente del estado
        return null;
    }

    return (
        <ApiDataProvider>
            <div className="container contaner-dashboard">
                <div className='contaniner-seeker-BsCart3'>
                    <div className='user'>
                        <Image className='icon-menu' src="/images/agregar-usuario.png" alt="" width={60} height={60} priority />
                        <p className='user-name'>Hola {storedName} !!</p> {/* Mostrar el valor de `storedName` */}
                    </div>
                    <Seeker />
                    <BsCart3 className='icon-BsCart3' />
                </div>
                <div className='container container-dashborad-card'>
                    
                </div>
            </div>
        </ApiDataProvider>
    );
}