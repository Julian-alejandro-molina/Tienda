'use client'
import '@/app/styles/my-shopping-cart.css'
import '@/app/styles/Navbar.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext, useEffect, useState } from 'react';
import { firebaseConfig } from '@/app/Config/firebase/credential';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, collection, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { deleteProductFromCart } from '@/app/Utilidades/toolsFirebase';
import { useRouter } from 'next/navigation';





const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default function Shoppingcart(params) {

    let coletion = "shoppingCart"
    const [docs, setDocs] = useState([]);
    const router =useRouter()

    
    
    // ------Effect----------------- 
    useEffect(() => {
        getDocuments();
        console.log(docs);
    }, [])

    // ------Funtions-------

    const getDocuments = async (params) => {
        try {

            const querySnapshot = await getDocs(collection(db, coletion));
            const dataArray = querySnapshot.docs.map((doc) => ({
                id: doc.id, // ID único del documento
                ...doc.data(), // Datos del documento
            }));
            setDocs(dataArray);
            console.log('Documentos obtenidos correctamente');

        } catch (error) {
            console.error('No se pudo obtener los doscumentos', error);

        }
    }
    


    docs.map(element => element)

    const rederDocs = docs && docs.length > 0 ? docs.map(element => (
        <main key={uuidv4()} className='cardmyproduct-cart'>
            <div className='image-product'>
                <div className='img'><img src={element.imagen} alt="product" width={100} height={100} /></div>
            </div>
            <ul className='info-product-cart'>
                <li className='product-name-cart'>{element.name}</li>
                <li className='color-cart'>{element.categoria}</li>
                <li className='price-cart'>{element.price}</li>
                <li className='Product-quantity'>Catidad: {element.cantidad}</li>

            </ul>
            <div className='shopping'>

                <button className='delete' onClick={() => {
                    deleteProductFromCart(coletion, element.id),
                        setDocs(() => docs.filter(item => item.id !== element.id))// Utilizar !== simpre que se comparen objetos 
                    // y === simpre que se comparen valores primitivos 
                }}>
                    <RiDeleteBin6Line className='RiDeleteBin6Line' />
                </button>
                <button className='comprar' onClick={()=>{router.push('/Dashboard-Component/formshopee'); localStorage.setItem('priceFacture',JSON.stringify(element.price));}}>Comprar</button>
               

            </div>
        </main>)) : <p className='carritoVacio'>Carrito vacio</p>;


    return (
        < >
            <div className="container container-shopping-cart">


                <div className=' container-card-list'>
                    <h1 className='title-cart'>Mis productos</h1>
                    {rederDocs}
                </div>

            </div>
        </>);
}