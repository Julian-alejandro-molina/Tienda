import styles from '@/app/login/Login.module.css'

import Link from 'next/link';
export default function Login() {
    return (
        <>
        <div className={styles.containerlogin}>
            <div className={styles.containerLoginLogo}>
                <img className={styles.imgLogin} src="images/comercio.png" alt="login"></img>
            </div>
            <div className={styles.containerLoginRegister}>
                <Link href='/continuar-como-visitante/visitante' className={styles.linkvisitante}><p className={styles.continue}>Continuar como visitante</p></Link>
  
                <Link href='/formlogin/iniciar' ><button className={styles.buttonLongin}>Iniciar</button></Link>
                <Link href='/formsingup/singup'><button className={styles.buttonregister}>Crear cuenta</button></Link>
            </div>
        </div>
  </>
    );
}