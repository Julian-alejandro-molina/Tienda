 function actualizarCantidad (contador, price, tipoOperacion){
    const nuevoContador = tipoOperacion === 'sumar' ? contador + 1 : Math.max(contador - 1, 1);
    const nuevoValorTotal = nuevoContador * price;

    return { nuevoContador, nuevoValorTotal };
};

module.exports = { actualizarCantidad };