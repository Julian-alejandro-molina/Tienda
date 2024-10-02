import '@/app/styles/seeker.css';
import { useContext, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { ApiDataContext } from '../Context/apiContext';
import { useEffect } from 'react';
export default function Seeker(params) {
    const {setSearchproduct } = useContext(ApiDataContext) || {}
    const [search, setSearch] = useState('');
    useEffect(()=>{
        setSearchproduct(search);       
    },[search]);


    return (
        <>
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
                    onChange={(e) => { setSearch(e.target.value) }}
                    required
                />
            </div>

        </>
    )
}