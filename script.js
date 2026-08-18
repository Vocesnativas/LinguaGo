/* =====================================================
   LINGUAGO
   JAVASCRIPT + JUEGO DE MEMORIA
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("LinguaGo iniciado correctamente 🚀");


    /* =================================================
       MENÚ
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

        menu.querySelectorAll("a").forEach((enlace) => {

            enlace.addEventListener("click", () => {

                menu.classList.remove("active");
                menuBtn.textContent = "☰";

            });

        });

    }


    /* =================================================
       NAVEGACIÓN SUAVE
    ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {

            const destino = enlace.getAttribute("href");

            if (!destino || destino === "#") return;

            const elemento = document.querySelector(destino);

            if (!elemento) return;

            evento.preventDefault();

            elemento.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* =================================================
       MENSAJES
    ================================================= */

    const messageBox = document.getElementById("messageBox");
    const messageTitle = document.getElementById("messageTitle");
    const messageText = document.getElementById("messageText");
    const messageIcon = document.getElementById("messageIcon");
    const messageAction = document.getElementById("messageAction");
    const closeMessage = document.getElementById("closeMessage");


    function mostrarMensaje(titulo, texto, icono = "🦊") {

        messageTitle.textContent = titulo;
        messageText.textContent = texto;
        messageIcon.textContent = icono;

        messageBox.classList.add("active");

    }


    function cerrarMensaje() {

        messageBox.classList.remove("active");

    }


    closeMessage.addEventListener("click", cerrarMensaje);
    messageAction.addEventListener("click", cerrarMensaje);


    messageBox.addEventListener("click", (evento) => {

        if (evento.target === messageBox) {
            cerrarMensaje();
        }

    });


    document.addEventListener("keydown", (evento) => {

        if (evento.key === "Escape") {
            cerrarMensaje();
        }

    });


    /* =================================================
       CURSOS
    ================================================= */

    document.querySelectorAll(".card-btn").forEach((boton) => {

        boton.addEventListener("click", () => {

            const curso = boton.dataset.course;

            if (curso === "Español") {

                mostrarMensaje(
                    "¡Vamos con Español! 🇪🇸",
                    "Lingo está listo para acompañarte.",
                    "📚"
                );

            } else {

                mostrarMensaje(
                    "Let's learn English! 🇬🇧",
                    "Lingo está listo para comenzar.",
                    "🦊"
                );

            }

        });

    });


    /* =================================================
       JUEGOS FUTUROS
    ================================================= */

    document.querySelectorAll(".game-btn").forEach((boton) => {

        boton.addEventListener("click", () => {

            if (boton.id === "memoryGameBtn") {
                iniciarMemoria();
                return;
            }

            mostrarMensaje(
                "🚀 Próximamente",
                "Lingo está preparando este juego.",
                "🦊"
            );

        });

    });


    /* =================================================
       JUEGO DE MEMORIA
    ================================================= */

    const memorySection =
        document.getElementById("memoryGame");

    const memoryBoard =
        document.getElementById("memoryBoard");

    const scoreElement =
        document.getElementById("memoryScore");

    const attemptsElement =
        document.getElementById("memoryAttempts");

    const pairsElement =
        document.getElementById("memoryPairs");

    const restartButton =
        document.getElementById("restartMemory");

    const closeButton =
        document.getElementById("closeMemory");


    const words = [

        {
            id: 1,
            spanish: "Casa",
            english: "House"
        },

        {
            id: 2,
            spanish: "Perro",
            english: "Dog"
        },

        {
            id: 3,
            spanish: "Libro",
            english: "Book"
        },

        {
            id: 4,
            spanish: "Agua",
            english: "Water"
        },

        {
            id: 5,
            spanish: "Sol",
            english: "Sun"
        },

        {
            id: 6,
            spanish: "Amigo",
            english: "Friend"
        }

    ];


    let firstCard = null;
    let secondCard = null;

    let lockBoard = false;

    let attempts = 0;
    let score = 0;
    let pairs = 0;


    function crearCartas() {

        memoryBoard.innerHTML = "";

        const cartas = [];


        words.forEach((word) => {

            cartas.push({
                id: word.id,
                language: "es",
                text: word.spanish
            });

            cartas.push({
                id: word.id,
                language: "en",
                text: word.english
            });

        });


        cartas.sort(() => Math.random() - 0.5);


        cartas.forEach((carta) => {

            const elemento =
                document.createElement("button");

            elemento.className = "memory-card";

            elemento.dataset.id = carta.id;
            elemento.dataset.language = carta.language;

            elemento.innerHTML = `

                <div class="memory-card-inner">

                    <div class="memory-front">
                        🦊
                    </div>

                    <div class="memory-back">
                        ${carta.language === "es" ? "🇪🇸 " : "🇬🇧 "}
                        ${carta.text}
                    </div>

                </div>

            `;


            elemento.addEventListener(
                "click",
                () => voltearCarta(elemento)
            );


            memoryBoard.appendChild(elemento);

        });

    }


    function voltearCarta(carta) {

        if (lockBoard) return;

        if (carta === firstCard) return;

        if (carta.classList.contains("matched")) return;


        carta.classList.add("flipped");


        if (!firstCard) {

            firstCard = carta;

            return;

        }


        secondCard = carta;

        attempts++;

        attemptsElement.textContent = attempts;

        comprobarPareja();

    }


    function comprobarPareja() {

        const mismaPalabra =
            firstCard.dataset.id ===
            secondCard.dataset.id;

        const idiomasDiferentes =
            firstCard.dataset.language !==
            secondCard.dataset.language;


        if (mismaPalabra && idiomasDiferentes) {

            parejaCorrecta();

        } else {

            parejaIncorrecta();

        }

    }


    function parejaCorrecta() {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        pairs++;

        score += 100;

        scoreElement.textContent = score;

        pairsElement.textContent =
            `${pairs}/${words.length}`;

        resetTurn();


        if (pairs === words.length) {

            setTimeout(() => {

                mostrarMensaje(
                    "¡Ganaste! 🏆",
                    `Excelente trabajo. Conseguistе ${score} puntos en ${attempts} intentos.`,
                    "🦊"
                );

            }, 500);

        }

    }


    function parejaIncorrecta() {

        lockBoard = true;

        score = Math.max(0, score - 10);

        scoreElement.textContent = score;


        setTimeout(() => {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();

        }, 800);

    }


    function resetTurn() {

        firstCard = null;
        secondCard = null;
        lockBoard = false;

    }


    function reiniciarMemoria() {

        firstCard = null;
        secondCard = null;

        lockBoard = false;

        attempts = 0;
        score = 0;
        pairs = 0;

        scoreElement.textContent = "0";
        attemptsElement.textContent = "0";
        pairsElement.textContent = `0/${words.length}`;

        crearCartas();

    }


    function iniciarMemoria() {

        cerrarMensaje();

        memorySection.classList.add("active");

        reiniciarMemoria();

        setTimeout(() => {

            memorySection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }


    restartButton.addEventListener(
        "click",
        reiniciarMemoria
    );


    closeButton.addEventListener(
        "click",
        () => {

            memorySection.classList.remove("active");

            document
                .getElementById("juegos")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* =================================================
       LINGO
    ================================================= */

    const lingo = document.getElementById("lingo");

    document.addEventListener("mousemove", (evento) => {

        if (!lingo) return;

        const x =
            (evento.clientX / window.innerWidth - 0.5) * 5;

        const y =
            (evento.clientY / window.innerHeight - 0.5) * 3;

        lingo.style.transform =
            `translate(${x}px, ${y}px)`;

    });


    /* =================================================
       SALUDO INICIAL
    ================================================= */

    setTimeout(() => {

        mostrarMensaje(
            "¡Hola! Soy Lingo 🦊",
            "Bienvenido a LinguaGo. ¡Vamos a aprender jugando!",
            "👋"
        );

    }, 1200);

});
