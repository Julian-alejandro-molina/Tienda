'use client'
import '@/app/styles/fomrsingup.css'
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ValidationPassword from '@/app/Tools/validationPassword';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from '@/app/Config/firebase/credential';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { DataUserContext } from '@/app/Context/nameUserContext';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function SingUp(params) {

    const {name}=useContext(DataUserContext)
    useEffect(()=>{
        if (name.length>0) {
            console.log(name[0].name_user);
        }
    },[name])
    const [username, setUsername] = useState('');
    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconfir, setPasswordConfir] = useState('');
    const [error, setError] = useState(null);
    const [data_Database, setData_Database] = useState([]);

    // Add a new document in collection "cities"
    async function getData() {
        try {
            const querySnapshot = await getDocs(collection(db, "userRegister"));
            const data = querySnapshot.docs.map((doc) => doc.data());
            setData_Database(data);
        } catch (error) {
            console.log(`Erro al obtener los datos de la base de datos ${error}`);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    async function set() {
        try {
            
            await setDoc(doc(db, "userRegister", uuidv4()), {
                name_user: username,
                email_user: useremail,
                password_user: password
            });
        } catch (error) {
            console.log(`Error al enviar los datos ${error}`);
        }
    }

    function Data(username, useremail, data_Database) {
        const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const result = regex.exec(useremail);

        if (!useremail || !username || !password || !passwordconfir) {
            setError('¡Los campos están vacíos!');
            alert('¡Los campos están vacíos!');
            return;
        }

        if (!result) {
            setError('Correo electrónico no válido');
            alert('Correo electrónico no válido');
            return;
        }

        if (passwordconfir !== password) {
            setError('Las contraseñas no coinciden');
            alert('Las contraseñas no coinciden');
            return;
        }
        // para el primer registro siempre las variables  (emailExists/passwordExists) van a valer false
        const emailExists = data_Database.some(element => element.email_user === useremail);
        const passwordExists = data_Database.some(element => element.password_user === password);
        //---------------------------------------------------------------------------------------------
        if (emailExists) {
            setError('Este correo electrónico ya está registrado');
            alert('Este correo electrónico ya está registrado');
            return;
        }

        if (passwordExists) {
            setError('Esta contraseña ya está registrada');
            alert('Esta contraseña ya está registrada');
            return;
        }

        setData_Database([...data_Database, { name_user: username, email_user: useremail, password_user: password }]);
        set();
        alert('¡Te has registrado con éxito!');
    }

    const CleanInputs = () => {
        setUsername('');
        setUserEmail('');
        setPassword('');
        setPasswordConfir('');
    }

    const Ejecut = () => {
        Data(username, useremail, data_Database);
        CleanInputs();
        ValidationPassword(password);
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
                            <label htmlFor="" className='label-form'>Nombre de usuario</label>
                            <input type="text" value={username} id="username" required onChange={e => setUsername(e.target.value)} className='inpunt-form' />

                            <label htmlFor="" className='label-form'>Correo</label>
                            <input type="email" value={useremail} id="useremail" required onChange={e => setUserEmail(e.target.value)} className='inpunt-form' />

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