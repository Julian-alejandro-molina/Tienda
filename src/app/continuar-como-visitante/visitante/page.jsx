'use client'
import '@/app/styles/visitante.css'
import Seeker from '@/app/Componets/seeker';
import Link from 'next/link';
import { DataUserContext, DataUserContextProvider } from '@/app/Context/nameUserContext';
import { useContext, useEffect } from 'react';
export default function Visitante(params) {
    const { visitor } = useContext(DataUserContext);
    useEffect(() => {

        console.log(visitor);
    }, [visitor]);

    return (

        <>
            <div className="container container-seeker">
                <img src="/images/comercio.png" alt="img-logo-seeker" className='buscador-seeker' />
                <h1 className='title-logo'>SHOPEBAZAR</h1>
                <Seeker />

                <Link href='/Dashboard-Component/Dashboard'><button className='btn button-search'>Buscar</button></Link>
            </div>
        </>


    );
}