import '@/app/styles/seeker.css';
import { useContext, useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { ApiDataContext } from '../Context/apiContext';

export default function Seeker() {
    const { setSearchproduct } = useContext(ApiDataContext) || {};
    const [search, setSearch] = useState('');

    // Efecto para actualizar el local storage y el contexto cuando cambia el input
    useEffect(() => {
        setSearchproduct(search); // Actualiza el contexto con el valor de búsqueda
        localStorage.setItem('searchValue', search); // Actualiza el local storage
    }, [search, setSearchproduct]);

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
        </div>
    );
}
