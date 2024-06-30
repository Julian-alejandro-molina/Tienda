'use client'
import '@/app/styles/formlogin.css'
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import { useState } from 'react';
import ValidationPassword from '@/app/Tools/validationPassword';

export default function FormLogin() {
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)


    const Data = (email,password) => {
        const daatLogin = {
            username_f: email,
            password_f: password
        }
        const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.exec(email);

        if (email === '' ||  password === '') {
            alert('los campos esta vaios!!.');
            setError(alert);
            return;
        }
        if (regex) {
            console.log(`correo electronico encontrado ${regex[0]}`);
        } else {
            console.log('No se encontro el correo electronico');
            setError('Correo electronico no valido ')
            alert(error)
        }
        
    }

    const Ejecut=()=>{
        Data(email,password);
        ValidationPassword(password);
    }

    return (<>
        <div className="container  container-formlogin">
            <Link href='/Dashboard-Component/Dashboard'><IoIosArrowBack className='back' /></Link>
            <Image className='image-email' src="/images/user.png" alt="img-login" width={500} height={500} priority />
            <form >
                <div className="form-group">
                    <h1 className='shope'>Login</h1>
                    <p className='enter-login'>Ingresa tu correo y Contraseña</p>
                    <label className="label-username" htmlFor="email">Usuario</label>
                    <input
                        className="input-username"
                        type="text"
                        id="email"
                        value={email}
                        onChange={(event) => setUserEmail(event.target.value)}
                        required />
                </div>

                <label className="label-password" htmlFor="password">Contraseña</label>
                <div className="form-group">

                    <input
                        className="input-password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <button className='btn btn-login'onClick={Ejecut}>Login</button>
                    <Link href='/formsingup/singup ' className='link'><p className='sing-up'>Crear cuenta</p></Link>
                </div>
            </form>
        </div>
    </>
    );
}