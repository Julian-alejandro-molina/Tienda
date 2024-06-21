import'@/app/styles/seeker.css';
import { CiSearch } from "react-icons/ci";
export default function Seeker(params) {
    return (
        <>
            <div className="container-input-seeker">
                <div className="container-icon">
                <CiSearch className='icon-search' />
                </div>
                <input type="text" className='search' placeholder='Buscar' />
                
            </div>
           
        </>
    )
}