import '@/app/styles/ProductItem.css'
import { DataUserContext } from '../Context/nameUserContext';
import { useState, useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';




export default function ProductItem({ price, title, description, images, category, brand, id }) {

    const { priceamount, setpriceamount } = useContext(DataUserContext);
    const [contador, setContador] = useState(1);
    const [ValorTotal, setValorTotal] = useState(price * contador);
    const [newvalorTotal, setNewvalorTotal] = useState(price);
    const router = useRouter();




    // Segun la informacion de las pros damos click para pasar al componente selec-produtc 
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
    //-------------CONTADOR DE UNIDADES--------------------- 
    const actualizarCantidad = (tipoOperacion) => {// Cada evento actuliza el parametro en la fucncion
        setContador((prevContador) => {
            const nuevoContador = tipoOperacion === 'sumar' ? prevContador + 1 : Math.max(prevContador - 1, 1);
            const nuevoValorTotal = nuevoContador * price;
            localStorage.setItem('valuecont', JSON.stringify(nuevoContador));
            // Actualizamos el valor total en base al nuevo contador
            setValorTotal(nuevoValorTotal);
            setpriceamount(nuevoValorTotal)
            
            localStorage.setItem('valuePrice', JSON.stringify(priceamount));
            return nuevoContador;
        });
    };

    
    useEffect(() => {
        localStorage.setItem('valuePrice', JSON.stringify(priceamount));
    }, [priceamount])

    return (


        <div className='cotainer-card-dashboard-'>
            <main className='container-img-listDashboard'>
                <img className='img-list-cardDashboard' src={images}></img>
            </main>
            <ul className='info-product' onClick={handleClick}>
                <li className='product-name'>{title}</li>
                <li className='color'>{category}</li>
                <li className='price'>Valor unidad ${price}</li>
                <li className='brand'>{brand}</li>
                <div className='container-quantity'>
                    <li className='quantity'>Valor cantidad :{ValorTotal}</li>


                </div>
            </ul>
            <div className='contador-'>
                <button className='less' onClick={() => actualizarCantidad('restar')} >-</button>
                <button className='amount'>{contador}</button>
                <button className='further' onClick={() => actualizarCantidad('sumar')}>+</button>
            </div>
        </div>



    );
}