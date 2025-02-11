'use client'

import '@/app/styles/dashboard.css';
import Seeker from '@/app/Componets/seeker';
import ProductItem from '@/app/Componets/ProductItem';
import { BsCart3 } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { DataUserContext } from '@/app/Context/nameUserContext';
import { ApiDataContext } from '@/app/Context/apiContext';
import useLocalStorage from '@/app/Tools/uselocalstorage';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    // Contextos y Estados
    const { name, visitor, setVisitor, priceamount, setpriceamount } = useContext(DataUserContext) || {};
    const { products, searchproduct, setSearchproduct, dataCardProduc } = useContext(ApiDataContext) || {};
    const router = useRouter();
    const [contador, setContador] = useState(1);
    const [productoEscagido, setProductoEscagido] = useState([]);
    const [productPriceSelect, setProductPriceSelect] = useState();
    const [ValorTotal, setValorTotal] = useState(0);
    const [hydrated, setHydrated] = useState(false);
    const [storedName, setStoredName] = useLocalStorage('name', '');

    // Efectos
    useEffect(() => {
        if (productoEscagido.length > 0) {
            setProductPriceSelect(productoEscagido[0].price);
            setValorTotal(productoEscagido[0].price); // Establece el ValorTotal inicialmente
        }
    }, [productoEscagido]);

    // Actualiza el valor total según la cantidad
    useEffect(() => {
        setpriceamount(ValorTotal); // Actualizamos el precio total en el contexto
    }, [ValorTotal, setpriceamount]);

    /*--------------FILTRADO DE PRODUCTO-------------------- */
    // Verificamos si searchproduct tiene datos antes de aplicar el filter
    useEffect(() => {
        // Filtrar productos en base a `searchproduct`
        if (searchproduct) {
            const filtered = products?.filter(product =>
                product.title.toLowerCase().includes(searchproduct.toLowerCase())
            );
            setProductoEscagido(filtered || []); // Si no hay productos, se establece un arreglo vacío
        }
    }, [searchproduct, products]);

    // FUNCIÓN PARA EJECUTAR EL FILTRADO Y ALMACENAMIENTO
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('productoencontrado'));
        if (data) {
            setProductoEscagido(data); // Se carga el producto encontrado desde el localStorage
        }
    }, []);


    // Estado para controlar si la aplicación ya ha sido hidratada
    useEffect(() => {
        setHydrated(true); // Marca la aplicación como hidratada
        if (visitor) {
            setStoredName(visitor);
        }
        if (name) {
            setStoredName(name); // Establece el nombre del visitante o usuario
        }
    }, [visitor, name]);

    // Si la aplicación no está completamente hidratada, no se renderiza el contenido
    if (!hydrated) {
        return null;
    }

    // FUNCIÓN PARA ELIMINAR EL FILTRO Y RESTABLECER EL ESTADO
    const Ejecutar = () => {
        localStorage.removeItem('productoencontrado');
        setProductoEscagido([]); // De esta manera se actualiza el estado con un valor vacío  
    };


    // Función para actualizar la cantidad
    const actualizarCantidad = (tipoOperacion) => {
        if (!isNaN(productPriceSelect)) {
            const nuevoContador = tipoOperacion === 'sumar' ? contador + 1 : Math.max(contador - 1, 1);
            const nuevoValorTotal = nuevoContador * productPriceSelect;
            

            console.log(`Nuevo Valor Total: ${nuevoValorTotal}`);
            setContador(nuevoContador); // Actualizamos el contador de cantidad
            setValorTotal(nuevoValorTotal); // Establecemos el nuevo valor total
            localStorage.setItem('valuecont', JSON.stringify(nuevoContador));
            localStorage.setItem('valuePrice', JSON.stringify(nuevoValorTotal)); // Guardamos en el localStorage
        } else {
            console.error('El valor de productPriceSelect no es válido.');
        }
    };
    //FUNSION PARA REDIRIGIR AL PRODUCTO SELECCIONADO
    console.log(productoEscagido);
        
    const Redirigir = () => {
        const name=productoEscagido.find(e=>e.name === productoEscagido?.name)
        console.log(name);
        if (ValorTotal <= productPriceSelect || contador <= 1) {
            localStorage.setItem('valuePrice', JSON.stringify(ValorTotal));
            localStorage.setItem('valuecont', JSON.stringify(contador));
        }
    
        if (name) {
            localStorage.setItem('myProduct', JSON.stringify(name));
            console.log('Datos guardados en el local storage.');
            router.push('/Dashboard-Component/Dashboard/select-produt');
        } else {
            console.log('no');

        }

    }

    // Renderización
    const renderizar = productoEscagido.length > 0
        ? productoEscagido.map(element => (
            <div key={element.id} className='cotainer-card-dashboard-'>
                <main className='container-img-listDashboard'>
                    <img className='img-list-cardDashboard' src={element.images[0]} alt={element.title} />
                </main>
                <ul className='info-product' onClick={Redirigir}>
                    <li className='product-name'>{element.title}</li>
                    <li className='color'>{element.category}</li>
                    <li className='price'>${element.price}</li>
                    <li className='brand'>{element.brand}</li>
                    <li className='quantity'>Valor cantidad: ${ValorTotal}</li>
                </ul>
                <div className='contador-'>
                    <IoIosCloseCircleOutline className='closer' onClick={Ejecutar} />
                    <button className='less-dashboard' onClick={() => actualizarCantidad('restar')}>-</button>
                    <button className='amount'>{contador}</button>
                    <button className='further' onClick={() => actualizarCantidad('sumar')}>+</button>
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

    // JSX Final
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
                {renderizar} {/* Renderizamos los productos o el producto seleccionado */}
            </div>
        </div>
    );
}
