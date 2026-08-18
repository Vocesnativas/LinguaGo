/* =====================================================
   LINGUAGO
   JavaScript principal
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("LinguaGo iniciado correctamente 🚀");

});


/* =====================================================
   MENÚ
===================================================== */

function abrirMenu() {

    const nav = document.querySelector(".navbar nav");

    if (!nav) return;

    if (nav.style.display === "flex") {

        nav.style.display = "";

    } else {

        nav.style.display = "flex";

        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "75px";
        nav.style.right = "5%";
        nav.style.padding = "20px";
        nav.style.background = "white";
        nav.style.borderRadius = "15px";
        nav.style.boxShadow = "0 15px 35px rgba(0,0,0,.12)";
    }
}


/* =====================================================
   MENSAJES
===================================================== */

function mostrarMensaje(curso) {

    const ventana = document.getElementById("mensaje");
    const texto = document.getElementById("mensaje-texto");

    if (!ventana || !texto) return;

    texto.textContent =
        `Has seleccionado "${curso}". Próximamente podrás comenzar este curso.`;

    ventana.classList.add("activo");
}


function cerrarMensaje() {

    const ventana = document.getElementById("mensaje");

    if (!ventana) return;

    ventana.classList.remove("activo");
}


/* =====================================================
   JUEGOS
===================================================== */

function juegoProximamente() {

    const ventana = document.getElementById("mensaje");
    const texto = document.getElementById("mensaje-texto");

    if (!ventana || !texto) return;

    texto.textContent =
        "🎮 Los juegos de LinguaGo están en desarrollo. Aquí podrás practicar idiomas mientras juegas.";

    ventana.classList.add("activo");
}


/* =====================================================
   CLASES VIRTUALES
===================================================== */

function solicitarClase() {

    const ventana = document.getElementById("mensaje");
    const texto = document.getElementById("mensaje-texto");

    if (!ventana || !texto) return;

    texto.textContent =
        "👨‍🏫 Muy pronto podrás solicitar una clase virtual de español o inglés.";

    ventana.classList.add("activo");
}


/* =====================================================
   PREMIUM
===================================================== */

function mostrarPremium() {

    const ventana = document.getElementById("mensaje");
    const texto = document.getElementById("mensaje-texto");

    if (!ventana || !texto) return;

    texto.textContent =
        "⭐ LinguaGo Premium permitirá acceder a cursos, materiales y funciones exclusivas.";

    ventana.classList.add("activo");
}


/* =====================================================
   CERRAR VENTANA AL HACER CLIC FUERA
===================================================== */

const ventanaMensaje = document.getElementById("mensaje");

if (ventanaMensaje) {

    ventanaMensaje.addEventListener("click", (evento) => {

        if (evento.target === ventanaMensaje) {

            cerrarMensaje();

        }

    });

}


/* =====================================================
   CERRAR CON ESC
===================================================== */

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {

        cerrarMensaje();

    }

});


/* =====================================================
   ANIMACIÓN SUAVE AL ENTRAR EN PANTALLA
===================================================== */

const elementos = document.querySelectorAll(
    ".idioma-card, .curso, .juego, .premium-box"
);

const observador = new IntersectionObserver(

    (entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);


elementos.forEach((elemento) => {

    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(25px)";
    elemento.style.transition = "opacity .6s ease, transform .6s ease";

    observador.observe(elemento);


