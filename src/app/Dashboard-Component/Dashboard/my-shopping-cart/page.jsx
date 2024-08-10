'use client'
import '@/app/styles/my-shopping-cart.css'
import Navbar from '@/app/Componets/Navbar';
import Seeker from '@/app/Componets/seeker';
import { CiSearch } from "react-icons/ci";
import Image from 'next/image';
import '@/app/styles/Navbar.css'
import { DataUserContext, } from '@/app/Context/nameUserContext';
import { useContext } from 'react';

export default function Shoppingcart(params) {
    const {name}=useContext(DataUserContext);
    console.log(name)
    return (
        < >
            <div className="container container-shopping-cart">

                <div className="container-input-seeker">
                    <div className="container-icon">
                        <CiSearch className='icon-search' />
                    </div>
                    <input type="text" className='search-shopecart' placeholder='Buscar' />

                </div>
                <div className=' container-card-list'>
                   
                        <main className='cardmyproduct'>
                            <div className='image-product'>
                                <div className='img'><Image src="/images/descarga.jpg" alt="product" width={100} height={100} /></div>
                            </div>
                            <div className='info-product'>
                                <p className='product-name'>Apple iPhone 14 (128 GB) - Azul</p>
                                <p className='color'>color - Azul</p>
                                <p className='price'>$1200000</p>
                            </div>
                            <div className='contador'>
                                <button className='menos'>-</button>
                                <button className='cantidad'>1</button>
                                <button className='mas'>+</button>
                            </div>
                        </main>
                    
                </div>
                
            </div>
        </>);
}