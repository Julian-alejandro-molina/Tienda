import '@/app/styles/Navbar.css'
import { CiHome } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { RiUserLine } from "react-icons/ri"
import Link from 'next/link';
export default function Navbar({className,children}) {
    return (
        <div className={`container-sec ${className} `}>
            <section className="contariner section-navbar">
                <main className='container container-fluid py-* px-* main-navbar '>
                    <Link href='/Dashboard-Component/Dashboard'><div className='conten-icon'><CiHome className='icon'/></div></Link>
                    <Link href='/Dashboard-Component/Dashboard/my-shopping-cart'><div className='conten-icon'><CiShoppingCart className='icon' /></div></Link>
                    <Link href=''><div className='conten-icon'><IoMdHeartEmpty className='icon' /></div></Link>
                    <Link href='/formlogin/iniciar'><div className='conten-icon'><RiUserLine className='icon' /></div></Link>
                </main>
            </section>
            {children}
        </div>
    );
}