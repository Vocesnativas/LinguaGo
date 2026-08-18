/* =====================================================
   LINGUAGO
   JavaScript principal
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

let juegoActual = null;
let puntuacion = 0;
let preguntaActual = 0;
let tiempo = 10;
let temporizador = null;


/* =====================================================
   CUANDO CARGA LA PÁGINA
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("LinguaGo iniciado correctamente 🚀");


    /* =================================================
       NAVEGACIÓN SUAVE
    ================================================= */

    const enlaces = document.querySelectorAll(
        'a[href^="#"]'
    );

    enlaces.forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {

            const destino =
                enlace.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const seccion =
                document.querySelector(destino);

            if (seccion) {

                evento.preventDefault();

                seccion.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                cerrarMenu();

            }

        });

    });


    /* =================================================
       ANIMACIÓN DE TARJETAS
    ================================================= */

    const elementos =
        document.querySelectorAll(
            ".tarjeta, .curso, .juego, .premium-box"
        );


    const observador =
        new IntersectionObserver(

            (entradas) => {

                entradas.forEach((entrada) => {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add(
                            "visible"
                        );

                        entrada.target.style.opacity =
                            "1";

                        entrada.target.style.transform =
                            "translateY(0)";

                        observador.unobserve(
                            entrada.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    elementos.forEach((elemento) => {

        elemento.style.opacity = "0";

        elemento.style.transform =
            "translateY(25px)";

        elemento.style.transition =
            "opacity .6s ease, transform .6s ease";

        observador.observe(elemento);

    });


    /* =================================================
       CERRAR MENSAJE AL HACER CLIC AFUERA
    ================================================= */

    const ventanaMensaje =
        document.getElementById("mensaje");

    if (ventanaMensaje) {

        ventanaMensaje.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target ===
                    ventanaMensaje
                ) {

                    cerrarMensaje();

                }

            }
        );

    }


    /* =================================================
       CERRAR JUEGO AL HACER CLIC AFUERA
    ================================================= */

    const ventanaJuego =
        document.getElementById("juegoModal");

    if (ventanaJuego) {

        ventanaJuego.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target ===
                    ventanaJuego
                ) {

                    cerrarJuego();

                }

            }
        );

    }

});


/* =====================================================
   MENÚ RESPONSIVE
===================================================== */

function abrirMenu() {

    const nav =
        document.getElementById("menuPrincipal");

    const boton =
        document.getElementById("btnMenu");

    if (!nav) return;


    if (nav.classList.contains("menu-abierto")) {

        cerrarMenu();

        return;

    }


    nav.classList.add("menu-abierto");

    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    nav.style.position = "absolute";
    nav.style.top = "72px";
    nav.style.right = "5%";
    nav.style.padding = "20px";
    nav.style.gap = "18px";
    nav.style.background = "white";
    nav.style.borderRadius = "15px";
    nav.style.boxShadow =
        "0 15px 35px rgba(0,0,0,.15)";

    if (boton) {

        boton.setAttribute(
            "aria-expanded",
            "true"
        );

        boton.textContent = "✕";

    }

}


/* =====================================================
   CERRAR MENÚ
===================================================== */

function cerrarMenu() {

    const nav =
        document.getElementById("menuPrincipal");

    const boton =
        document.getElementById("btnMenu");

    if (!nav) return;

    nav.classList.remove("menu-abierto");

    if (window.innerWidth <= 1000) {

        nav.style.display = "none";

    } else {

        nav.style.display = "";

    }

    nav.style.position = "";
    nav.style.top = "";
    nav.style.right = "";
    nav.style.padding = "";
    nav.style.gap = "";
    nav.style.background = "";
    nav.style.borderRadius = "";
    nav.style.boxShadow = "";
    nav.style.flexDirection = "";

    if (boton) {

        boton.setAttribute(
            "aria-expanded",
            "false"
        );

        boton.textContent = "☰";

    }

}


/* =====================================================
   MENSAJES
===================================================== */

function mostrarMensaje(curso) {

    const ventana =
        document.getElementById("mensaje");

    const texto =
        document.getElementById("mensaje-texto");

    const titulo =
        document.getElementById("mensaje-titulo");


    if (!ventana || !texto) return;


    if (titulo) {
        titulo.textContent = curso;
    }


    texto.textContent =
        "Esta sección forma parte de LinguaGo. Estamos preparando nuevas actividades para que puedas aprender, practicar y avanzar.";


    ventana.classList.add("activo");

}


function cerrarMensaje() {

    const ventana =
        document.getElementById("mensaje");

    if (!ventana) return;

    ventana.classList.remove("activo");

}


/* =====================================================
   CLASES
===================================================== */

function solicitarClase() {

    const ventana =
        document.getElementById("mensaje");

    const texto =
        document.getElementById("mensaje-texto");

    const titulo =
        document.getElementById("mensaje-titulo");


    if (!ventana || !texto) return;


    if (titulo) {
        titulo.textContent =
            "Clases virtuales 👨‍🏫";
    }


    texto.textContent =
        "Muy pronto podrás solicitar una clase virtual de español o inglés en LinguaGo.";


    ventana.classList.add("activo");

}


/* =====================================================
   PREMIUM
===================================================== */

function mostrarPremium() {

    const ventana =
        document.getElementById("mensaje");

    const texto =
        document.getElementById("mensaje-texto");

    const titulo =
        document.getElementById("mensaje-titulo");


    if (!ventana || !texto) return;


    if (titulo) {
        titulo.textContent =
            "LinguaGo Premium ⭐";
    }


    texto.textContent =
        "LinguaGo Premium permitirá acceder a cursos, materiales, retos y funciones exclusivas.";


    ventana.classList.add("activo");

}


/* =====================================================
   BANCO DE PREGUNTAS
===================================================== */

const preguntasPalabras = [

    {
        pregunta: "¿Cómo se dice 'casa' en inglés?",
        opciones: [
            "House",
            "School",
            "Table",
            "Window"
        ],
        correcta: "House"
    },

    {
        pregunta: "¿Cómo se dice 'perro' en inglés?",
        opciones: [
            "Cat",
            "Dog",
            "Bird",
            "Fish"
        ],
        correcta: "Dog"
    },

    {
        pregunta: "¿Cómo se dice 'agua' en inglés?",
        opciones: [
            "Fire",
            "Food",
            "Water",
            "Milk"
        ],
        correcta: "Water"
    },

    {
        pregunta: "¿Cómo se dice 'libro' en inglés?",
        opciones: [
            "Book",
            "Pen",
            "Door",
            "Chair"
        ],
        correcta: "Book"
    },

    {
        pregunta: "¿Cómo se dice 'sol' en inglés?",
        opciones: [
            "Moon",
            "Star",
            "Sun",
            "Cloud"
        ],
        correcta: "Sun"
    }

];


/* =====================================================
   JUEGO DE PALABRAS
===================================================== */

function iniciarJuego(tipo) {

    const modal =
        document.getElementById("juegoModal");

    const contenido =
        document.getElementById("juegoContenido");


    if (!modal || !contenido) return;


    juegoActual = tipo;

    puntuacion = 0;

    preguntaActual = 0;

    tiempo = 10;


    modal.classList.add("activo");


    if (tipo === "palabras") {

        iniciarJuegoPalabras();

    }

    else if (tipo === "rapido") {

        iniciarJuegoRapido();

    }

    else if (tipo === "memoria") {

        iniciarJuegoMemoria();

    }

}


/* =====================================================
   JUEGO PALABRA CORRECTA
===================================================== */

function iniciarJuegoPalabras() {

    mostrarPregunta();

}


function mostrarPregunta() {

    const contenido =
        document.getElementById("juegoContenido");

    if (!contenido) return;


    if (
        preguntaActual >=
        preguntasPalabras.length
    ) {

        mostrarResultado();

        return;

    }


    const pregunta =
        preguntasPalabras[preguntaActual];


    contenido.innerHTML = `

        <h2 class="juego-titulo">
            🔤 Palabra correcta
        </h2>

        <div class="juego-puntos">
            ⭐ Puntos: ${puntuacion}
        </div>

        <div class="pregunta">
            ${pregunta.pregunta}
        </div>

        <div class="opciones">

            ${pregunta.opciones.map(
                (opcion) => `
                    <button
                        class="opcion"
                        onclick="responder('${opcion.replace(/'/g, "\\'")}')">
                        ${opcion}
                    </button>
                `
            ).join("")}

        </div>

    `;

}


function responder(opcion) {

    const pregunta =
        preguntasPalabras[preguntaActual];


    const botones =
        document.querySelectorAll(".opcion");


    botones.forEach((boton) => {

        boton.disabled = true;


        if (
            boton.textContent.trim() ===
            pregunta.correcta
        ) {

            boton.classList.add("correcta");

        }

    });


    if (opcion === pregunta.correcta) {

        puntuacion += 10;

    } else {

        botones.forEach((boton) => {

            if (
                boton.textContent.trim() ===
                opcion
            ) {

                boton.classList.add(
                    "incorrecta"
                );

            }

        });

    }


    setTimeout(() => {

        preguntaActual++;

        mostrarPregunta();

    }, 700);

}


/* =====================================================
   RESULTADO
===================================================== */

function mostrarResultado() {

    const contenido =
        document.getElementById("juegoContenido");

    if (!contenido) return;


    contenido.innerHTML = `

        <div class="resultado">

            🏆 ¡Juego terminado!

        </div>

        <p>
            Conseguíste
            <strong>${puntuacion}</strong>
            puntos.
        </p>

        <br>

        <button
            class="btn principal"
            onclick="iniciarJuego('palabras')">
            🔄 Jugar otra vez
        </button>

    `;

}


/* =====================================================
   RETO RÁPIDO
===================================================== */

function iniciarJuegoRapido() {

    preguntaActual = 0;

    puntuacion = 0;

    tiempo = 10;

    mostrarPreguntaRapida();

}


function mostrarPreguntaRapida() {

    const contenido =
        document.getElementById("juegoContenido");

    if (!contenido) return;


    if (
        preguntaActual >=
        preguntasPalabras.length
    ) {

        mostrarResultado();

        return;

    }


    const pregunta =
        preguntasPalabras[preguntaActual];


    tiempo = 10;


    contenido.innerHTML = `

        <h2 class="juego-titulo">
            ⚡ Reto rápido
        </h2>

        <div class="juego-puntos">
            ⭐ ${puntuacion} puntos |
            ⏱️ <span id="tiempo">${tiempo}</span>s
        </div>

        <div class="pregunta">
            ${pregunta.pregunta}
        </div>

        <div class="opciones">

            ${pregunta.opciones.map(
                (opcion) => `
                    <button
                        class="opcion"
                        onclick="responderRapido('${opcion.replace(/'/g, "\\'")}')">
                        ${opcion}
                    </button>
                `
            ).join("")}

        </div>

    `;


    clearInterval(temporizador);


    temporizador = setInterval(() => {

        tiempo--;


        const contador =
            document.getElementById("tiempo");


        if (contador) {
            contador.textContent = tiempo;
        }


        if (tiempo <= 0) {

            clearInterval(temporizador);

            preguntaActual++;

            mostrarPreguntaRapida();

        }

    }, 1000);

}


function responderRapido(opcion) {

    clearInterval(temporizador);


    const pregunta =
        preguntasPalabras[preguntaActual];


    if (opcion === pregunta.correcta) {

        puntuacion += 10;

    }


    preguntaActual++;


    setTimeout(() => {

        mostrarPreguntaRapida();

    }, 300);

}


/* =====================================================
   JUEGO DE MEMORIA
===================================================== */

function iniciarJuegoMemoria() {

    const contenido =
        document.getElementById("juegoContenido");

    if (!contenido) return;


    const parejas = [

        ["🐶","Dog"],
        ["🐱","Cat"],
        ["☀️","Sun"],
        ["📚","Book"],
        ["🍎","Apple"],
        ["🏠","House"]

    ];


    let cartas = [];


    parejas.forEach((pareja, indice) => {

        cartas.push({
            id: indice,
            valor: pareja[0],
            palabra: pareja[1]
        });

        cartas.push({
            id: indice,
            valor: pareja[1],
            palabra: pareja[1]
        });

    });


    cartas.sort(() =>
        Math.random() - .5
    );


    contenido.innerHTML = `

        <h2 class="juego-titulo">
            🧠 Memoria de palabras
        </h2>

        <p>
            Encuentra las parejas.
        </p>

        <div
            id="memoriaTablero"
            class="memoria-tablero">
        </div>

        <p id="memoriaMensaje"></p>

    `;


    const tablero =
        document.getElementById(
            "memoriaTablero"
        );


    let seleccionadas = [];

    let bloqueado = false;

    let parejasEncontradas = 0;


    cartas.forEach((carta, indice) => {

        const boton =
            document.createElement("button");


        boton.className =
            "carta-memoria";


        boton.textContent = "❓";


        boton.dataset.indice = indice;


        boton.addEventListener(
            "click",
            () => {

                if (
                    bloqueado ||
                    seleccionadas.includes(indice) ||
                    boton.classList.contains("encontrada")
                ) {

                    return;

                }


                boton.textContent =
                    carta.valor;

                boton.classList.add(
                    "seleccionada"
                );


                seleccionadas.push(indice);


                if (
                    seleccionadas.length === 2
                ) {

                    bloqueado = true;


                    const [primera, segunda] =
                        seleccionadas;


                    const carta1 =
                        cartas[primera];

                    const carta2 =
                        cartas[segunda];


                    if (
                        carta1.id ===
                        carta2.id
                    ) {

                        tablero
                            .children[primera]
                            .classList.add(
                                "encontrada"
                            );

                        tablero
                            .children[segunda]
                            .classList.add(
                                "encontrada"
                            );


                        parejasEncontradas++;


                        seleccionadas = [];

                        bloqueado = false;


                        if (
                            parejasEncontradas ===
                            parejas.length
                        ) {

                            document
                                .getElementById(
                                    "memoriaMensaje"
                                )
                                .textContent =
                                "🏆 ¡Excelente! Encontraste todas las parejas.";

                        }

                    } else {

                        setTimeout(() => {

                            tablero
                                .children[primera]
                                .textContent =
                                "❓";

                            tablero
                                .children[segunda]
                                .textContent =
                                "❓";


                            tablero
                                .children[primera]
                                .classList.remove(
                                    "seleccionada"
                                );

                            tablero
                                .children[segunda]
                                .classList.remove(
                                    "seleccionada"
                                );


                            seleccionadas = [];

                            bloqueado = false;

                        }, 700);

                    }

                }

            }
        );


        tablero.appendChild(boton);

    });

}


/* =====================================================
   CERRAR JUEGO
===================================================== */

function cerrarJuego() {

    clearInterval(temporizador);

    const modal =
        document.getElementById("juegoModal");

    if (!modal) return;

    modal.classList.remove("activo");

}


/* =====================================================
   TECLA ESC
===================================================== */

document.addEventListener(
    "keydown",
    (evento) => {

        if (evento.key === "Escape") {

            cerrarMensaje();

            cerrarJuego();

            cerrarMenu();

        }

    }
);


/* =====================================================
   AJUSTAR MENÚ AL CAMBIAR TAMAÑO
===================================================== */

window.addEventListener(
    "resize",
    () => {

        const nav =
            document.getElementById(
                "menuPrincipal"
            );


        if (!nav) return;


        if (window.innerWidth > 1000) {

            nav.style.display = "flex";

            nav.style.position = "";

            nav.style.top = "";

            nav.style.right = "";

            nav.style.padding = "";

            nav.style.gap = "";

            nav.style.background = "";

            nav.style.borderRadius = "";

            nav.style.boxShadow = "";

            nav.style.flexDirection = "";

        } else if (
            !nav.classList.contains(
                "menu-abierto"
            )
        ) {

            nav.style.display = "none";

        }

    }
);
