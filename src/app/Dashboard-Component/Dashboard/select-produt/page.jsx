'use client'
import '@/app/styles/select-produt.css'
import Image from 'next/image';
import Seeker from '@/app/Componets/seeker';
import { BsCart3 } from "react-icons/bs";
import Carrusel from '@/app/Componets/carrusel';
import { DataUserContext } from '@/app/Context/nameUserContext';
import { useContext, useEffect, useState } from 'react';
import { firebaseConfig } from '@/app/Config/firebase/credential';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, collection, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { getDocss } from '@/app/Utilidades/toolsFirebase'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)



export default function SelectProduct() {
    const { priceamount } = useContext(DataUserContext);
    const [dataProduc, setDataProduc] = useState();
    const [name, setName] = useState();
    const [message, setMessage] = useState(false);
    const [amountt,setAmount]= useState(localStorage.getItem('valuecont'));

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
    const value = storedValue === "undefined" || storedValue === null ? undefined : JSON.parse(storedValue) || dataProduc?.price


    // ENVIAR DATOS A LA BASE DE DATOS 
    async function createRecord(params) {
        try {
            await setDoc(doc(db, "shoppingCart", uuidv4()), {
                name: dataProduc?.title,
                price: storedValue,
                categoria: dataProduc?.category,
                brand: dataProduc?.brand,
                imagen: dataProduc?.images,
                cantidad: dataProduc?.contador

            });
            console.log('El registro se guardo con exito');
            setMessage(true);

        } catch (error) {
            console.error('No se pudo crear el registro');

        }


    }
    //ELIMINAR DOCUMENTOS DE LA BASE DE DATOS 
    async function deleteDOC(params) {
        try {
            const docRef = await addDoc(collection(db, "shoppingCart"), {
                name: dataProduc?.title,
                price: storedValue,
                categoria: dataProduc?.category,
                brand: dataProduc?.brand,
                imagen: dataProduc?.images,


            });
            console.log("Documento escrito con ID: ", docRef.id);
            setMessage(true);

        } catch (error) {
            console.error('No se pudo crear el registro');

        }


    }


    const seeMessage = () => {
        setMessage(!message)
    }
    const mostrar = message ? <main className='alert'>
        <Image className='img-comprobado' src="/images/comprobado.png" width={60} height={60} alt="img-exito" priority />
        Tu producto se agregó con éxito
        <button className='button-aceptar' onClick={seeMessage}>ok</button>
    </main> : "";





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
                <div className='container-name'>
                    <h1 className='neme-product'>{dataProduc?.title}</h1>
                </div>
                <div className='carrusel-container'>
                    <Carrusel />
                </div>
                <ul className='list-info-prudut'>
                    <li className='pricee'>$: {value ?? dataProduc?.price}</li>
                    <li className='send'>Envio gratis</li>
                    <li className='stock-product'>Stock disponibles</li>
                    <li className='Catidad-produc'>Cantidad : {amountt}</li>
                </ul>
            </div>
            <button className='btn buy-now'>Comprar ahora</button>
            <button className='btn Add-to-cart' onClick={createRecord} >Agregar al carrito</button>
            {mostrar}

        </div>

    );

}
//<Image className='image-produc-select' src='/images/descarga.jpg' width={250} height={250}></Image>