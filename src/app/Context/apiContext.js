import { useState, useEffect } from "react";
import { createContext } from 'react';
import commerce from '@/app/lib/commerce';


export const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
    const [products, setProducts] = useState();

    const fetchProducts = () => {
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>console.log(json))
      }

    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        console.log(products);

    }, [products]);


    const dataApi = {
        products, setProducts
    }
    return (
        <ApiDataContext.Provider value={dataApi}>
            {children}
        </ApiDataContext.Provider>
    )

}
