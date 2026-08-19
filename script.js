/* =====================================================
   LINGUAGO
   JAVASCRIPT + JUEGOS
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
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =================================================
       MENSAJES
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

        if (!messageBox) return;

        if (messageTitle)
            messageTitle.textContent = titulo;

        if (messageText)
            messageText.textContent = texto;

        if (messageIcon)
            messageIcon.textContent = icono;

        messageBox.classList.add("active");

    }


    function cerrarMensaje() {

        if (messageBox) {
            messageBox.classList.remove("active");
        }

    }


    if (closeMessage) {

        closeMessage.addEventListener(
            "click",
            cerrarMensaje
        );

    }


    if (messageAction) {

        messageAction.addEventListener(
            "click",
            cerrarMensaje
        );

    }


    if (messageBox) {

        messageBox.addEventListener(
            "click",
            (evento) => {

                if (evento.target === messageBox) {
                    cerrarMensaje();
                }

            }
        );

    }


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

    document
        .querySelectorAll(".card-btn")
        .forEach((boton) => {

            boton.addEventListener("click", () => {

                const curso =
                    boton.dataset.course;


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
       BOTONES DE JUEGOS
    ================================================= */

    document
        .querySelectorAll(".game-btn")
        .forEach((boton) => {

            boton.addEventListener("click", () => {

                const juego =
                    boton.dataset.game;


                if (juego === "Memoria") {

                    iniciarMemoria();

                    return;

                }


                if (juego === "Palabra correcta") {

                    iniciarPalabraCorrecta();

                    return;

                }


                if (juego === "Reto LinguaGo") {

                    iniciarRetoLinguaGo();

                    return;

                }

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

        if (!memoryBoard) return;

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


        cartas.sort(
            () => Math.random() - 0.5
        );


        cartas.forEach((carta) => {

            const elemento =
                document.createElement("button");

            elemento.className =
                "memory-card";


            elemento.dataset.id =
                carta.id;

            elemento.dataset.language =
                carta.language;


            elemento.innerHTML = `

                <div class="memory-card-inner">

                    <div class="memory-front">
                        🦊
                    </div>

                    <div class="memory-back">
                        ${
                            carta.language === "es"
                                ? "🇪🇸 "
                                : "🇬🇧 "
                        }

                        ${carta.text}

                    </div>

                </div>

            `;


            elemento.addEventListener(
                "click",
                () => voltearCarta(elemento)
            );


            memoryBoard.appendChild(
                elemento
            );

        });

    }


    function voltearCarta(carta) {

        if (lockBoard) return;

        if (carta === firstCard) return;

        if (
            carta.classList.contains("matched")
        ) {
            return;
        }


        carta.classList.add("flipped");


        if (!firstCard) {

            firstCard = carta;

            return;

        }


        secondCard = carta;

        attempts++;


        if (attemptsElement) {

            attemptsElement.textContent =
                attempts;

        }


        comprobarPareja();

    }


    function comprobarPareja() {

        const mismaPalabra =
            firstCard.dataset.id ===
            secondCard.dataset.id;


        const idiomasDiferentes =
            firstCard.dataset.language !==
            secondCard.dataset.language;


        if (
            mismaPalabra &&
            idiomasDiferentes
        ) {

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


        if (scoreElement) {

            scoreElement.textContent =
                score;

        }


        if (pairsElement) {

            pairsElement.textContent =
                `${pairs}/${words.length}`;

        }


        resetTurn();


        if (pairs === words.length) {

            setTimeout(() => {

                mostrarMensaje(
                    "¡Ganaste! 🏆",
                    `Excelente trabajo. Conseguí ${score} puntos en ${attempts} intentos.`,
                    "🦊"
                );

            }, 500);

        }

    }


    function parejaIncorrecta() {

        lockBoard = true;

        score =
            Math.max(0, score - 10);


        if (scoreElement) {

            scoreElement.textContent =
                score;

        }


        setTimeout(() => {

            if (firstCard)
                firstCard.classList.remove("flipped");

            if (secondCard)
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


        if (scoreElement)
            scoreElement.textContent = "0";


        if (attemptsElement)
            attemptsElement.textContent = "0";


        if (pairsElement) {

            pairsElement.textContent =
                `0/${words.length}`;

        }


        crearCartas();

    }


    function iniciarMemoria() {

        cerrarMensaje();


        if (!memorySection) return;


        memorySection.classList.add(
            "active"
        );


        reiniciarMemoria();


        setTimeout(() => {

            memorySection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }


    if (restartButton) {

        restartButton.addEventListener(
            "click",
            reiniciarMemoria
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                if (memorySection) {

                    memorySection.classList.remove(
                        "active"
                    );

                }


                const juegos =
                    document.getElementById(
                        "juegos"
                    );


                if (juegos) {

                    juegos.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =================================================
       PALABRA CORRECTA
    ================================================= */

    const preguntas = [

        {
            pregunta: "¿Cómo se dice CASA en inglés?",
            opciones: [
                "House",
                "Horse",
                "Mouse"
            ],
            correcta: "House"
        },

        {
            pregunta: "¿Cómo se dice PERRO en inglés?",
            opciones: [
                "Bird",
                "Dog",
                "Fish"
            ],
            correcta: "Dog"
        },

        {
            pregunta: "¿Cómo se dice LIBRO en inglés?",
            opciones: [
                "Book",
                "Look",
                "Cook"
            ],
            correcta: "Book"
        },

        {
            pregunta: "¿Cómo se dice AGUA en inglés?",
            opciones: [
                "Fire",
                "Food",
                "Water"
            ],
            correcta: "Water"
        },

        {
            pregunta: "¿Cómo se dice SOL en inglés?",
            opciones: [
                "Moon",
                "Sun",
                "Star"
            ],
            correcta: "Sun"
        },

        {
            pregunta: "¿Cómo se dice AMIGO en inglés?",
            opciones: [
                "Family",
                "Friend",
                "Father"
            ],
            correcta: "Friend"
        },

        {
            pregunta: "¿Cómo se dice ESCUELA en inglés?",
            opciones: [
                "School",
                "Street",
                "Store"
            ],
            correcta: "School"
        },

        {
            pregunta: "¿Cómo se dice LIBRE en inglés?",
            opciones: [
                "Free",
                "Three",
                "Tree"
            ],
            correcta: "Free"
        }

    ];


    let preguntaActual = 0;

    let puntosPalabra = 0;


    function iniciarPalabraCorrecta() {

        cerrarMensaje();

        preguntaActual = 0;

        puntosPalabra = 0;

        crearJuegoPalabraCorrecta();

    }


    function crearJuegoPalabraCorrecta() {

        let juego =
            document.getElementById(
                "correctWordGame"
            );


        if (!juego) {

            juego =
                document.createElement(
                    "section"
                );

            juego.id =
                "correctWordGame";

            juego.className =
                "correct-word-game";


            const juegos =
                document.getElementById(
                    "juegos"
                );


            if (juegos) {

                juegos.after(juego);

            }

        }


        const pregunta =
            preguntas[preguntaActual];


        juego.innerHTML = `

            <div class="correct-word-box">

                <span class="correct-label">
                    🔤 PALABRA CORRECTA
                </span>

                <h2>
                    ¡Elige la respuesta correcta!
                </h2>

                <div class="correct-progress">
                    Pregunta
                    <strong>
                        ${preguntaActual + 1}
                    </strong>
                    de
                    <strong>
                        ${preguntas.length}
                    </strong>
                </div>

                <div class="correct-question">
                    ${pregunta.pregunta}
                </div>

                <div class="correct-options">
                </div>

                <div class="correct-score">
                    ⭐ Puntos:
                    <strong>
                        ${puntosPalabra}
                    </strong>
                </div>

                <button
                    class="correct-close"
                    id="closeCorrectWord">

                    ✕ Cerrar

                </button>

            </div>

        `;


        const opcionesBox =
            juego.querySelector(
                ".correct-options"
            );


        const opciones =
            [...pregunta.opciones];


        opciones.sort(
            () => Math.random() - 0.5
        );


        opciones.forEach((opcion) => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.textContent =
                opcion;


            boton.className =
                "correct-option";


            boton.addEventListener(
                "click",
                () => responderPalabra(opcion)
            );


            opcionesBox.appendChild(
                boton
            );

        });


        const cerrar =
            document.getElementById(
                "closeCorrectWord"
            );


        if (cerrar) {

            cerrar.addEventListener(
                "click",
                cerrarPalabraCorrecta
            );

        }


        juego.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    function responderPalabra(
        respuesta
    ) {

        const correcta =
            preguntas[preguntaActual]
                .correcta;


        const botones =
            document.querySelectorAll(
                ".correct-option"
            );


        botones.forEach((boton) => {

            boton.disabled = true;


            if (
                boton.textContent ===
                correcta
            ) {

                boton.classList.add(
                    "correct-answer"
                );

            }

        });


        if (respuesta === correcta) {

            puntosPalabra += 100;

        } else {

            puntosPalabra =
                Math.max(
                    0,
                    puntosPalabra - 25
                );

        }


        const juego =
            document.getElementById(
                "correctWordGame"
            );


        if (juego) {

            const resultado =
                document.createElement("p");


            resultado.className =
                "correct-feedback";


            resultado.textContent =
                respuesta === correcta
                    ? "🎉 ¡Correcto! +100 puntos"
                    : `❌ La respuesta era "${correcta}"`;


            const caja =
                juego.querySelector(
                    ".correct-word-box"
                );


            if (caja) {

                caja.appendChild(
                    resultado
                );

            }

        }


        setTimeout(() => {

            preguntaActual++;


            if (
                preguntaActual >=
                preguntas.length
            ) {

                terminarPalabraCorrecta();

            } else {

                crearJuegoPalabraCorrecta();

            }

        }, 1100);

    }


    function terminarPalabraCorrecta() {

        const juego =
            document.getElementById(
                "correctWordGame"
            );


        if (!juego) return;


        juego.innerHTML = `

            <div class="correct-word-box final">

                <div class="correct-final-icon">
                    🏆
                </div>

                <h2>
                    ¡Reto terminado!
                </h2>

                <p>
                    Terminaste todas las preguntas.
                </p>

                <div class="final-score">

                    ${puntosPalabra}

                    <small>
                        puntos
                    </small>

                </div>

                <button
                    class="correct-restart"
                    id="restartCorrectWord">

                    🔄 Jugar otra vez

                </button>

                <button
                    class="correct-close"
                    id="closeCorrectWord">

                    ✕ Cerrar

                </button>

            </div>

        `;


        document
            .getElementById(
                "restartCorrectWord"
            )
            .addEventListener(
                "click",
                () => {

                    preguntaActual = 0;

                    puntosPalabra = 0;

                    crearJuegoPalabraCorrecta();

                }
            );


        document
            .getElementById(
                "closeCorrectWord"
            )
            .addEventListener(
                "click",
                cerrarPalabraCorrecta
            );

    }


    function cerrarPalabraCorrecta() {

        const juego =
            document.getElementById(
                "correctWordGame"
            );


        if (juego) {

            juego.remove();

        }


        const juegos =
            document.getElementById(
                "juegos"
            );


        if (juegos) {

            juegos.scrollIntoView({
                behavior: "smooth"
            });

        }

    }


    /* =================================================
       RETO LINGUAGO
       CRUCIGRAMA
    ================================================= */

    const crucigrama = [

        {
            palabra: "CASA",
            pista: "🏠 Lugar donde vivimos.",
            respuesta: "HOUSE"
        },

        {
            palabra: "PERRO",
            pista: "🐶 Animal que dice guau.",
            respuesta: "DOG"
        },

        {
            palabra: "SOL",
            pista: "☀️ Brilla durante el día.",
            respuesta: "SUN"
        },

        {
            palabra: "AGUA",
            pista: "💧 La bebemos para vivir.",
            respuesta: "WATER"
        },

        {
            palabra: "LIBRO",
            pista: "📖 Lo usamos para leer.",
            respuesta: "BOOK"
        },

        {
            palabra: "AMIGO",
            pista: "🤝 Persona que nos acompaña.",
            respuesta: "FRIEND"
        }

    ];


    let retoActual = 0;

    let puntosReto = 0;


    function iniciarRetoLinguaGo() {

        cerrarMensaje();

        retoActual = 0;

        puntosReto = 0;

        crearRetoLinguaGo();

    }


    function crearRetoLinguaGo() {

        let juego =
            document.getElementById(
                "linguaGoChallenge"
            );


        if (!juego) {

            juego =
                document.createElement(
                    "section"
                );

            juego.id =
                "linguaGoChallenge";

            juego.className =
                "linguago-challenge";


            const juegos =
                document.getElementById(
                    "juegos"
                );


            if (juegos) {

                juegos.after(juego);

            }

        }


        if (
            retoActual >=
            crucigrama.length
        ) {

            terminarRetoLinguaGo();

            return;

        }


        const reto =
            crucigrama[retoActual];


        juego.innerHTML = `

            <div class="linguago-challenge-box">

                <span class="challenge-label">
                    🧩 RETO LINGUAGO
                </span>

                <h2>
                    ¡Completa el reto!
                </h2>

                <p class="challenge-intro">
                    Lee la pista y escribe la palabra
                    en inglés.
                </p>

                <div class="challenge-progress">
                    Reto
                    <strong>
                        ${retoActual + 1}
                    </strong>
                    de
                    <strong>
                        ${crucigrama.length}
                    </strong>
                </div>

                <div class="challenge-puzzle">

                    <div class="puzzle-icon">
                        🧩
                    </div>

                    <div class="puzzle-word">
                        ${reto.palabra}
                    </div>

                    <p>
                        ${reto.pista}
                    </p>

                </div>

                <input
                    type="text"
                    id="challengeAnswer"
                    class="challenge-input"
                    placeholder="Escribe en inglés..."
                    autocomplete="off"
                >

                <button
                    id="challengeCheck"
                    class="challenge-check">

                    Comprobar

                </button>

                <div
                    id="challengeFeedback"
                    class="challenge-feedback">
                </div>

                <div class="challenge-score">

                    ⭐ Puntos:
                    <strong>
                        ${puntosReto}
                    </strong>

                </div>

                <button
                    id="closeChallenge"
                    class="correct-close">

                    ✕ Cerrar

                </button>

            </div>

        `;


        const input =
            document.getElementById(
                "challengeAnswer"
            );


        const check =
            document.getElementById(
                "challengeCheck"
            );


        const close =
            document.getElementById(
                "closeChallenge"
            );


        if (check) {

            check.addEventListener(
                "click",
                comprobarReto
            );

        }


        if (input) {

            input.addEventListener(
                "keydown",
                (evento) => {

                    if (
                        evento.key ===
                        "Enter"
                    ) {

                        comprobarReto();

                    }

                }
            );


            setTimeout(() => {
                input.focus();
            }, 200);

        }


        if (close) {

            close.addEventListener(
                "click",
                cerrarRetoLinguaGo
            );

        }


        juego.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    function comprobarReto() {

        const input =
            document.getElementById(
                "challengeAnswer"
            );


        const feedback =
            document.getElementById(
                "challengeFeedback"
            );


        const check =
            document.getElementById(
                "challengeCheck"
            );


        if (!input || !feedback) return;


        const respuesta =
            input.value
                .trim()
                .toUpperCase();


        if (!respuesta) {

            feedback.textContent =
                "✏️ Escribe una respuesta.";

            return;

        }


        const correcta =
            crucigrama[retoActual]
                .respuesta;


        if (respuesta === correcta) {

            puntosReto += 100;


            feedback.textContent =
                "🎉 ¡Correcto! +100 puntos";


            feedback.className =
                "challenge-feedback correct";


            input.disabled = true;

            if (check)
                check.disabled = true;


            setTimeout(() => {

                retoActual++;

                crearRetoLinguaGo();

            }, 1000);


        } else {

            puntosReto =
                Math.max(
                    0,
                    puntosReto - 25
                );


            feedback.textContent =
                "❌ No es correcto. Inténtalo otra vez.";


            feedback.className =
                "challenge-feedback wrong";


            input.select();

        }

    }


    function terminarRetoLinguaGo() {

        const juego =
            document.getElementById(
                "linguaGoChallenge"
            );


        if (!juego) return;


        juego.innerHTML = `

            <div class="linguago-challenge-box final">

                <div class="challenge-final-icon">
                    🏆
                </div>

                <h2>
                    ¡Crucigrama completado!
                </h2>

                <p>
                    Has superado todos los retos
                    de LinguaGo.
                </p>

                <div class="final-score">

                    ${puntosReto}

                    <small>
                        puntos
                    </small>

                </div>

                <button
                    id="restartChallenge"
                    class="correct-restart">

                    🔄 Jugar otra vez

                </button>

                <button
                    id="closeChallengeFinal"
                    class="correct-close">

                    ✕ Cerrar

                </button>

            </div>

        `;


        document
            .getElementById(
                "restartChallenge"
            )
            .addEventListener(
                "click",
                () => {

                    retoActual = 0;

                    puntosReto = 0;

                    crearRetoLinguaGo();

                }
            );


        document
            .getElementById(
                "closeChallengeFinal"
            )
            .addEventListener(
                "click",
                cerrarRetoLinguaGo
            );

    }


    function cerrarRetoLinguaGo() {

        const juego =
            document.getElementById(
                "linguaGoChallenge"
            );


        if (juego) {

            juego.remove();

        }


        const juegos =
            document.getElementById(
                "juegos"
            );


        if (juegos) {

            juegos.scrollIntoView({
                behavior: "smooth"
            });

        }

    }


    /* =================================================
       LINGO
    ================================================= */

    const lingo =
        document.getElementById(
            "lingo"
        );


    document.addEventListener(
        "mousemove",
        (evento) => {

            if (!lingo) return;


            const x =
                (
                    evento.clientX /
                    window.innerWidth -
                    0.5
                ) * 5;


            const y =
                (
                    evento.clientY /
                    window.innerHeight -
                    0.5
                ) * 3;


            lingo.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );


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
