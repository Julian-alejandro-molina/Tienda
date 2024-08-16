'use client'
import styles from '@/app/login/Login.module.css'
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { DataUserContext } from '../Context/nameUserContext';
import { DataUserContextProvider } from '../Context/nameUserContext';


export default function Login() {
    const [visit, setVisit]=useState('bienvenido');
    const {name,setName,visitor,setVisitor}=useContext(DataUserContext);
    useEffect(()=>{
    
        console.log('oe',name);
    },[visit])
     
    
   
    return (
        <>
        
        <div className={styles.containerlogin}>
            <div className={styles.containerLoginLogo}>
                <img className={styles.imgLogin} src="images/comercio.png" alt="login" property=''></img>
            </div>
            <div className={styles.containerLoginRegister}>
                <Link href='/continuar-como-visitante/visitante' onClick={()=>{setVisitor(visit)}} className={styles.linkvisitante}><p className={styles.continue}>Continuar como visitante</p></Link>
  
                <Link href='/formlogin/iniciar' ><button className={styles.buttonLongin}>Iniciar</button></Link>
                <Link href='/formsingup/singup'><button className={styles.buttonregister}>Crear cuenta</button></Link>
            </div>
        </div>
        
  </>
    );
}