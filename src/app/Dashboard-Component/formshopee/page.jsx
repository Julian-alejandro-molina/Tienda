'use client'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import '@/app/styles/pay.css'
import { Router } from "react-router-dom";
import { useRouter } from "next/navigation";

export default function pay() {
  const router =useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

const closer=()=>{
  router.push('/Dashboard-Component/Dashboard/my-shopping-cart')
  console.log(formData);
  
}

  return (
    <form onSubmit={handleSubmit} className="content-form max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <IoIosCloseCircleOutline className="closer" onClick={ closer} />
      <h2 className="title text-xl font-bold mb-4">Información de Compra</h2>

      <label className="block mb-2">Nombre Completo</label>
      <input type="text" name="name" onChange={handleChange} required className=" input w-full p-0 border rounded-md mb-3" />

      <label className="block mb-2">Correo Electrónico</label>
      <input type="email" name="email" onChange={handleChange} required className="w-full p-0 border rounded-md mb-3" />

      <h3 className=" title text-lg font-semibold mt-4">Dirección de Envío</h3>
      <label className="block mb-2">Dirección</label>
      <input type="text" name="address" onChange={handleChange} required className="w-full p-0 border rounded-md mb-3" />

      <label className="block mb-2">Ciudad</label>
      <input type="text" name="city" onChange={handleChange} required className="w-full p-0 border rounded-md mb-3" />

      <label className="block mb-2">Código Postal</label>
      <input type="text" name="zip" onChange={handleChange} required className="w-full p-0 border rounded-md mb-3" />

      <h3 className=" title text-lg font-semibold mt-4">Método de Pago</h3>
      <label className="block mb-2">Número de Tarjeta</label>
      <input type="text" name="card" onChange={handleChange} required className="w-full p-0 border rounded-md mb-3" />

      <label className="block mb-2">Fecha de Expiración</label>
      <input type="month" name="expiry" onChange={handleChange} required className="w-full p-0 border rounded-md mb-3" />

      <label className="block mb-2">CVV</label>
      <input type="text" name="cvv" onChange={handleChange} required className="w-full p-0 border rounded-md mb-3" />

      <button type="submit" className=" buttCompra ">
        Finalizar Compra
      </button>
    </form>
  );
}
