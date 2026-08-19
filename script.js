/* =====================================================
   LINGUAGO
   JAVASCRIPT + 3 JUEGOS
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

        menu.querySelectorAll("a").forEach(enlace => {

            enlace.addEventListener("click", () => {

                menu.classList.remove("active");
                menuBtn.textContent = "☰";

            });

        });

    }


    /* =================================================
       NAVEGACIÓN SUAVE
    ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(enlace => {

        enlace.addEventListener("click", evento => {

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

        if (!messageBox) return;

        messageTitle.textContent = titulo;
        messageText.textContent = texto;
        messageIcon.textContent = icono;

        messageBox.classList.add("active");

    }


    function cerrarMensaje() {

        if (messageBox) {
            messageBox.classList.remove("active");
        }

    }


    if (closeMessage) {
        closeMessage.addEventListener("click", cerrarMensaje);
    }

    if (messageAction) {
        messageAction.addEventListener("click", cerrarMensaje);
    }


    if (messageBox) {

        messageBox.addEventListener("click", evento => {

            if (evento.target === messageBox) {
                cerrarMensaje();
            }

        });

    }


    document.addEventListener("keydown", evento => {

        if (evento.key === "Escape") {
            cerrarMensaje();
        }

    });


    /* =================================================
       CURSOS
    ================================================= */

    document.querySelectorAll(".card-btn").forEach(boton => {

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
       BOTONES DE JUEGOS
    ================================================= */

    document.querySelectorAll(".game-btn").forEach(boton => {

        boton.addEventListener("click", () => {

            const juego = boton.dataset.game;

            if (juego === "Memoria") {

                iniciarMemoria();
                return;

            }

            if (juego === "Palabra correcta") {

                iniciarPalabraCorrecta();
                return;

            }

            if (juego === "Reto LinguaGo") {

                iniciarCrucigrama();
                return;

            }

        });

    });


    /* =====================================================
       JUEGO 1 — MEMORIA
    ===================================================== */

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

        words.forEach(word => {

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


        cartas.forEach(carta => {

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
                        ${carta.language === "es"
                            ? "🇪🇸 "
                            : "🇬🇧 "}
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

        if (attemptsElement) {
            attemptsElement.textContent = attempts;
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

        if (scoreElement) {
            scoreElement.textContent = score;
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
                    `Excelente trabajo. Conseguíste ${score} puntos en ${attempts} intentos.`,
                    "🦊"
                );

            }, 500);

        }

    }


    function parejaIncorrecta() {

        lockBoard = true;

        score = Math.max(0, score - 10);

        if (scoreElement) {
            scoreElement.textContent = score;
        }


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


        if (scoreElement) {
            scoreElement.textContent = "0";
        }

        if (attemptsElement) {
            attemptsElement.textContent = "0";
        }

        if (pairsElement) {
            pairsElement.textContent =
                `0/${words.length}`;
        }


        crearCartas();

    }


    function iniciarMemoria() {

        cerrarMensaje();

        if (!memorySection) return;

        memorySection.classList.add("active");

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

                memorySection.classList.remove("active");

                document
                    .getElementById("juegos")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }


    /* =====================================================
       JUEGO 2 — PALABRA CORRECTA
    ===================================================== */

    const preguntas = [

        {
            pregunta: "¿Cómo se dice CASA en inglés?",
            opciones: ["House", "Horse", "Mouse"],
            correcta: "House"
        },

        {
            pregunta: "¿Cómo se dice PERRO en inglés?",
            opciones: ["Bird", "Dog", "Fish"],
            correcta: "Dog"
        },

        {
            pregunta: "¿Cómo se dice LIBRO en inglés?",
            opciones: ["Book", "Look", "Cook"],
            correcta: "Book"
        },

        {
            pregunta: "¿Cómo se dice AGUA en inglés?",
            opciones: ["Fire", "Food", "Water"],
            correcta: "Water"
        },

        {
            pregunta: "¿Cómo se dice SOL en inglés?",
            opciones: ["Moon", "Sun", "Star"],
            correcta: "Sun"
        },

        {
            pregunta: "¿Cómo se dice AMIGO en inglés?",
            opciones: ["Family", "Friend", "Father"],
            correcta: "Friend"
        },

        {
            pregunta: "¿Cómo se dice ESCUELA en inglés?",
            opciones: ["School", "Street", "Store"],
            correcta: "School"
        },

        {
            pregunta: "¿Cómo se dice LIBRE en inglés?",
            opciones: ["Free", "Three", "Tree"],
            correcta: "Free"
        }

    ];


    let preguntaActual = 0;
    let puntosPalabra = 0;


    function crearJuegoPalabraCorrecta() {

        let juego =
            document.getElementById("correctWordGame");


        if (!juego) {

            juego =
                document.createElement("section");

            juego.id = "correctWordGame";

            juego.className =
                "correct-word-game";


            const juegos =
                document.getElementById("juegos");

            if (juegos) {
                juegos.after(juego);
            }

        }


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
                    ${preguntas[preguntaActual].pregunta}
                </div>

                <div class="correct-options"></div>

                <div class="correct-score">

                    ⭐ Puntos:
                    <strong>
                        ${puntosPalabra}
                    </strong>

                </div>

            </div>
        `;


        const opcionesBox =
            juego.querySelector(".correct-options");


        const opciones =
            [...preguntas[preguntaActual].opciones]
                .sort(() => Math.random() - 0.5);


        opciones.forEach(opcion => {

            const boton =
                document.createElement("button");

            boton.textContent = opcion;

            boton.className =
                "correct-option";


            boton.addEventListener(
                "click",
                () => responderPalabra(opcion)
            );


            opcionesBox.appendChild(boton);

        });


        juego.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    function responderPalabra(respuesta) {

        const correcta =
            preguntas[preguntaActual].correcta;


        const botones =
            document.querySelectorAll(
                ".correct-option"
            );


        botones.forEach(boton => {

            boton.disabled = true;

            if (boton.textContent === correcta) {

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
                    : `❌ Era "${correcta}"`;


            juego
                .querySelector(".correct-word-box")
                .appendChild(resultado);

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

        }, 1000);

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


    function iniciarPalabraCorrecta() {

        cerrarMensaje();

        preguntaActual = 0;
        puntosPalabra = 0;

        crearJuegoPalabraCorrecta();

    }


    function cerrarPalabraCorrecta() {

        const juego =
            document.getElementById(
                "correctWordGame"
            );


        if (juego) {
            juego.remove();
        }


        document
            .getElementById("juegos")
            .scrollIntoView({
                behavior: "smooth"
            });

    }


    /* =====================================================
       JUEGO 3 — RETO LINGUAGO
       CRUCIGRAMA BILINGÜE
    ===================================================== */

    const crucigrama = [

        {
            numero: 1,
            pista: "Casa en inglés",
            respuesta: "HOUSE"
        },

        {
            numero: 2,
            pista: "Perro en inglés",
            respuesta: "DOG"
        },

        {
            numero: 3,
            pista: "Libro en inglés",
            respuesta: "BOOK"
        },

        {
            numero: 4,
            pista: "Agua en inglés",
            respuesta: "WATER"
        },

        {
            numero: 5,
            pista: "Sol en inglés",
            respuesta: "SUN"
        },

        {
            numero: 6,
            pista: "Amigo en inglés",
            respuesta: "FRIEND"
        }

    ];


    let puntosCrucigrama = 0;


    function iniciarCrucigrama() {

        cerrarMensaje();

        puntosCrucigrama = 0;

        let juego =
            document.getElementById(
                "crosswordGame"
            );


        if (!juego) {

            juego =
                document.createElement("section");

            juego.id =
                "crosswordGame";

            juego.className =
                "crossword-game";


            const juegos =
                document.getElementById("juegos");

            if (juegos) {
                juegos.after(juego);
            }

        }


        crearCrucigrama();

    }


    function crearCrucigrama() {

        const juego =
            document.getElementById(
                "crosswordGame"
            );


        if (!juego) return;


        juego.innerHTML = `

            <div class="crossword-box">

                <span class="crossword-label">
                    🧩 RETO LINGUAGO
                </span>

                <h2>
                    Crucigrama bilingüe
                </h2>

                <p>
                    Resuelve las pistas y completa
                    las palabras en inglés.
                </p>


                <div class="crossword-score">

                    ⭐ Puntos:
                    <strong id="crosswordScore">
                        0
                    </strong>

                </div>


                <div class="crossword-board">

                    ${crearTableroCrucigrama()}

                </div>


                <div class="crossword-clues">

                    <h3>
                        💡 Pistas
                    </h3>

                    ${crucigrama.map(pista => `

                        <div class="crossword-clue">

                            <strong>
                                ${pista.numero}.
                            </strong>

                            ${pista.pista}

                            <input
                                type="text"
                                maxlength="${pista.respuesta.length}"
                                data-answer="${pista.respuesta}"
                                data-number="${pista.numero}"
                                class="crossword-input">

                            <span class="crossword-length">
                                ${pista.respuesta.length} letras
                            </span>

                        </div>

                    `).join("")}

                </div>


                <div class="crossword-controls">

                    <button
                        id="checkCrossword"
                        class="crossword-check">

                        ✅ Comprobar

                    </button>


                    <button
                        id="hintCrossword"
                        class="crossword-hint">

                        💡 Pista

                    </button>


                    <button
                        id="restartCrossword"
                        class="crossword-restart">

                        🔄 Nuevo reto

                    </button>


                    <button
                        id="closeCrossword"
                        class="crossword-close">

                        ✕ Cerrar

                    </button>

                </div>


                <p
                    id="crosswordFeedback"
                    class="crossword-feedback">
                </p>

            </div>

        `;


        prepararCrucigrama();


        juego.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    function crearTableroCrucigrama() {

        return `

            <div class="crossword-visual">

                <div class="cross-row">

                    <span class="cross-empty"></span>

                    <span class="cross-letter">H</span>
                    <span class="cross-letter">O</span>
                    <span class="cross-letter">U</span>
                    <span class="cross-letter">S</span>
                    <span class="cross-letter">E</span>

                </div>


                <div class="cross-row">

                    <span class="cross-letter">D</span>
                    <span class="cross-letter">O</span>
                    <span class="cross-letter">G</span>
                    <span class="cross-empty"></span>
                    <span class="cross-empty"></span>
                    <span class="cross-empty"></span>

                </div>


                <div class="cross-row">

                    <span class="cross-letter">B</span>
                    <span class="cross-letter">O</span>
                    <span class="cross-letter">O</span>
                    <span class="cross-letter">K</span>
                    <span class="cross-empty"></span>
                    <span class="cross-empty"></span>

                </div>


                <div class="cross-row">

                    <span class="cross-letter">W</span>
                    <span class="cross-letter">A</span>
                    <span class="cross-letter">T</span>
                    <span class="cross-letter">E</span>
                    <span class="cross-letter">R</span>
                    <span class="cross-empty"></span>

                </div>


                <div class="cross-row">

                    <span class="cross-empty"></span>
                    <span class="cross-letter">S</span>
                    <span class="cross-letter">U</span>
                    <span class="cross-letter">N</span>
                    <span class="cross-empty"></span>
                    <span class="cross-empty"></span>

                </div>


                <div class="cross-row">

                    <span class="cross-letter">F</span>
                    <span class="cross-letter">R</span>
                    <span class="cross-letter">I</span>
                    <span class="cross-letter">E</span>
                    <span class="cross-letter">N</span>
                    <span class="cross-letter">D</span>

                </div>

            </div>

        `;

    }


    function prepararCrucigrama() {

        const inputs =
            document.querySelectorAll(
                ".crossword-input"
            );


        inputs.forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    input.value =
                        input.value
                            .toUpperCase()
                            .replace(/[^A-Z]/g, "");

                }
            );

        });


        const comprobar =
            document.getElementById(
                "checkCrossword"
            );


        if (comprobar) {

            comprobar.addEventListener(
                "click",
                comprobarCrucigrama
            );

        }


        const pista =
            document.getElementById(
                "hintCrossword"
            );


        if (pista) {

            pista.addEventListener(
                "click",
                mostrarPista
            );

        }


        const nuevo =
            document.getElementById(
                "restartCrossword"
            );


        if (nuevo) {

            nuevo.addEventListener(
                "click",
                () => {

                    puntosCrucigrama = 0;

                    crearCrucigrama();

                }
            );

        }


        const cerrar =
            document.getElementById(
                "closeCrossword"
            );


        if (cerrar) {

            cerrar.addEventListener(
                "click",
                cerrarCrucigrama
            );

        }

    }


    function comprobarCrucigrama() {

        const inputs =
            document.querySelectorAll(
                ".crossword-input"
            );


        let correctas = 0;


        inputs.forEach(input => {

            const respuesta =
                input.value.trim();

            const correcta =
                input.dataset.answer;


            input.classList.remove(
                "cross-correct",
                "cross-wrong"
            );


            if (respuesta === correcta) {

                input.classList.add(
                    "cross-correct"
                );

                correctas++;

            } else {

                input.classList.add(
                    "cross-wrong"
                );

            }

        });


        puntosCrucigrama =
            correctas * 100;


        const score =
            document.getElementById(
                "crosswordScore"
            );


        if (score) {
            score.textContent =
                puntosCrucigrama;
        }


        const feedback =
            document.getElementById(
                "crosswordFeedback"
            );


        if (correctas === crucigrama.length) {

            feedback.textContent =
                "🏆 ¡Crucigrama completado! ¡Excelente trabajo!";

            if (feedback) {
                feedback.className =
                    "crossword-feedback success";
            }

        } else {

            feedback.textContent =
                `Has acertado ${correctas} de ${crucigrama.length}. ¡Sigue intentando!`;

        }

    }


    function mostrarPista() {

        const inputs =
            [...document.querySelectorAll(
                ".crossword-input"
            )];


        const pendientes =
            inputs.filter(
                input =>
                    input.value !==
                    input.dataset.answer
            );


        if (pendientes.length === 0) {

            mostrarMensaje(
                "¡Excelente! 🏆",
                "Ya completaste todas las palabras.",
                "🧩"
            );

            return;

        }


        const elegido =
            pendientes[
                Math.floor(
                    Math.random() *
                    pendientes.length
                )
            ];


        elegido.value =
            elegido.dataset.answer.charAt(0);


        elegido.focus();


        const feedback =
            document.getElementById(
                "crosswordFeedback"
            );


        if (feedback) {

            feedback.textContent =
                `💡 La palabra ${elegido.dataset.number} comienza por "${elegido.dataset.answer.charAt(0)}".`;

        }

    }


    function cerrarCrucigrama() {

        const juego =
            document.getElementById(
                "crosswordGame"
            );


        if (juego) {
            juego.remove();
        }


        const juegos =
            document.getElementById("juegos");


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
        document.getElementById("lingo");


    document.addEventListener(
        "mousemove",
        evento => {

            if (!lingo) return;

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
