'use client'
import '@/app/styles/fomrsingup.css'
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import { useState } from 'react';
import ValidationPassword from '@/app/Tools/validationPassword';
export default function SingUp(params) {
    const [username, setUsername] = useState('');
    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconfir, setPasswordConfir] = useState('');
    const [error, setError] = useState(null)
    const [register, setRegister] = useState([])

    function Data(username, useremail) {

        let DataRegister = {
            username_f: username,
            useremail_f: useremail,
            password_f: password,
            passwordconfir_f: passwordconfir
        }

        console.log(DataRegister);
        const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const result = regex.exec(useremail)// Nos perimite buscar una coincidencia con la cadena(regex) anterior
        
        if (useremail === '' || username === '' || password === '' || passwordconfir === '') {
            alert('los campos esta vaios!!.');
            setError(alert);
            return;
        }
        if (result) {
            console.log(`correo electronico encontrado ${result[0]}`);
        } else {
            console.log('No se encontro el correo electronico');
            setError('Correo electronico no valido ')
            alert(error)
        }
        /*if (password.length < 8) {
            setError('La contraseña debe ser de almenos 8 caracteres');
            alert(error);
            return;
        }*/
        if (passwordconfir != password) {
            setError('Las contraseñas no coinciden');
            alert(error);
            return;
        }
        if (register.length > 0) {
            const emailExists = register.some(element => element.useremail_f === useremail);// some() es un método de array que verifica si al menos un elemento en el array cumple con la condición proporcionada. Devuelve true si se encuentra un elemento que cumple con la condición y false en caso contrario.
            const passwordExists = register.some(element => element.password_f=== password);
            if (emailExists) {
                setError('Este correo electronico ya esta registrado')
                alert(error)
                return;
            } 
            if (passwordExists) {
                setError('Esta  contraseña ya esta registrada')
                alert(error)
                return;
            }
            else {

                setRegister(e => [...e, DataRegister])//  Esta es una función que toma el estado anterior como argumento (e) y devuelve un nuevo array que contiene todos los elementos del array anterior (e) más un nuevo elemento (newData).
            }
        } else {
            setRegister(e => [...e, DataRegister])
        }
    }
    console.log(register);
//---------LIMPIAMOS LOS INPUTS A TREVES DE SUS ESTADOS 
    const CleanInputs=()=>{
        setUsername('');
        setUserEmail('');
        setPassword('');
        setPasswordConfir('');
    }
//--------------EJECUTAMOS LA FUNSION CON LOS ARGUMENTOS ENVIADOS-------------------------
    const Ejecut = () => {
        Data(username, useremail)
        CleanInputs();
        ValidationPassword(password)
    }

    return (
        <>
            <div className="container container-register">
                <Link href='/formlogin/iniciar'><IoIosArrowBack className='sinup-back' /></Link>
                <Image className='image-formulario-singup' src="/images/formulario.png" alt="img-login" width={500} height={500} priority />
                <main className="container col" role="main" tabIndex="0">

                    <div className='container-form'>
                        <h1 className='text-singup'>Singup</h1>
                        <p className='text-credential'>Ingresa tus crendenciales para continuar</p>
                        <form className='fomr'>
                            <label htmlFor="" className='label-form' >Nombre de usuario</label>
                            <input type="text" value={username} id="username" required onChange={e => setUsername(e.target.value)} className='inpunt-form' />

                            <label htmlFor="" className='label-form'>Correo</label>
                            <input type="text" value={useremail} id="useremail" required onChange={(e) => setUserEmail(e.target.value)} className='inpunt-form' />

                            <label htmlFor="" className='label-form'>Contraseña</label>
                            <input type="password" value={password} id="password" required onChange={e => setPassword(e.target.value)} className='inpunt-form' name="" />

                            <label htmlFor="password" className='label-form'>Confirmar contraseña</label>
                            <input type="password" className='inpunt-form' value={passwordconfir} id="passwordconfir" required onChange={e => setPasswordConfir(e.target.value)} name="" />

                        </form>
                    </div>
                    <button className='btn btn-register' onClick={Ejecut}>Registrar</button>



                </main>
            </div>
        </>
    );
}