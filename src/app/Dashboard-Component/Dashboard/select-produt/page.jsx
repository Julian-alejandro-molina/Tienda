'use client'
import '@/app/styles/select-produt.css'
import Image from 'next/image';
import Seeker from '@/app/Componets/seeker';
import { BsCart3 } from "react-icons/bs";
import Navbar from '@/app/Componets/Navbar';
import Carrusel from '@/app/Componets/carrusel';
import { useContext } from 'react';
import { DataUserContext } from '@/app/Context/nameUserContext';
export default function SelectProduct({ className, children }) {
    const {name}=useContext(DataUserContext);
    console.log(name);
    return (
       
            <div className="container container-produt ">
                <div className='contaniner-seeker-BsCart3'>
                    <Image className='icon-menu' src="/images/agregar-usuario.png"  alt="user" width={60} height={60} priority  />

                    <Seeker />
                    <BsCart3 className='icon-BsCart3' />
                </div>
                <div className='container-info-product'>
                    <h1 className='neme-product'>Apple iphon 11 (64 BG) -Gris</h1>
                    <Carrusel/>
                    <p className='pricee'>$ 1200000</p>
                    <p className='send'>Envio gratis</p>
                    <p className='stock-product'>Stock disponibles</p>
                </div>
                <button className='btn buy-now'>Comprar ahora</button>
                <button className='btn Add-to-cart'>Agregar al carrito</button>
                
                {children}
            </div>
        );

}
//<Image className='image-produc-select' src='/images/descarga.jpg' width={250} height={250}></Image>