'use client'
import '@/app/styles/select-produt.css'
import Image from 'next/image';
import Seeker from '@/app/Componets/seeker';
import { BsCart3 } from "react-icons/bs";
import Carrusel from '@/app/Componets/carrusel';
import { DataUserContext } from '@/app/Context/nameUserContext';
import { useContext, useEffect, useState } from 'react';





export default function SelectProduct() {
    const { priceamount } = useContext(DataUserContext);
    const [dataProduc, setDataProduc] = useState();
    const [name, setName] = useState();
    //console.log(priceamount);

    useEffect(() => {

        if (typeof window !== 'undefined') {

            const names = localStorage.getItem('name')
            if (names) {
                setName(JSON.parse(names))
                console.log('name', names);
            }
        }
    }, [])

    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {

                const data = localStorage.getItem('myProduct');
                console.log('Datos obtenidos correctamente');

                if (data) {
                    setDataProduc(JSON.parse(data));
                    //console.log(dataProduc);

                }
            }
        } catch (error) {
            console.error('Problemas al obtener los datos ');

        }

    }, [])

    const storedValue = (localStorage.getItem('valuePrice'));
    const value=storedValue === "undefined" || storedValue === null ? undefined : JSON.parse(storedValue) || dataProduc?.price
    
   




    return (

        <div className="container container-produt ">
            <div className='contaniner-seeker-BsCart3'>
                <div className='user-names'>
                    <Image className='icon-menu' src="/images/agregar-usuario.png" alt="" width={60} height={60} priority />
                    <p className='user-names-p'>Hola {name} !!</p> {/* Mostrar el valor de `storedName` */}
                </div>
                <Seeker />
                <BsCart3 className='icon-BsCart3' />
            </div>

            <div className='container-info-product'>
                <h1 className='neme-product'>{dataProduc?.title}</h1>
                <Carrusel />
                <p className='pricee'>{value?? dataProduc?.price}</p>
                <p className='send'>Envio gratis</p>
                <p className='stock-product'>Stock disponibles</p>
            </div>
            <button className='btn buy-now'>Comprar ahora</button>
            <button className='btn Add-to-cart'>Agregar al carrito</button>

        </div>

    );

}
//<Image className='image-produc-select' src='/images/descarga.jpg' width={250} height={250}></Image>