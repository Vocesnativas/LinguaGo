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

        if (!messageBox) return;

        messageBox.classList.remove("active");

    }


    if (closeMessage) {
        closeMessage.addEventListener("click", cerrarMensaje);
    }

    if (messageAction) {
        messageAction.addEventListener("click", cerrarMensaje);
    }

    if (messageBox) {

        messageBox.addEventListener("click", (evento) => {

            if (evento.target === messageBox) {
                cerrarMensaje();
            }

        });

    }


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
       JUEGOS
    ================================================= */

    document.querySelectorAll(".game-btn").forEach((boton) => {

        boton.addEventListener("click", () => {

            if (boton.id === "memoryGameBtn") {

                iniciarMemoria();

                return;

            }

            if (boton.dataset.game === "Palabra correcta") {

                iniciarPalabraCorrecta();

                return;

            }

            if (boton.dataset.game === "Reto LinguaGo") {

                iniciarRetoLinguaGo();

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


    /* =================================================
       PALABRA CORRECTA
    ================================================= */

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

            juego = document.createElement("section");

            juego.id = "correctWordGame";

            juego.className = "correct-word-game";

            document
                .getElementById("juegos")
                .after(juego);

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
                    <strong>${preguntaActual + 1}</strong>
                    de
                    <strong>${preguntas.length}</strong>
                </div>

                <div class="correct-question">
                    ${preguntas[preguntaActual].pregunta}
                </div>

                <div class="correct-options"></div>

                <div class="correct-score">
                    ⭐ Puntos:
                    <strong>${puntosPalabra}</strong>
                </div>

            </div>

        `;


        const opcionesBox =
            juego.querySelector(".correct-options");


        const opciones =
            [...preguntas[preguntaActual].opciones];


        opciones
            .sort(() => Math.random() - 0.5)
            .forEach((opcion) => {

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


        botones.forEach((boton) => {

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
                .querySelector(
                    ".correct-word-box"
                )
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
                    <small>puntos</small>
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


    /* =================================================
       RETO LINGUAGO
    ================================================= */

    const retosLinguaGo = [

        {
            pregunta: "¿Cómo se dice GATO en inglés?",
            opciones: ["Cat", "Car", "Hat"],
            correcta: "Cat"
        },

        {
            pregunta: "¿Cómo se dice ROJO en inglés?",
            opciones: ["Blue", "Red", "Green"],
            correcta: "Red"
        },

        {
            pregunta: "¿Cómo se dice AGUA en inglés?",
            opciones: ["Water", "Milk", "Juice"],
            correcta: "Water"
        },

        {
            pregunta: "¿Cómo se dice LIBRO en inglés?",
            opciones: ["Book", "Pen", "Table"],
            correcta: "Book"
        },

        {
            pregunta: "¿Cómo se dice GRANDE en inglés?",
            opciones: ["Small", "Big", "Short"],
            correcta: "Big"
        },

        {
            pregunta: "¿Cómo se dice AMIGO en inglés?",
            opciones: ["Friend", "Brother", "Teacher"],
            correcta: "Friend"
        },

        {
            pregunta: "¿Cómo se dice ESCUELA en inglés?",
            opciones: ["School", "House", "Park"],
            correcta: "School"
        },

        {
            pregunta: "¿Cómo se dice SOL en inglés?",
            opciones: ["Moon", "Sun", "Star"],
            correcta: "Sun"
        }

    ];


    let retoActual = 0;
    let puntosReto = 0;
    let tiempoReto = 10;
    let intervaloReto = null;
    let retoBloqueado = false;


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


            document
                .getElementById("juegos")
                .after(juego);

        }


        retoBloqueado = false;

        tiempoReto = 10;

        clearInterval(intervaloReto);


        const reto =
            retosLinguaGo[retoActual];


        juego.innerHTML = `

            <div class="challenge-box">

                <span class="challenge-label">
                    ⚡ RETO LINGUAGO
                </span>

                <h2>
                    ¡Responde rápido!
                </h2>


                <div class="challenge-top">

                    <div>

                        <strong>
                            ${retoActual + 1}
                        </strong>

                        <small>
                            / ${retosLinguaGo.length}
                        </small>

                    </div>


                    <div class="challenge-time">

                        ⏱️

                        <strong id="challengeTimer">
                            ${tiempoReto}
                        </strong>

                    </div>


                    <div>

                        ⭐

                        <strong id="challengeScore">
                            ${puntosReto}
                        </strong>

                    </div>

                </div>


                <div class="challenge-question">
                    ${reto.pregunta}
                </div>


                <div class="challenge-options"></div>


                <div
                    class="challenge-feedback"
                    id="challengeFeedback">
                </div>

            </div>

        `;


        const opciones =
            juego.querySelector(
                ".challenge-options"
            );


        const opcionesMezcladas =
            [...reto.opciones]
                .sort(
                    () => Math.random() - 0.5
                );


        opcionesMezcladas.forEach(
            (opcion) => {

                const boton =
                    document.createElement(
                        "button"
                    );


                boton.className =
                    "challenge-option";


                boton.textContent =
                    opcion;


                boton.addEventListener(
                    "click",
                    () => responderReto(opcion)
                );


                opciones.appendChild(boton);

            }
        );


        juego.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        intervaloReto =
            setInterval(() => {

                tiempoReto--;


                const timer =
                    document.getElementById(
                        "challengeTimer"
                    );


                if (timer) {
                    timer.textContent =
                        tiempoReto;
                }


                if (tiempoReto <= 0) {

                    clearInterval(
                        intervaloReto
                    );

                    responderReto(null);

                }

            }, 1000);

    }


    function responderReto(respuesta) {

        if (retoBloqueado) return;

        retoBloqueado = true;

        clearInterval(intervaloReto);


        const reto =
            retosLinguaGo[retoActual];


        const botones =
            document.querySelectorAll(
                ".challenge-option"
            );


        botones.forEach((boton) => {

            boton.disabled = true;


            if (
                boton.textContent ===
                reto.correcta
            ) {

                boton.classList.add(
                    "challenge-correct"
                );

            }

        });


        const feedback =
            document.getElementById(
                "challengeFeedback"
            );


        if (respuesta === reto.correcta) {

            puntosReto += 100;


            if (feedback) {

                feedback.textContent =
                    "🎉 ¡Correcto! +100 puntos";

            }

        } else {

            puntosReto =
                Math.max(
                    0,
                    puntosReto - 25
                );


            if (feedback) {

                feedback.textContent =
                    respuesta === null
                        ? `⏰ ¡Se acabó el tiempo! Era "${reto.correcta}".`
                        : `❌ Incorrecto. Era "${reto.correcta}".`;

            }

        }


        const score =
            document.getElementById(
                "challengeScore"
            );


        if (score) {
            score.textContent =
                puntosReto;
        }


        setTimeout(() => {

            retoActual++;


            if (
                retoActual >=
                retosLinguaGo.length
            ) {

                terminarRetoLinguaGo();

            } else {

                crearRetoLinguaGo();

            }

        }, 1000);

    }


    function terminarRetoLinguaGo() {

        clearInterval(intervaloReto);


        const juego =
            document.getElementById(
                "linguaGoChallenge"
            );


        if (!juego) return;


        juego.innerHTML = `

            <div
                class="challenge-box challenge-final">

                <div class="challenge-final-icon">
                    🏆
                </div>

                <span class="challenge-label">
                    ⚡ RETO LINGUAGO
                </span>

                <h2>
                    ¡Reto completado!
                </h2>

                <p>
                    Terminaste todas las preguntas.
                </p>


                <div class="challenge-final-score">

                    <strong>
                        ${puntosReto}
                    </strong>

                    <span>
                        puntos
                    </span>

                </div>


                <button
                    class="challenge-restart"
                    id="restartChallenge">

                    🔄 Jugar otra vez

                </button>


                <button
                    class="challenge-close"
                    id="closeChallenge">

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
                iniciarRetoLinguaGo
            );


        document
            .getElementById(
                "closeChallenge"
            )
            .addEventListener(
                "click",
                cerrarRetoLinguaGo
            );

    }


    function cerrarRetoLinguaGo() {

        clearInterval(intervaloReto);


        const juego =
            document.getElementById(
                "linguaGoChallenge"
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


    /* =================================================
       LINGO
    ================================================= */

    const lingo =
        document.getElementById("lingo");


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

