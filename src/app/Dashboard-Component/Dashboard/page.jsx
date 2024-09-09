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
import { array, element } from 'prop-types';




export default function Dashboard() {

    const { name, visitor, setVisitor } = useContext(DataUserContext) || {};
    const { products } = useContext(ApiDataContext) || {};
    useEffect(() => {
        if (products && products.length > 0) {
            // console.log(products);

            products.forEach(element => {
                console.log(element);

            });



        }


    }, [products])





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

        <div className="container contaner-dashboard">
            <div className='contaniner-seeker-BsCart3'>
                <div className='user'>
                    <Image className='icon-menu' src="/images/agregar-usuario.png" alt="" width={60} height={60} priority />
                    <p className='user-name'>Hola {storedName} !!</p> {/* Mostrar el valor de `storedName` */}
                </div>
                <Seeker />
                <BsCart3 className='icon-BsCart3' />
            </div>
            <div className=' container-dashborad-card'>
                {
                    products.map(element =>
                        <ProductItem
                            key={element.id}
                            title={element.title}
                            description={element.description}
                            images={element.images}
                            price={element.price}
                            category={element.category}
                            brand={element.brand}

                        >
                        </ProductItem>
                    )
                }
            </div>
        </div>


    );
}