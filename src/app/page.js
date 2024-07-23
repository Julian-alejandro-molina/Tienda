import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { Router } from "react-router-dom";
import { DataUserContextProvider } from "./Context/nameUserContext";
export default function Home() {
  return (
    
    <main className="container col" role="main" tabIndex="0">
      <div className="  container-logo-inicio  mx-auto text-center">
       <div className="container-img-hover"><Link href='/login'><img className='img-logo'src="images/comercio.png" alt="inicio"></img></Link> </div>
        <h1 className="name-shope">SHOPEBAZAR</h1>
      </div> 
      
     
    </main>
    
  );
}
  
