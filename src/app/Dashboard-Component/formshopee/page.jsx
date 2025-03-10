"use client";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "@/app/styles/pay.css";

export default function Pay() {
  const router = useRouter();

  //  Esquema de validaciones con Yup
  const validationSchema = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
    address: yup.string().required("La dirección es obligatoria"),
    city: yup.string().required("La ciudad es obligatoria"),
    zip: yup
      .string()
      .matches(/^\d{5,10}$/, "Número de cuenta inválido")
      .required("El número de cuenta es obligatorio"),
    card: yup.string().required("El banco es obligatorio"),
    expiry: yup.string().required("La fecha de expiración es obligatoria"),
    cvv: yup
      .string()
      .matches(/^\d{3,4}$/, "CVV inválido")
      .required("El CVV es obligatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched", // Validar solo cuando se toque el campo
  });

  //  Función para manejar el envío del formulario
  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
    localStorage.setItem("DatosFactura", JSON.stringify(data));
    router.push("/Dashboard-Component/proofOfPayment");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="content-form max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <IoIosCloseCircleOutline className="closer" onClick={() => router.push("/Dashboard-Component/Dashboard/my-shopping-cart")} />
      <h2 className="title text-xl font-bold mb-4">Información de Compra</h2>


      <label className="block mb-2">Nombre Completo</label>
      <input type="text" {...register("name")} className="input w-full p-2 border rounded-md mb-1" />
      <p className="text-red-500 text-sm">{errors.name?.message}</p>


      <label className="block mb-2">Correo Electrónico</label>
      <input type="email" {...register("email")} className="w-full p-2 border rounded-md mb-1" />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>

      <h3 className="title text-lg font-semibold mt-4">Dirección de Envío</h3>


      <label className="block mb-2">Dirección</label>
      <input type="text" {...register("address")} className="w-full p-2 border rounded-md mb-1" />
      <p className="text-red-500 text-sm">{errors.address?.message}</p>


      <label className="block mb-2">Ciudad</label>
      <input type="text" {...register("city")} className="w-full p-2 border rounded-md mb-1" />
      <p className="text-red-500 text-sm">{errors.city?.message}</p>


      <label className="block mb-2">Número de cuenta</label>
      <input type="text" {...register("zip")} className="w-full p-2 border rounded-md mb-1" />
      <p className="text-red-500 text-sm">{errors.zip?.message}</p>

      <h3 className="title text-lg font-semibold mt-4">Método de Pago</h3>


      <label className="block mb-2">Banco</label>
      <input type="text" {...register("card")} className="w-full p-2 border rounded-md mb-1" />
      <p className="text-red-500 text-sm">{errors.card?.message}</p>


      <label className="block mb-2">Fecha de Expiración</label>
      <input type="month" {...register("expiry")} className="w-full p-2 border rounded-md mb-1" />
      <p className="text-red-500 text-sm">{errors.expiry?.message}</p>


      <label className="block mb-2">CVV</label>
      <input type="text" {...register("cvv")} className="w-full p-2 border rounded-md mb-1" />
      <p className="text-red-500 text-sm">{errors.cvv?.message}</p>


      <button type="submit" className={`buttCompra btn ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`} disabled={!isValid}>
        Finalizar Compra
      </button>
    </form>
  );
}
