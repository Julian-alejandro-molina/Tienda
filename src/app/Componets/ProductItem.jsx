import '@/app/styles/ProductItem.css'
import Image from 'next/image';
import { ApiDataProvider } from "../Context/apiContext";
import { ApiDataContext } from "../Context/apiContext";
import { useContext, useEffect } from "react";
import stripHtml from 'string-strip-html';
import PropTypes from 'prop-types';

export default function ProductItem({price,title,description,images,category,brand}) {
    
    
    return (
        
        <ApiDataProvider>
          <div className='cotainer-card-dashboard'>
             <main className='container-img-listDashboard'>
              <img className='img-list-cardDashboard' src={images}></img>
             </main>
                <div className='info-product'>
                    <p className='product-name'>{title}</p>
                    <p className='color'>{category}</p>
                    <p className='price'>${price}</p>
                    <p className='brand'>{brand}</p>
                </div>
                <div className='contador'>
                    <button className='menos'>-</button>
                    <button className='cantidad'>1</button>
                    <button className='mas'>+</button>
                </div>
                </div>
        </ApiDataProvider>
            
    );
}