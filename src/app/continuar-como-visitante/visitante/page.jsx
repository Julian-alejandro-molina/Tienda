'use client'
import '@/app/styles/visitante.css'
import Seeker from '@/app/Componets/seeker';
import Link from 'next/link';
import { DataUserContext, } from '@/app/Context/nameUserContext';
import { ApiDataContext } from '@/app/Context/apiContext';
import { ApiDataProvider } from '@/app/Context/apiContext';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Visitante(params) {
    const { products, searchproduct } = useContext(ApiDataContext) || {};
    const router = useRouter();

    // Verificamos si searchproduct tiene datos antes de aplicar el filter
    const filterpro = searchproduct
        ? products.filter(element => element.title.toLowerCase().includes(searchproduct.toLowerCase()))
        : []; // Si no hay datos en searchproduct, devolvemos un array vacío

    // Almacenamos el producto encontrado en localStorage
    const productoencontrado = (filterpro) => {
        localStorage.setItem('productoencontrado', JSON.stringify(filterpro));
    }


    // Función para ejecutar el filtrado y almacenamiento
    const ejecutar = () => {
        if (filterpro.length == 0) {
            return;
        }

        if (filterpro.length > 0) {
            productoencontrado(filterpro);
        } else {
            console.log("No se encontraron productos con el término de búsqueda.");
        }


        router.push('/Dashboard-Component/Dashboard');

    }

    return (
        <div className="container container-seeker">
            <img src="/images/comercio.png" alt="img-logo-seeker" className='buscador-seeker' />
            <h1 className='title-logo'>SHOPEBAZAR</h1>
            <Seeker />

            <button className='btn button-search'
                disabled={filterpro.length === 0} //si no hay productos filtrados se desabilita el boton 
                onClick={ejecutar}>Buscar</button>

        </div>
    );
}