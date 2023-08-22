const endPointMonedas = 'https://mindicador.cl/api';
const pesos = document.getElementById('pesos');
const convertir = document.getElementById('convertir');
const resultado = document.getElementById('resultado');

try {
    fetch('https://mindicador.cl/api/').then(respuesta => respuesta.json()).then(respuesta => {
        const invalidValues = ['version', 'autor', 'fecha', 'tasa_desempleo', 'libra_cobre', 'dolar_intercambio'];
        const nuevoArreglo = [];
        for (const key in respuesta) {
            if (!invalidValues.includes(key)) {
                nuevoArreglo.push({
                    nombre: respuesta[key].nombre,
                    valor: respuesta[key].valor,
                    codigo: respuesta[key].codigo,
                    unidad_medida: respuesta[key].unidad_medida,
                    fecha: respuesta[key].fecha
                });
            }
            const options = nuevoArreglo.map((moneda) => `<option value="${moneda.codigo}">${moneda.nombre}</option>`);
            document.getElementById('seleccionarMoneda').innerHTML = options.join('');

            convertir.addEventListener('click', () => {
                resultado.innerHTML = (pesos.value / respuesta[document.getElementById('seleccionarMoneda').value].valor).toFixed(2);
            });
        }
    });
} catch (error) {
    console.log(error);
}
