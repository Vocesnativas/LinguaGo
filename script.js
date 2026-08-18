/* =====================================================
   LINGUAGO
   JavaScript principal
===================================================== */

"use strict";


/* =====================================================
   VARIABLES GENERALES
===================================================== */

let juegoActual = null;
let puntuacion = 0;
let preguntaActual = 0;
let tiempoRestante = 0;
let temporizador = null;

const preguntasRapidas = [
    {
        pregunta: "¿Cómo se dice CASA en inglés?",
        opciones: ["House", "School", "Book", "Water"],
        correcta: "House"
    },
    {
        pregunta: "¿Cómo se dice DOG en español?",
        opciones: ["Gato", "Perro", "Pájaro", "Caballo"],
        correcta: "Perro"
    },
    {
        pregunta: "¿Cómo se dice LIBRO en inglés?",
        opciones: ["Table", "Chair", "Book", "Door"],
        correcta: "Book"
    },
    {
        pregunta: "¿Cómo se dice WATER en español?",
        opciones: ["Fuego", "Agua", "Tierra", "Aire"],
        correcta: "Agua"
    },
    {
        pregunta: "¿Cómo se dice ESCUELA en inglés?",
        opciones: ["School", "House", "Garden", "Street"],
        correcta: "School"
    },
    {
        pregunta: "¿Cómo se dice FRIEND en español?",
        opciones: ["Familia", "Amigo", "Maestro", "Vecino"],
        correcta: "Amigo"
    },
    {
        pregunta: "¿Cómo se dice COMIDA en inglés?",
        opciones: ["Food", "Foot", "Book", "Fish"],
        correcta: "Food"
    },
    {
        pregunta: "¿Cómo se dice SUN en español?",
        opciones: ["Luna", "Sol", "Estrella", "Nube"],
        correcta: "Sol"
    }
];


const palabras = [
    {
        palabra: "APPLE",
        opciones: ["Manzana", "Naranja", "Banano", "Uva"],
        correcta: "Manzana"
    },
    {
        palabra: "BOOK",
        opciones: ["Libro", "Mesa", "Lápiz", "Puerta"],
        correcta: "Libro"
    },
    {
        palabra: "WATER",
        opciones: ["Agua", "Leche", "Jugo", "Café"],
        correcta: "Agua"
    },
    {
        palabra: "HOUSE",
        opciones: ["Escuela", "Casa", "Calle", "Parque"],
        correcta: "Casa"
    },
    {
        palabra: "SUN",
        opciones: ["Sol", "Luna", "Mar", "Cielo"],
        correcta: "Sol"
    },
    {
        palabra: "FRIEND",
        opciones: ["Amigo", "Padre", "Hermano", "Profesor"],
        correcta: "Amigo"
    }
];


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("LinguaGo iniciado correctamente 🚀");

    configurarNavegacion();

    configurarAnimaciones();

    configurarCierreModal();

    configurarTeclaEscape();

});


/* =====================================================
   NAVEGACIÓN
===================================================== */

function configurarNavegacion() {

    const enlaces = document.querySelectorAll(
        '.navbar nav a[href^="#"]'
    );

    enlaces.forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {

            const destino = enlace.getAttribute("href");

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

}


/* =====================================================
   MENÚ RESPONSIVE
===================================================== */

function abrirMenu() {

    const nav =
        document.querySelector(".navbar nav");

    const boton =
        document.getElementById("btn-menu");

    if (!nav) {
        return;
    }

    nav.classList.toggle("menu-abierto");

    if (boton) {

        const abierto =
            nav.classList.contains("menu-abierto");

        boton.setAttribute(
            "aria-expanded",
            abierto ? "true" : "false"
        );

    }

}


function cerrarMenu() {

    const nav =
        document.querySelector(".navbar nav");

    const boton =
        document.getElementById("btn-menu");

    if (!nav) {
        return;
    }

    nav.classList.remove("menu-abierto");

    if (boton) {

        boton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* =====================================================
   ANIMACIONES
===================================================== */

function configurarAnimaciones() {

    const elementos =
        document.querySelectorAll(
            ".tarjeta, .curso, .juego"
        );

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const observador =
        new IntersectionObserver(

            (entradas) => {

                entradas.forEach((entrada) => {

                    if (
                        entrada.isIntersecting &&
                        !entrada.target.classList.contains(
                            "visible"
                        )
                    ) {

                        entrada.target.classList.add(
                            "visible"
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

}


/* =====================================================
   CORRECCIÓN VISUAL DE ANIMACIONES
===================================================== */

document.addEventListener(
    "animationstart",
    () => {}
);


/* =====================================================
   MENSAJES
===================================================== */

function mostrarMensaje(curso) {

    const ventana =
        document.getElementById("mensaje");

    const titulo =
        document.getElementById("mensaje-titulo");

    const texto =
        document.getElementById("mensaje-texto");

    const boton =
        document.getElementById("mensaje-boton");

    if (!ventana || !titulo || !texto) {
        return;
    }

    titulo.textContent =
        "📚 " + curso;

    texto.textContent =
        "Este curso está preparado para formar parte de la experiencia LinguaGo. Pronto podrás avanzar por sus lecciones y actividades.";

    if (boton) {
        boton.textContent = "Entendido";
        boton.onclick = cerrarMensaje;
    }

    ventana.classList.add("activo");

}


function cerrarMensaje() {

    detenerTemporizador();

    const ventana =
        document.getElementById("mensaje");

    if (!ventana) {
        return;
    }

    ventana.classList.remove("activo");

    juegoActual = null;

}


/* =====================================================
   INICIAR JUEGO
===================================================== */

function iniciarJuego(tipo) {

    puntuacion = 0;
    preguntaActual = 0;

    juegoActual = tipo;

    detenerTemporizador();

    const ventana =
        document.getElementById("mensaje");

    const titulo =
        document.getElementById("mensaje-titulo");

    const contenido =
        document.getElementById("juego-contenido");

    if (!ventana || !titulo || !contenido) {
        return;
    }

    ventana.classList.add("activo");

    if (tipo === "memoria") {

        iniciarMemoria();

    } else if (tipo === "rapido") {

        iniciarRetoRapido();

    } else if (tipo === "palabras") {

        iniciarPalabraCorrecta();

    }

}


/* =====================================================
   JUEGO 1 — MEMORIA
===================================================== */

function iniciarMemoria() {

    const titulo =
        document.getElementById("mensaje-titulo");

    const contenido =
        document.getElementById("juego-contenido");

    titulo.textContent =
        "🧠 Memoria de palabras";

    const parejas = [
        "🐶", "DOG",
        "🐱", "CAT",
        "🏠", "HOUSE",
        "📖", "BOOK"
    ];

    const cartas =
        [...parejas, ...parejas]
            .sort(() => Math.random() - 0.5);

    let primeraCarta = null;
    let segundaCarta = null;
    let bloqueado = false;
    let parejasEncontradas = 0;

    contenido.innerHTML = `

        <h3>🧠 Memoria de palabras</h3>

        <div class="juego-puntuacion">
            <span>Puntos: <b id="memoria-puntos">0</b></span>
            <span>Parejas: <b id="memoria-parejas">0</b>/4</span>
        </div>

        <div class="memoria-grid" id="memoria-grid"></div>

        <button
            class="btn pequeño"
            type="button"
            onclick="cerrarMensaje()">
            Salir
        </button>
    `;

    const tablero =
        document.getElementById("memoria-grid");

    cartas.forEach((valor, indice) => {

        const carta =
            document.createElement("button");

        carta.className =
            "carta-memoria";

        carta.type = "button";

        carta.textContent = "?";

        carta.dataset.valor = valor;

        carta.dataset.indice = indice;

        carta.addEventListener(
            "click",
            () => {

                if (
                    bloqueado ||
                    carta.classList.contains("revelada") ||
                    carta.classList.contains("completada")
                ) {
                    return;
                }

                carta.classList.add("revelada");

                carta.textContent = valor;

                if (!primeraCarta) {

                    primeraCarta = carta;

                    return;
                }

                segundaCarta = carta;

                bloqueado = true;

                if (
                    primeraCarta.dataset.valor ===
                    segundaCarta.dataset.valor
                ) {

                    primeraCarta.classList.add(
                        "completada"
                    );

                    segundaCarta.classList.add(
                        "completada"
                    );

                    parejasEncontradas++;

                    puntuacion += 10;

                    actualizarMemoriaPuntos();

                    primeraCarta = null;
                    segundaCarta = null;
                    bloqueado = false;

                    if (parejasEncontradas === 4) {

                        setTimeout(() => {

                            mostrarResultado(
                                "🎉 ¡Excelente memoria!",
                                `Conseguiste ${puntuacion} puntos.`
                            );

                        }, 500);

                    }

                } else {

                    setTimeout(() => {

                        primeraCarta.classList.remove(
                            "revelada"
                        );

                        segundaCarta.classList.remove(
                            "revelada"
                        );

                        primeraCarta.textContent = "?";
                        segundaCarta.textContent = "?";

                        primeraCarta = null;
                        segundaCarta = null;

                        bloqueado = false;

                    }, 800);

                }

            }
        );

        tablero.appendChild(carta);

    });

}


function actualizarMemoriaPuntos() {

    const puntos =
        document.getElementById("memoria-puntos");

    const parejas =
        document.getElementById("memoria-parejas");

    if (puntos) {
        puntos.textContent = puntuacion;
    }

    if (parejas) {
        const completadas =
            document.querySelectorAll(
                ".carta-memoria.completada"
            ).length / 2;

        parejas.textContent =
            Math.floor(completadas);
    }

}


/* =====================================================
   JUEGO 2 — RETO RÁPIDO
===================================================== */

function iniciarRetoRapido() {

    const titulo =
        document.getElementById("mensaje-titulo");

    const contenido =
        document.getElementById("juego-contenido");

    titulo.textContent =
        "⚡ Reto rápido";

    puntuacion = 0;
    preguntaActual = 0;
    tiempoRestante = 30;

    contenido.innerHTML = `

        <div class="juego-panel">

            <h3>⚡ Reto rápido</h3>

            <div class="juego-puntuacion">

                <span>
                    ⭐ Puntos:
                    <b id="rapido-puntos">0</b>
                </span>

                <span>
                    ⏱️ Tiempo:
                    <b id="rapido-tiempo">30</b>
                </span>

            </div>

            <div id="rapido-pregunta"></div>

        </div>
    `;

    mostrarPreguntaRapida();

    temporizador =
        setInterval(() => {

            tiempoRestante--;

            const reloj =
                document.getElementById(
                    "rapido-tiempo"
                );

            if (reloj) {
                reloj.textContent =
                    tiempoRestante;
            }

            if (tiempoRestante <= 0) {

                detenerTemporizador();

                mostrarResultado(
                    "⏰ ¡Tiempo terminado!",
                    `Tu puntuación final fue de ${puntuacion} puntos.`
                );

            }

        }, 1000);

}


function mostrarPreguntaRapida() {

    if (preguntaActual >= preguntasRapidas.length) {

        detenerTemporizador();

        mostrarResultado(
            "🏆 ¡Completaste el reto!",
            `Conseguiste ${puntuacion} puntos.`
        );

        return;
    }

    const pregunta =
        preguntasRapidas[preguntaActual];

    const contenedor =
        document.getElementById(
            "rapido-pregunta"
        );

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = `

        <p class="juego-palabra">
            ${pregunta.pregunta}
        </p>

        <div class="juego-opciones">

            ${pregunta.opciones
                .map(
                    (opcion) => `
                        <button
                            class="opcion-juego"
                            type="button"
                            onclick="responderRapido('${escaparTexto(opcion)}')">
                            ${opcion}
                        </button>
                    `
                )
                .join("")}

        </div>
    `;

}


function responderRapido(respuesta) {

    if (
        preguntaActual >=
        preguntasRapidas.length
    ) {
        return;
    }

    const pregunta =
        preguntasRapidas[preguntaActual];

    if (respuesta === pregunta.correcta) {

        puntuacion += 10;

    }

    const puntos =
        document.getElementById(
            "rapido-puntos"
        );

    if (puntos) {
        puntos.textContent = puntuacion;
    }

    preguntaActual++;

    mostrarPreguntaRapida();

}


/* =====================================================
   JUEGO 3 — PALABRA CORRECTA
===================================================== */

function iniciarPalabraCorrecta() {

    const titulo =
        document.getElementById("mensaje-titulo");

    const contenido =
        document.getElementById("juego-contenido");

    titulo.textContent =
        "🔤 Palabra correcta";

    puntuacion = 0;
    preguntaActual = 0;

    contenido.innerHTML = `

        <div class="juego-panel">

            <h3>🔤 Palabra correcta</h3>

            <div class="juego-puntuacion">

                <span>
                    ⭐ Puntos:
                    <b id="palabras-puntos">0</b>
                </span>

                <span>
                    Pregunta:
                    <b id="palabras-numero">1</b>/${palabras.length}
                </span>

            </div>

            <div id="palabras-pregunta"></div>

        </div>
    `;

    mostrarPalabra();

}


function mostrarPalabra() {

    if (preguntaActual >= palabras.length) {

        mostrarResultado(
            "🎉 ¡Reto completado!",
            `Terminaste con ${puntuacion} puntos.`
        );

        return;
    }

    const pregunta =
        palabras[preguntaActual];

    const contenedor =
        document.getElementById(
            "palabras-pregunta"
        );

    if (!contenedor) {
        return;
    }

    const numero =
        document.getElementById(
            "palabras-numero"
        );

    if (numero) {
        numero.textContent =
            preguntaActual + 1;
    }

    contenedor.innerHTML = `

        <div class="juego-palabra">
            ${pregunta.palabra}
        </div>

        <p>
            ¿Cuál es su significado?
        </p>

        <div class="juego-opciones">

            ${pregunta.opciones
                .map(
                    (opcion) => `
                        <button
                            class="opcion-juego"
                            type="button"
                            onclick="responderPalabra('${escaparTexto(opcion)}')">
                            ${opcion}
                        </button>
                    `
                )
                .join("")}

        </div>
    `;

}


function responderPalabra(respuesta) {

    if (preguntaActual >= palabras.length) {
        return;
    }

    const pregunta =
        palabras[preguntaActual];

    if (respuesta === pregunta.correcta) {

        puntuacion += 10;

    }

    const puntos =
        document.getElementById(
            "palabras-puntos"
        );

    if (puntos) {
        puntos.textContent = puntuacion;
    }

    preguntaActual++;

    setTimeout(() => {
        mostrarPalabra();
    }, 250);

}


/* =====================================================
   RESULTADO
===================================================== */

function mostrarResultado(titulo, texto) {

    detenerTemporizador();

    const tituloElemento =
        document.getElementById(
            "mensaje-titulo"
        );

    const contenido =
        document.getElementById(
            "juego-contenido"
        );

    if (!tituloElemento || !contenido) {
        return;
    }

    tituloElemento.textContent =
        titulo;

    contenido.innerHTML = `

        <div class="resultado-juego">

            <div style="font-size:60px;">
                🏆
            </div>

            <h3>
                ${titulo}
            </h3>

            <p>
                ${texto}
            </p>

            <button
                class="btn pequeño"
                type="button"
                onclick="reiniciarJuego()">
                🔄 Jugar otra vez
            </button>

            <button
                class="btn pequeño"
                type="button"
                onclick="cerrarMensaje()">
                ✓ Terminar
            </button>

        </div>
    `;

}


function reiniciarJuego() {

    const tipo =
        juegoActual;

    if (!tipo) {
        cerrarMensaje();
        return;
    }

    iniciarJuego(tipo);

}


/* =====================================================
   CLASES
===================================================== */

function solicitarClase() {

    const ventana =
        document.getElementById("mensaje");

    const titulo =
        document.getElementById("mensaje-titulo");

    const contenido =
        document.getElementById("juego-contenido");

    if (!ventana || !titulo || !contenido) {
        return;
    }

    titulo.textContent =
        "👨‍🏫 Clases virtuales";

    contenido.innerHTML = `

        <h3>
            Aprende con LinguaGo
        </h3>

        <p>
            Próximamente podrás solicitar
            información sobre clases virtuales
            de español e inglés.
        </p>

        <button
            class="btn pequeño"
            type="button"
            onclick="cerrarMensaje()">
            Entendido
        </button>
    `;

    ventana.classList.add("activo");

}


/* =====================================================
   PREMIUM — RESERVADO PARA FUTURA FASE
===================================================== */

function mostrarPremium() {

    const ventana =
        document.getElementById("mensaje");

    const titulo =
        document.getElementById("mensaje-titulo");

    const contenido =
        document.getElementById("juego-contenido");

    if (!ventana || !titulo || !contenido) {
        return;
    }

    titulo.textContent =
        "⭐ LinguaGo Premium";

    contenido.innerHTML = `

        <h3>
            Próximamente
        </h3>

        <p>
            Aquí podremos incorporar cursos,
            materiales y funciones especiales.
        </p>

        <button
            class="btn pequeño"
            type="button"
            onclick="cerrarMensaje()">
            Entendido
        </button>
    `;

    ventana.classList.add("activo");

}


/* =====================================================
   CERRAR MODAL
===================================================== */

function configurarCierreModal() {

    const ventana =
        document.getElementById("mensaje");

    if (!ventana) {
        return;
    }

    ventana.addEventListener(
        "click",
        (evento) => {

            if (
                evento.target === ventana &&
                !juegoActual
            ) {

                cerrarMensaje();

            }

        }
    );

}


function configurarTeclaEscape() {

    document.addEventListener(
        "keydown",
        (evento) => {

            if (evento.key === "Escape") {

                cerrarMensaje();

            }

        }
    );

}


/* =====================================================
   TEMPORIZADOR
===================================================== */

function detenerTemporizador() {

    if (temporizador) {

        clearInterval(
            temporizador
        );

        temporizador = null;

    }

}


/* =====================================================
   SEGURIDAD PARA TEXTO DE BOTONES
===================================================== */

function escaparTexto(texto) {

    return texto
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"');

}


/* =====================================================
   ANIMACIÓN DE ELEMENTOS VISIBLES
===================================================== */

const estiloAnimacion =
    document.createElement("style");

estiloAnimacion.textContent = `

    .tarjeta.visible,
    .curso.visible,
    .juego.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

`;

document.head.appendChild(
    estiloAnimacion

