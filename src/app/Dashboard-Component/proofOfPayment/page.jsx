"use client";
import "@/app/styles/payment.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Payment = () => {
  const [Datos, setDatos] = useState(null);
  const [Datosprice, setDatosPrice] = useState(null);
  const [noFac, setNoFac] = useState(null);
  const router = useRouter();
  useEffect(() => {
      const data = localStorage.getItem("DatosFactura");
      const Dataprice = localStorage.getItem("priceFacture");
      setDatos(data ? JSON.parse(data) : null);
      setDatosPrice(Dataprice ? JSON.parse(Dataprice) : null);
      setNoFac(Math.floor(1000+Math.random()*9000)); 
  }, []);
//--------GENERAR PDF----------------- 
  const generatePDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("factura.pdf");
    });
  };

  return (
    <div
      id="pdf-content"
      className="container-payment content-form max-w-md mx-auto p-4 border rounded-lg shadow-md"
    >
      <div className="container-img">
        <Image
          src="/images/exito.png"
          alt="Pago exitoso"
          width={100}
          height={100}
          priority
        />
        <p>Pago exitoso</p>
      </div>

      <div className="info-factura">
        <p className="no-auto">No. de autorización: {noFac}</p>
        <p>Fecha: {Datos?.expiry || "N/A"}</p>
        <p>Banco: {Datos?.card || "N/A"}</p>
      </div>

      <div className="valor-pago">
        <p className="price-fact">Valor de la transferencia</p>
        <h1>$ {Datosprice || "0"}</h1>
      </div>

      <div className="info-productt">
        <h1>Cuenta de destino</h1>
        <p>Nombre: {Datos?.name || "N/A"}</p>
        <p>Ahorro No. {Datos?.zip || "N/A"}</p>
        <h1>Costo de la transacción</h1>
        <h1 className="costo">$ 7892 sin IVA</h1>
      </div>

      {/* Botón para generar PDF */}
      <button className="btn-pdf btn btn-primary my-3" onClick={generatePDF}>
      <Image className='img-factu' src='/images/pago.png'alt='img-pago' width={50} height={50} priority></Image>
      </button>

      {/* Botón para volver al Dashboard */}
      <button
        className="btn-ok btn"
        onClick={() => router.push("/Dashboard-Component/Dashboard")}
      >
        Listo
      </button>
    </div>
  );
};

export default Payment;
