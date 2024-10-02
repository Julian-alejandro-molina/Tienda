import '@/app/styles/ProductItem.css'
import Image from 'next/image';
import { ApiDataContext } from '../Context/apiContext';
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';



export default function ProductItem({ price, title, description, images, category, brand, id }) {

    const router = useRouter();

    const handleClick = () => {
        const selectedProduct = { id, price, title, description, images, category, brand }
        try {

            localStorage.setItem('myProduct', JSON.stringify(selectedProduct));
            console.log('datos guardados en el local storage ');
        } catch (error) {
            console.error('No se guardaron los datos ');

        }
        router.push('/Dashboard-Component/Dashboard/select-produt');
    }

    return (


        <div className='cotainer-card-dashboard-'>
            <main className='container-img-listDashboard'>
                <img className='img-list-cardDashboard' src={images}></img>
            </main>
            <ul className='info-product' onClick={handleClick}>
                <li className='product-name'>{title}</li>
                <li className='color'>{category}</li>
                <li className='price'>${price}</li>
                <li className='brand'>{brand}</li>
            </ul>
            <div className='contador-'>
                <button className='less'>-</button>
                <button className='amount'>1</button>
                <button className='further'>+</button>
            </div>
        </div>



    );
}