

/*Prueba unitaria(Unit Testing) de la funsion actualizarCantidad; esta funcion actualiza el estado del contador y el precio del producto    */
const { actualizarCantidad } = require("../Utilidades/funtions");

test('Debe incrementar la cantidad y actualizar el precio ', () => {
      const result =actualizarCantidad(2,100,'sumar');
      expect(result).toEqual({nuevoContador:3, nuevoValorTotal:300})
})
test('Debe decrementar la cantidad sin bajar de 1 y actualizar el precio', () => {
           
    const  result=actualizarCantidad(2,100,'restar');
   expect(result).toEqual({nuevoContador:1, nuevoValorTotal:100})
})
test("No debe reducir el contador por debajo de 1", () => {
    const result = actualizarCantidad(1, 100, "restar");
    expect(result).toEqual({ nuevoContador: 1, nuevoValorTotal: 100 });
});

