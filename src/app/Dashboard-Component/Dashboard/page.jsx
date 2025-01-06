'use client'

import '@/app/styles/dashboard.css'
import Seeker from '@/app/Componets/seeker';
import { BsCart3 } from "react-icons/bs";
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { DataUserContext } from '@/app/Context/nameUserContext';
import useLocalStorage from '@/app/Tools/uselocalstorage';
import { ApiDataContext, } from '@/app/Context/apiContext';
import ProductItem from '@/app/Componets/ProductItem';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { element } from 'prop-types';



export default function Dashboard() {

    const { name, visitor, setVisitor } = useContext(DataUserContext) || {};
    const { products, searchproduct,setSearchproduct } = useContext(ApiDataContext) || {};
    const { dataCardProduc } = useContext(ApiDataContext) || {}
    const [productoEscagido, setProductoEscagido] = useState();

    /*--------------FILTRADO DE PRODUCTO-------------------- */
    // Verificamos si searchproduct tiene datos antes de aplicar el filter
    useEffect(() => {
        // Filtrar productos en base a `searchproduct`
        if (searchproduct) {
            const filtered = products?.filter(product =>
                product.title.toLowerCase().includes(searchproduct.toLowerCase())
            );
            setProductoEscagido(filtered || []);
        } 
    }, [searchproduct, products])






    // Función para ejecutar el filtrado y almacenamiento

    //console.log('dasdasda', dataCardProduc);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('productoencontrado'));
        if (data) {
            setProductoEscagido(data);
        }
    }, []);

    const Ejecutar = () => {
        localStorage.removeItem('productoencontrado');
        setProductoEscagido([]); // De esta manera se actualiza el estado co un valor vacio  

    }
    useEffect(() => {
        if (products && products.length > 0) {
            // console.log(products);

            products.forEach(element => {
                //console.log(element);

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

    //Renderizamos de pendiendo de
    //const productoencontrado = JSON.parse(localStorage.getItem('productoencontrado'));
    const renderizar = productoEscagido && productoEscagido.length > 0
        ? productoEscagido.map(element => ( // Asumiendo que productoencontrado es un array
            <div key={element.id} className='cotainer-card-dashboard-'>
                <main className='container-img-listDashboard'>
                    <img className='img-list-cardDashboard' src={element.images[0]} alt={element.title} />
                </main>
                <ul className='info-product'>
                    <li className='product-name'>{element.title}</li>
                    <li className='color'>{element.category}</li>
                    <li className='price'>${element.price}</li>
                    <li className='brand'>{element.brand}</li>
                </ul>
                <div className='contador-'>
                    <IoIosCloseCircleOutline className='closer' onClick={Ejecutar} />
                    <button className='less-dashboard'>-</button>
                    <button className='amount'>1</button>
                    <button className='further'>+</button>
                </div>
            </div>
        ))
        : products.map(element => (
            <ProductItem
                key={element.id}
                title={element.title}
                description={element.description}
                images={element.images}
                price={element.price}
                category={element.category}
                brand={element.brand}
                id={element.id}
            />
        ));

    return (
        <div className="container contaner-dashboard">
            <div className='contaniner-seeker-BsCart3'>
                <div className='user'>
                    <Image
                        className='icon-menu'
                        src="/images/agregar-usuario.png"
                        alt="icono usuario"
                        width={60}
                        height={60}
                        priority
                    />
                    <p className='user-name'>Hola {storedName} !!</p> {/* Mostrar el valor de `storedName` */}
                </div>
                <Seeker />
                <BsCart3 className='icon-BsCart3' />
            </div>

            <div className='container-dashborad-card'>
                {renderizar}
            </div>
        </div>
    );
}