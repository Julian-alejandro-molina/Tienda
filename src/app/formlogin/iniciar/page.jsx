import '@/app/styles/formlogin.css'
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';

export default function FormLogin() {
    return (<>
        <div className="container  container-formlogin">
          <Link href='/Dashboard-Component/Dashboard'><IoIosArrowBack className='back' /></Link>
            <Image className='image-email' src="/images/user.png" alt="img-login" width={500} height={500} />
            <form >
                <div className="form-group">
                <h1 className='shope'>Login</h1>
                <p className='enter-login'>Ingresa tu correo y Contraseña</p>
                    <label className="label-username" htmlFor="username">Usuario</label>
                    <input 
                        className="input-username"
                        type="text"
                        id="username"
                        //value={usernameEmail}
                        /*onChange={(event) => setUsername(event.target.value)}*/
                        required />
                </div>

                <label className="label-password" htmlFor="password">Contraseña</label>
                <div className="form-group">

                    <input
                        className="input-password"
                        type="password"
                        id="password"
                        // value={password}
                        /* onChange={(event) => setPassword(event.target.value)}*/
                        required
                    />
                <button className='btn btn-login'>Login</button>
                <Link href='/formsingup/singup ' className='link'><p className='sing-up'>Crear cuenta</p></Link>
                </div>
            </form>
        </div>
        </>
    );
}