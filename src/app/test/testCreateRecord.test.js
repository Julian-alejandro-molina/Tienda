import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SelectProduct from "@/app/Componets/SelectProduct";
import { DataUserContext } from "@/app/Context/nameUserContext";
import { act } from "react-dom/test-utils";
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Mock de Firebase para evitar llamadas reales a la base de datos
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn().mockResolvedValue("Documento agregado"),
}));
// simulamos un id fijo("mocked-uuid") para evitar fallos por valores diferentes en cada ejecucion 
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

// Simulamos el producto seleccionado y que posteriormente se guardara en la base de datos  
describe("Pruebas funcionales en createRecord", () => {
  test("Debe ejecutar createRecord y guardar los datos en Firebase", async () => {
    const mockDataProduc = {
      title: "Producto de prueba",
      category: "Categoría de prueba",
      brand: "Marca de prueba",
      images: ["imagen1.jpg"],
    };
    const mockAmount = 3;// catidad 
    const mockValue = 100;// precio 

    //Necesitamos renderizar SelectProduct para que la prueba se ejecute en un entorno similar al real.
    render(
      <DataUserContext.Provider value={{ priceamount: mockValue }}>
        <SelectProduct />
      </DataUserContext.Provider>
    );
    //Ahora buscamos el botón "Agregar al carrito" en la pantalla:
    const button = screen.getByText(/Agregar al carrito/i);

    // Simulamos el clic
    fireEvent.click(button);

    // Esperamos que setDoc se llame correctamente
    await waitFor(() => {
      expect(setDoc).toHaveBeenCalledWith(doc(expect.anything(), "shoppingCart", "mocked-uuid"), {
        name: mockDataProduc.title,
        price: mockValue,
        categoria: mockDataProduc.category,
        brand: mockDataProduc.brand,
        imagen: mockDataProduc.images,
        cantidad: mockAmount,
      });
    });

    // Verificamos que el mensaje de éxito se muestra
    expect(screen.getByText(/Tu producto se agregó con éxito/i)).toBeInTheDocument();
  });
});
