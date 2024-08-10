'use client'

import '@/app/styles/formlogin.css';
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from '@/app/Config/firebase/credential';
import { useEffect, useContext, useState } from 'react';
import { DataUserContext, DataUserContextProvider } from '@/app/Context/nameUserContext';
import { useRouter } from 'next/navigation';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function FormLogin() {
    const { setName, name } = useContext(DataUserContext) || {};
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data_Database, setData_Database] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const querySnapshot = await getDocs(collection(db, "userRegister"));
            const data = querySnapshot.docs.map((doc) => doc.data());
            setData_Database(data);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    }

    const Validation = () => {
        const EmailExis = data_Database.find(e => e.email_user === email);
        const PasswordExis = data_Database.find(e => e.password_user === password);

        if (!EmailExis) {
            alert('Este correo electrónico no existe');
            return;
        }

        if (!PasswordExis) {
            alert('La contraseña es incorrecta');
            return;
        }

        
        setName(EmailExis.name_user); 

        // Redirigir al Dashboard después de un pequeño retraso para asegurar que el contexto esté actualizado
            router.push('/Dashboard-Component/Dashboard');
        
    };

    useEffect(() => {
        if (name) {
            console.log('Nombre del usuario en FormLogin:', name);
        }
    }, [name]);

    return (
       
        <div className="container container-formlogin">
            <Link href='/Dashboard-Component/Dashboard'><IoIosArrowBack className='back' /></Link>
            <Image className='image-email' src="/images/user.png" alt="img-login" width={500} height={500} priority />
            <form>
                <div className="form-group">
                    <h1 className='shope'>Login</h1>
                    <p className='enter-login'>Ingresa tu correo y Contraseña</p>
                    <label className="label-username" htmlFor="email">Usuario</label>
                    <input
                        className="input-username"
                        type="text"
                        id="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <label className="label-password" htmlFor="password">Contraseña</label>
                <div className="form-group">
                    <input
                        className="input-password"
                        type="password"
                        id="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <button className='btn btn-login' type='button' onClick={Validation}>Login</button>
                    <Link href='/formsingup/singup' className='link'><p className='sing-up'>Crear cuenta</p></Link>
                </div>
            </form>
        </div>
        
    );
}