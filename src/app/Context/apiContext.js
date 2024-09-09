import { useState, useEffect } from "react";
import { createContext } from 'react';
import commerce from '@/app/lib/commerce';


export const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        fetch('https://dummyjson.com/products')
            .then(res=>res.json())
            .then(json=>setProducts(json.products))
        
      }

    useEffect(() => {
        fetchProducts();
    }, []);
    


    const dataApi = {
        products, setProducts
    }
    return (
        <ApiDataContext.Provider value={dataApi}>
            {children}
        </ApiDataContext.Provider>
    )

}
