'use client'
import '@/app/styles/visitante.css'
import Seeker from '@/app/Componets/seeker';
import Link from 'next/link';
import { DataUserContext, } from '@/app/Context/nameUserContext';
import { ApiDataContext } from '@/app/Context/apiContext';
import { ApiDataProvider } from '@/app/Context/apiContext';
import { useContext, useEffect, useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { element } from 'prop-types';
export default function Visitante(params) {
    //const { visitor } = useContext(DataUserContext)|| {};
    const { products, searchproduct } = useContext(ApiDataContext) || {};
    //const [filterprodut, setFilterprodut] = useState();


    const filterpro = products.filter(element => element.title === searchproduct);
    const productoencontrado = (filterpro) => {
        localStorage.setItem('productoencontrado', JSON.stringify(filterpro))
    }

    const ejecutar = () => {
        productoencontrado(filterpro)

    }









    //Wooden Bathroom Sink With Mirror


    return (

        <>
            <div className="container container-seeker">
                <img src="/images/comercio.png" alt="img-logo-seeker" className='buscador-seeker' />
                <h1 className='title-logo'>SHOPEBAZAR</h1>
                <Seeker />

                <Link href='/Dashboard-Component/Dashboard'><button className='btn button-search'onClick={ejecutar} >Buscar</button></Link>
            </div>
        </>



    );
}