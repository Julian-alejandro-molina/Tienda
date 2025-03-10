"use client";
import "@/app/styles/select-produt.css";
import Image from "next/image";
import Seeker from "@/app/Componets/seeker";
import { BsCart3 } from "react-icons/bs";
import Carrusel from "@/app/Componets/carrusel";
import { DataUserContext } from "@/app/Context/nameUserContext";
import { useContext, useEffect, useState } from "react";
import { firebaseConfig } from "@/app/Config/firebase/credential";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function SelectProduct() {
  const { priceamount } = useContext(DataUserContext);
  const [dataProduc, setDataProduc] = useState(null);
  const [name, setName] = useState(null);
  const [message, setMessage] = useState(false);
  const [amountt, setAmount] = useState(() => {
    const storedAmount = localStorage.getItem("valuecont");
    return storedAmount ? parseInt(storedAmount, 10) : 1;
  });

  // Obtener nombre del usuario desde localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      if (storedName) {
        setName(JSON.parse(storedName));
      }
    }
  }, []);

  // Obtener producto desde localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedProduct = localStorage.getItem("myProduct");
        if (storedProduct) {
          setDataProduc(JSON.parse(storedProduct));
        }
      } catch (error) {
        console.error("Error al obtener los datos del producto:", error);
      }
    }
  }, []);

  // Obtener precio, si no existe, usar el del producto
  const storedValue = localStorage.getItem("valuePrice");
  const value =
    priceamount ?? (storedValue ? JSON.parse(storedValue) : null) ?? dataProduc?.price;

  // Función para agregar a Firebase
  async function createRecord() {
    if (!dataProduc) return;
    try {
      await setDoc(doc(db, "shoppingCart", uuidv4()), {
        name: dataProduc?.title,
        price: value,
        categoria: dataProduc?.category,
        brand: dataProduc?.brand,
        imagen: dataProduc?.images,
        cantidad: amountt,
      });
      console.log("El registro se guardó con éxito");
      setMessage(true);
    } catch (error) {
      console.error("No se pudo crear el registro en Firebase", error);
    }
  }

  // Función para eliminar un producto de Firebase
  async function deleteDOC(docId) {
    try {
      await deleteDoc(doc(db, "shoppingCart", docId));
      console.log("Documento eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
    }
  }

  // Función para mostrar mensaje de éxito
  const seeMessage = () => setMessage(false);

  return (
    <div className="container container-produt">
      {/* Barra superior con buscador y usuario */}
      <div className="contaniner-seeker-BsCart3">
        <div className="user-names">
          <Image
            className="icon-menu"
            src="/images/agregar-usuario.png"
            alt="icon-user"
            width={60}
            height={60}
            priority
          />
          <p className="user-names-p">Hola {name} !!</p>
        </div>
        <Seeker />
        <BsCart3 className="icon-BsCart3" />
      </div>

      {/* Información del producto */}
      <div className="container-info-product">
        <div className="container-name">
          <h1 className="neme-product">{dataProduc?.title}</h1>
        </div>
        <div className="carrusel-container">
          <Carrusel />
        </div>
        <ul className="list-info-prudut">
          <li className="pricee">$: {value ?? "No disponible"}</li>
          <li className="send">Envío gratis</li>
          <li className="stock-product">Stock disponible</li>
          <li className="Catidad-produc">Cantidad: {amountt}</li>
        </ul>
      </div>

      {/* Botones de acción */}
      <button className="btn buy-now">Comprar ahora</button>
      <button className="btn Add-to-cart" onClick={createRecord}>
        Agregar al carrito
      </button>

      {/* Mensaje de éxito */}
      {message && (
        <main className="alert">
          <Image
            className="img-comprobado"
            src="/images/comprobado.png"
            width={60}
            height={60}
            alt="img-exito"
            priority
          />
          Tu producto se agregó con éxito
          <button className="button-aceptar" onClick={seeMessage}>
            Ok
          </button>
        </main>
      )}
    </div>
  );
}
