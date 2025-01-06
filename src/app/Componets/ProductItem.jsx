import '@/app/styles/ProductItem.css';
import { DataUserContext } from '../Context/nameUserContext';
import { useState, useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function ProductItem({ price, title, description, images, category, brand, id }) {
    const { priceamount, setpriceamount } = useContext(DataUserContext);
    const [contador, setContador] = useState(1);
    const [ValorTotal, setValorTotal] = useState(price);
    const router = useRouter();

    const handleClick = () => {
        const selectedProduct = { id, price, title, description, images, category, brand };
        if (ValorTotal>price&& contador>1) {

            try {
                localStorage.setItem('myProduct', JSON.stringify(selectedProduct));
                console.log('Datos guardados en el local storage.');
            } catch (error) {
                console.error('No se guardaron los datos.', error);
            }
            router.push('/Dashboard-Component/Dashboard/select-produt');
        }else{
            localStorage.setItem('valuePrice', JSON.stringify(ValorTotal));
            localStorage.setItem('valuecont', JSON.stringify(contador));
            router.push('/Dashboard-Component/Dashboard/select-produt');
        }
    };

    const actualizarCantidad = (tipoOperacion) => {
        const nuevoContador = tipoOperacion === 'sumar' ? contador + 1 : Math.max(contador - 1, 1);
        const nuevoValorTotal = nuevoContador * price;

        setContador(nuevoContador);
        setValorTotal(nuevoValorTotal);

        localStorage.setItem('valuecont', JSON.stringify(nuevoContador));
        localStorage.setItem('valuePrice', JSON.stringify(nuevoValorTotal));
    };

    useEffect(() => {
        setpriceamount(ValorTotal);
    }, [ValorTotal, setpriceamount]);

    return (
        <div className='cotainer-card-dashboard-'>
            <main className='container-img-listDashboard'>
                <img className='img-list-cardDashboard' src={images} alt={title} />
            </main>
            <ul className='info-product' onClick={handleClick}>
                <li className='product-name'>{title}</li>
                <li className='color'>{category}</li>
                <li className='price'>Valor unidad ${price}</li>
                <li className='brand'>{brand}</li>
                <div className='container-quantity'>
                    <li className='quantity'>Valor cantidad: ${ValorTotal}</li>
                </div>
            </ul>
            <div className='contador-'>
                <button className='less' onClick={() => actualizarCantidad('restar')}>-</button>
                <button className='amount'>{contador}</button>
                <button className='further' onClick={() => actualizarCantidad('sumar')}>+</button>
            </div>
        </div>
    );
}
