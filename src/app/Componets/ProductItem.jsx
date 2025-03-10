import '@/app/styles/ProductItem.css';
import { DataUserContext } from '../Context/nameUserContext';
import { useState, useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { actualizarCantidad } from '../Utilidades/funtions';


export default function ProductItem({ price, title, description, images, category, brand, id }) {
    const { priceamount, setpriceamount } = useContext(DataUserContext);
    const [contador, setContador] = useState(1);
    const [ValorTotal, setValorTotal] = useState(price);
    const router = useRouter();

    //Funsion para enviar datos al localstorage con la informacion de la catidad y precio del producto  
     const handleClick = () => {
        const selectedProduct = { id, price, title, description, images, category, brand,contador };
    
        // Validación  de las variables
        if (typeof ValorTotal === 'undefined' || typeof contador === 'undefined') {
            console.error('ValorTotal o contador no están definidos.');
            return;
        }
    
        
        if (ValorTotal <= price || contador <= 1) {
            localStorage.setItem('valuePrice', JSON.stringify(ValorTotal));
            localStorage.setItem('valuecont', JSON.stringify(contador));
        }
    
        // Guardar el producto seleccionado y redirigir
        try {
            localStorage.setItem('myProduct', JSON.stringify(selectedProduct));
            console.log('Datos guardados en el local storage.');
            router.push('/Dashboard-Component/Dashboard/select-produt');
        } catch (error) {
            console.error('No se guardaron los datos.', error);
           
        }
    };
    
//ATUALIZAMOS EL VALOR DEPENDIENDO DE LA CANTIDAD 
const handleActualizarCantidad = (tipoOperacion) => {
    const { nuevoContador, nuevoValorTotal } = actualizarCantidad(contador, price, tipoOperacion);

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
                <button className='less' onClick={() => handleActualizarCantidad('restar')}>-</button>
                <button className='amount'>{contador}</button>
                <button className='further' onClick={() => handleActualizarCantidad('sumar')}>+</button>
            </div>
        </div>
    );
}
