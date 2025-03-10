import '@/app/styles/seeker.css';
import { useContext, useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { ApiDataContext } from '../Context/apiContext';
import { firebaseConfig } from '@/app/Config/firebase/credential';
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { element } from 'prop-types';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export default function Seeker() {
    const { setSearchproduct } = useContext(ApiDataContext) || {};
    const [search, setSearch] = useState('');
    const [contadorCart, setContadorCart] = useState(0);

    // Efecto para actualizar el local storage y el contexto cuando cambia el input
    useEffect(() => {
        setSearchproduct(search); // Actualiza el contexto con el valor de búsqueda
        localStorage.setItem('searchValue', search); // Actualiza el local storage
    }, [search, setSearchproduct]);

    //contador de productos en el carrito 
    useEffect(() => {
        // Suscripción en tiempo real a la colección "shoppingCart"
        const unsubscribe = onSnapshot(collection(db, "shoppingCart"), (snapshot) => {
            setContadorCart(snapshot.size); // Actualiza el estado con la cantidad de documentos
        });

        // Limpia la suscripción cuando el componente se desmonta
        return () => unsubscribe();
    }, []);

    const ver = contadorCart > 0 ? <div className='contador-carrito'>{contadorCart}</div> : '';
    return (
        <div className="container-input-seeker">
            <div className="container-icon">
                <CiSearch className='icon-search' />
            </div>
            <input
                type="text"
                id='Search'
                value={search}
                className='search'
                placeholder='Buscar'
                onChange={(e) => { setSearch(e.target.value); }} // Actualiza el estado con el valor del input
                required
            />
            {ver}

        </div>
    );
}
