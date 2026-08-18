/* =====================================================
   LINGUAGO
   JAVASCRIPT DEFINITIVO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("LinguaGo iniciado correctamente 🚀");


    /* =================================================
       MENÚ RESPONSIVE
    ================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");

    if (menuBtn && menu) {

        menuBtn.addEventListener("click", () => {

            menu.classList.toggle("active");

            menuBtn.textContent =
                menu.classList.contains("active")
                    ? "✕"
                    : "☰";

        });


        const enlacesMenu = menu.querySelectorAll("a");

        enlacesMenu.forEach((enlace) => {

            enlace.addEventListener("click", () => {

                menu.classList.remove("active");

                menuBtn.textContent = "☰";

            });

        });

    }


    /* =================================================
       NAVEGACIÓN SUAVE
    ================================================= */

    const enlaces = document.querySelectorAll(
        'a[href^="#"]'
    );

    enlaces.forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {

            const destino = enlace.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const elemento = document.querySelector(destino);

            if (!elemento) {
                return;
            }

            evento.preventDefault();

            elemento.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =================================================
       ELEMENTOS DEL MENSAJE
    ================================================= */

    const messageBox =
        document.getElementById("messageBox");

    const messageTitle =
        document.getElementById("messageTitle");

    const messageText =
        document.getElementById("messageText");

    const messageIcon =
        document.getElementById("messageIcon");

    const messageAction =
        document.getElementById("messageAction");

    const closeMessage =
        document.getElementById("closeMessage");


    function mostrarMensaje(
        titulo,
        texto,
        icono = "🦊"
    ) {

        if (!messageBox) {
            return;
        }

        messageTitle.textContent = titulo;
        messageText.textContent = texto;
        messageIcon.textContent = icono;

        messageBox.classList.add("active");

        messageBox.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function cerrarMensaje() {

        if (!messageBox) {
            return;
        }

        messageBox.classList.remove("active");

        messageBox.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =================================================
       BOTÓN CERRAR
    ================================================= */

    if (closeMessage) {

        closeMessage.addEventListener(
            "click",
            cerrarMensaje
        );

    }


    /* =================================================
       CERRAR AL HACER CLIC AFUERA
    ================================================= */

    if (messageBox) {

        messageBox.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target === messageBox
                ) {

                    cerrarMensaje();

                }

            }
        );

    }


    /* =================================================
       CERRAR CON ESC
    ================================================= */

    document.addEventListener(
        "keydown",
        (evento) => {

            if (evento.key === "Escape") {

                cerrarMensaje();

            }

        }
    );


    /* =================================================
       CURSOS
    ================================================= */

    const botonesCurso =
        document.querySelectorAll(
            ".card-btn"
        );

    botonesCurso.forEach((boton) => {

        boton.addEventListener(
            "click",
            () => {

                const curso =
                    boton.dataset.course;

                if (curso === "Español") {

                    mostrarMensaje(
                        "¡Vamos con Español! 🇪🇸",
                        "Lingo está listo para acompañarte en tu aprendizaje.",
                        "📚"
                    );

                } else {

                    mostrarMensaje(
                        "Let's learn English! 🇬🇧",
                        "Lingo está listo para comenzar esta aventura contigo.",
                        "🦊"
                    );

                }

            }
        );

    });


    /* =================================================
       JUEGOS
    ================================================= */

    const botonesJuego =
        document.querySelectorAll(
            ".game-btn"
        );

    botonesJuego.forEach((boton) => {

        boton.addEventListener(
            "click",
            () => {

                const juego =
                    boton.dataset.game;

                mostrarMensaje(
                    "🎮 " + juego,
                    "¡Lingo está preparando este reto para ti!",
                    "🦊"
                );

            }
        );

    });


    /* =================================================
       BOTÓN DEL MENSAJE
    ================================================= */

    if (messageAction) {

        messageAction.addEventListener(
            "click",
            cerrarMensaje
        );

    }


    /* =================================================
       ANIMACIÓN DE LINGO CON EL MOUSE
    ================================================= */

    const lingo =
        document.getElementById("lingo");

    if (lingo) {

        document.addEventListener(
            "mousemove",
            (evento) => {

                const x =
                    (evento.clientX /
                        window.innerWidth -
                        0.5) * 5;

                const y =
                    (evento.clientY /
                        window.innerHeight -
                        0.5) * 3;

                lingo.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }


    /* =================================================
       SALUDO INICIAL
    ================================================= */

    const lingoArea =
        document.querySelector(".lingo-area");

    if (lingoArea) {

        setTimeout(() => {

            mostrarMensaje(
                "¡Hola! Soy Lingo 🦊",
                "Bienvenido a LinguaGo. Vamos a aprender Español e Inglés juntos.",
                "👋"
            );

        }, 1200);

    }

});
