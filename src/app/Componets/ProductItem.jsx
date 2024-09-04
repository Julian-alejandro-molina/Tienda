import { element } from "prop-types";
import { ApiDataProvider } from "../Context/apiContext";
import { ApiDataContext } from "../Context/apiContext";
import { useContext,useEffect } from "react";
export default function ProductItem(product) {        
    return (
        <ApiDataProvider>
        <>
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
        </>
        </ApiDataProvider>
    );
}