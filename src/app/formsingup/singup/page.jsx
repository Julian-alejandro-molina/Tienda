import '@/app/styles/fomrsingup.css'
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
export default function SingUp(params) {
    return (
        <>
            <div className="container container-register">
                <Link href='/formlogin/iniciar'><IoIosArrowBack className='sinup-back' /></Link>
                <Image className='image-formulario-singup' src="/images/formulario.png" alt="img-login" width={500} height={500} />
                <main className="container col" role="main" tabIndex="0">

                    <div className='container-form'>
                        <h1 className='text-singup'>Singup</h1>
                        <p className='text-credential'>Ingresa tus crendenciales para continuar</p>
                        <form className='fomr'>
                            <label htmlFor="" className='label-form' >Nombre de usuario</label>
                            <input type="text" className='inpunt-form' />

                            <label htmlFor="" className='label-form'>Correo</label>
                            <input type="text" className='inpunt-form' />

                            <label htmlFor="" className='label-form'>Contraseña</label>
                            <input type="text" className='inpunt-form' name="" id="" />

                            <label htmlFor="" className='label-form'>Confirmar contraseña</label>
                            <input type="text" className='inpunt-form' name="" id="" />

                        </form>
                    </div>
                    <button className='btn btn-register'>Registrar</button>



                </main>
            </div>
        </>
    );
}