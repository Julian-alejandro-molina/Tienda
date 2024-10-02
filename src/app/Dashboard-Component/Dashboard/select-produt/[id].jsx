import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { ApiDataContext } from '../../Context/ApiDataContext';
import { element } from 'prop-types';

export default function ProductDetails() {
    const { query } = useRouter();
    const { id } = query;
    const { products } = useContext(ApiDataContext);
   const product= products.find(element=> element.id===element. parseInt(id))

   useEffect(()=>{
    if (!product) {
        console.log('no hay');
        
    }
   },[])
}