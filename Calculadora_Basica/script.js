
const pantalla = document.getElementById("pantalla");

const botonesNumeros = document.querySelectorAll("[data-numero]");
const botonesOperadores = document.querySelectorAll("[data-operador]");

const botonBorrar = document.querySelector('[data-accion="borrar"]');
const botonSigno = document.querySelector('[data-accion="signo"]');
const botonPorcentaje = document.querySelector('[data-accion="porcentaje"]');
const botonIgual = document.querySelector('[data-accion="igual"]');


let numeroActual = "0";
let numeroAnterior = null;
let operador = null;
let esperandoNumero = false;


/* MOSTRAR EN PANTALLA */

function actualizarPantalla() {
    pantalla.textContent = numeroActual;
}


/* NÚMEROS */

botonesNumeros.forEach(boton => {

    boton.addEventListener("click", () => {

        const numero = boton.dataset.numero;

        // Punto decimal
        if (numero === ".") {

            if (numeroActual.includes(".")) {
                return;
            }

            numeroActual += ".";

            actualizarPantalla();

            return;
        }


        // Si estamos esperando un nuevo número
        if (esperandoNumero) {

            numeroActual = numero;

            esperandoNumero = false;

        } else {

            if (numeroActual === "0") {
                numeroActual = numero;
            } else {
                numeroActual += numero;
            }
        }

        actualizarPantalla();
    });

});


/* OPERADORES */

botonesOperadores.forEach(boton => {

    boton.addEventListener("click", () => {

        const nuevoOperador = boton.dataset.operador;

        if (operador !== null && esperandoNumero) {

            operador = nuevoOperador;

            return;
        }


        if (numeroAnterior !== null) {

            calcular();

        } else {

            numeroAnterior = parseFloat(numeroActual);
        }


        operador = nuevoOperador;

        esperandoNumero = true;
    });

});


/* CALCULAR */

function calcular() {

    const numero2 = parseFloat(numeroActual);

    if (numeroAnterior === null || operador === null) {
        return;
    }


    let resultado;


    switch (operador) {

        case "+":
            resultado = numeroAnterior + numero2;
            break;


        case "-":
            resultado = numeroAnterior - numero2;
            break;


        case "*":
            resultado = numeroAnterior * numero2;
            break;


        case "/":

            if (numero2 === 0) {

                pantalla.textContent = "Error";

                numeroActual = "0";
                numeroAnterior = null;
                operador = null;
                esperandoNumero = false;

                return;
            }

            resultado = numeroAnterior / numero2;

            break;
    }


    // Evita mostrar demasiados decimales
    resultado = Number(resultado.toFixed(10));


    numeroActual = String(resultado);

    numeroAnterior = resultado;

    actualizarPantalla();
}


/* BOTÓN IGUAL */

botonIgual.addEventListener("click", () => {

    if (operador === null || numeroAnterior === null) {
        return;
    }

    calcular();

    numeroAnterior = null;
    operador = null;
    esperandoNumero = true;
});


/* BOTÓN AC */

botonBorrar.addEventListener("click", () => {

    numeroActual = "0";
    numeroAnterior = null;
    operador = null;
    esperandoNumero = false;

    actualizarPantalla();
});


/* CAMBIAR SIGNO */

botonSigno.addEventListener("click", () => {

    if (numeroActual === "0") {
        return;
    }

    numeroActual = String(parseFloat(numeroActual) * -1);

    actualizarPantalla();
});


/* PORCENTAJE */

botonPorcentaje.addEventListener("click", () => {

    numeroActual = String(parseFloat(numeroActual) / 100);

    actualizarPantalla();
});

