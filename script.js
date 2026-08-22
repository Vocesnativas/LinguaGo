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
                menu.classList.contains("active") ? "✕" : "☰";

        });

        menu.querySelectorAll("a").forEach((enlace) => {

            enlace.addEventListener("click", () => {

                menu.classList.remove("active");
                menuBtn.textContent = "☰";

            });

        });

    }


    /* =================================================
       NAVEGACIÓN
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
   CURSOS — SISTEMA DE LECCIONES LINGUAGO
================================================= */

const datosCursos = {

    "Español": {
        idioma: "🇪🇸",
        titulo: "Aprende Español",
        descripcion: "Descubre palabras, construye frases y mejora tu comprensión.",
        lecciones: [
            {
                titulo: "Palabras y sonidos",
                icono: "🔤",
                descripcion: "Aprende palabras básicas y reconoce sus sonidos.",
                pregunta: "¿Cuál de estas palabras es un animal?",
                opciones: ["Casa", "Perro", "Libro"],
                correcta: "Perro"
            },
            {
                titulo: "Construye palabras",
                icono: "🧩",
                descripcion: "Organiza palabras para formar una oración.",
                pregunta: "¿Cuál oración está correctamente escrita?",
                opciones: [
                    "El niño juega.",
                    "Niño el juega.",
                    "Juega niño el."
                ],
                correcta: "El niño juega."
            },
            {
                titulo: "Lee y comprende",
                icono: "📖",
                descripcion: "Lee una pequeña situación y demuestra lo que comprendiste.",
                pregunta: "Ana tiene un libro rojo. ¿Qué tiene Ana?",
                opciones: ["Un balón", "Un libro", "Una mochila"],
                correcta: "Un libro"
            },
            {
                titulo: "Reto LinguaGO",
                icono: "🎮",
                descripcion: "Completa el desafío final de esta ruta.",
                pregunta: "¿Cuál palabra significa lo contrario de GRANDE?",
                opciones: ["Alto", "Pequeño", "Largo"],
                correcta: "Pequeño"
            }
        ]
    },

    "Inglés": {
        idioma: "🇬🇧",
        titulo: "Learn English",
        descripcion: "Learn vocabulary, expressions and basic English step by step.",
        lecciones: [
            {
                titulo: "Words & Sounds",
                icono: "🔤",
                descripcion: "Learn your first English words.",
                pregunta: "How do you say CASA in English?",
                opciones: ["House", "Horse", "Mouse"],
                correcta: "House"
            },
            {
                titulo: "Build Words",
                icono: "🧩",
                descripcion: "Build simple English expressions.",
                pregunta: "Choose the correct sentence.",
                opciones: [
                    "I am a student.",
                    "Student am I.",
                    "Am student a I."
                ],
                correcta: "I am a student."
            },
            {
                titulo: "Read & Understand",
                icono: "📖",
                descripcion: "Read a simple sentence and understand its meaning.",
                pregunta: "Tom has a blue book. What does Tom have?",
                opciones: ["A ball", "A blue book", "A dog"],
                correcta: "A blue book"
            },
            {
                titulo: "LinguaGO Challenge",
                icono: "🎮",
                descripcion: "Complete the final English challenge.",
                pregunta: "What is the opposite of BIG?",
                opciones: ["Small", "Long", "Tall"],
                correcta: "Small"
            }
        ]
    }

};


let cursoActual = null;
let leccionActual = 0;
let puntosCurso = 0;


/* =================================================
   CREAR PANEL DE LECCIONES
================================================= */

function crearPanelLecciones() {

    if (document.getElementById("lessonPanel")) return;

    const panel = document.createElement("section");

    panel.id = "lessonPanel";
    panel.className = "lesson-panel";

    panel.innerHTML = `

        <div class="lesson-container">

            <button
                class="lesson-close"
                id="lessonClose">
                ✕
            </button>

            <div class="lesson-top">

                <span id="lessonLanguage">
                    🇪🇸
                </span>

                <div>
                    <small>APRENDIENDO CON LINGO</small>
                    <h2 id="lessonCourseTitle">
                        Aprende Español
                    </h2>
                </div>

            </div>

            <div class="lesson-progress-area">

                <div class="lesson-progress-text">

                    <span>
                        Progreso
                    </span>

                    <strong id="lessonProgressText">
                        0%
                    </strong>

                </div>

                <div class="lesson-progress">

                    <span id="lessonProgressBar"></span>

                </div>

            </div>

            <div
                class="lesson-path-large"
                id="lessonPathLarge">
            </div>

            <div
                class="lesson-content"
                id="lessonContent">
            </div>

        </div>
    `;

    document.body.appendChild(panel);

    document
        .getElementById("lessonClose")
        .addEventListener(
            "click",
            cerrarLecciones
        );

}


/* =================================================
   INICIAR CURSO
================================================= */

function iniciarCurso(curso) {

    const datos = datosCursos[curso];

    if (!datos) return;

    cursoActual = curso;
    leccionActual = 0;

    const guardado =
        localStorage.getItem(
            `linguago-${curso}-progreso`
        );

    if (guardado) {

        leccionActual =
            Math.min(
                parseInt(guardado),
                datos.lecciones.length - 1
            );

    }

    crearPanelLecciones();

    const panel =
        document.getElementById("lessonPanel");

    panel.classList.add("active");

    document
        .getElementById("lessonLanguage")
        .textContent = datos.idioma;

    document
        .getElementById("lessonCourseTitle")
        .textContent = datos.titulo;

    crearRutaLecciones();

    mostrarLeccion();

    panel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =================================================
   RUTA DE LECCIONES
================================================= */

function crearRutaLecciones() {

    const contenedor =
        document.getElementById("lessonPathLarge");

    if (!contenedor) return;

    const datos =
        datosCursos[cursoActual];

    contenedor.innerHTML = "";

    datos.lecciones.forEach(
        (leccion, indice) => {

            const item =
                document.createElement("button");

            item.className =
                "lesson-step";

            if (indice < leccionActual) {
                item.classList.add("completed");
            }

            if (indice === leccionActual) {
                item.classList.add("current");
            }

            item.innerHTML = `

                <span class="lesson-step-number">
                    ${
                        indice < leccionActual
                            ? "✓"
                            : indice + 1
                    }
                </span>

                <span class="lesson-step-info">

                    <strong>
                        ${leccion.icono}
                        ${leccion.titulo}
                    </strong>

                    <small>
                        ${
                            indice < leccionActual
                                ? "Completada"
                                : indice === leccionActual
                                    ? "Actual"
                                    : "Bloqueada"
                        }
                    </small>

                </span>

            `;

            if (indice <= leccionActual) {

                item.addEventListener(
                    "click",
                    () => {

                        leccionActual = indice;

                        mostrarLeccion();

                    }
                );

            }

            contenedor.appendChild(item);

        }
    );

}


/* =================================================
   MOSTRAR LECCIÓN
================================================= */

function mostrarLeccion() {

    const datos =
        datosCursos[cursoActual];

    const leccion =
        datos.lecciones[leccionActual];

    if (!leccion) return;

    const total =
        datos.lecciones.length;

    const porcentaje =
        Math.round(
            (leccionActual / total) * 100
        );

    document
        .getElementById("lessonProgressText")
        .textContent = `${porcentaje}%`;

    document
        .getElementById("lessonProgressBar")
        .style.width = `${porcentaje}%`;

    crearRutaLecciones();

    const contenido =
        document.getElementById("lessonContent");

    contenido.innerHTML = `

        <div class="lesson-character">
            🦊
        </div>

        <div class="lesson-bubble">

            <strong>
                ¡Hola! Soy Lingo
            </strong>

            <p>
                ${leccion.descripcion}
            </p>

        </div>

        <div class="lesson-question">

            <span>
                ${leccion.icono}
            </span>

            <h3>
                ${leccion.pregunta}
            </h3>

            <div class="lesson-options">
            </div>

        </div>

        <div
            class="lesson-feedback"
            id="lessonFeedback">
        </div>

    `;

    const opciones =
        contenido.querySelector(
            ".lesson-options"
        );

    [...leccion.opciones]
        .sort(() => Math.random() - 0.5)
        .forEach((opcion) => {

            const boton =
                document.createElement("button");

            boton.className =
                "lesson-option";

            boton.textContent = opcion;

            boton.addEventListener(
                "click",
                () => {

                    responderLeccion(
                        opcion,
                        boton
                    );

                }
            );

            opciones.appendChild(boton);

        });

}


/* =================================================
   RESPONDER LECCIÓN
================================================= */

function responderLeccion(
    respuesta,
    botonSeleccionado
) {

    const datos =
        datosCursos[cursoActual];

    const leccion =
        datos.lecciones[leccionActual];

    const botones =
        document.querySelectorAll(
            ".lesson-option"
        );

    botones.forEach((boton) => {

        boton.disabled = true;

        if (
            boton.textContent ===
            leccion.correcta
        ) {

            boton.classList.add(
                "correct"
            );

        }

    });


    const feedback =
        document.getElementById(
            "lessonFeedback"
        );


    if (respuesta === leccion.correcta) {

        puntosCurso += 100;

        botonSeleccionado.classList.add(
            "correct"
        );

        feedback.innerHTML = `
            <div class="feedback-success">
                🎉 ¡Excelente! +100 puntos
            </div>
        `;

    } else {

        botonSeleccionado.classList.add(
            "incorrect"
        );

        feedback.innerHTML = `
            <div class="feedback-error">
                💡 La respuesta correcta es:
                <strong>${leccion.correcta}</strong>
            </div>
        `;

    }


    setTimeout(() => {

        if (
            respuesta ===
            leccion.correcta
        ) {

            localStorage.setItem(
                `linguago-${cursoActual}-progreso`,
                leccionActual + 1
            );

        }


        if (
            leccionActual <
            datos.lecciones.length - 1
        ) {

            leccionActual++;

            mostrarLeccion();

        } else {

            terminarCurso();

        }

    }, 1200);

}


/* =================================================
   FINALIZAR CURSO
================================================= */

function terminarCurso() {

    const contenido =
        document.getElementById(
            "lessonContent"
        );

    const datos =
        datosCursos[cursoActual];

    localStorage.setItem(
        `linguago-${cursoActual}-progreso`,
        datos.lecciones.length
    );


    document
        .getElementById(
            "lessonProgressText"
        )
        .textContent = "100%";

    document
        .getElementById(
            "lessonProgressBar"
        )
        .style.width = "100%";


    crearRutaLecciones();


    contenido.innerHTML = `

        <div class="lesson-finished">

            <div class="finished-icon">
                🏆
            </div>

            <h2>
                ¡Curso completado!
            </h2>

            <p>
                Has completado todas las lecciones
                de ${datos.titulo}.
            </p>

            <div class="finished-score">
                ⭐ ${puntosCurso} puntos
            </div>

            <button
                class="lesson-restart"
                id="lessonRestart">
                🔄 Repetir curso
            </button>

        </div>

    `;


    document
        .getElementById("lessonRestart")
        .addEventListener(
            "click",
            () => {

                leccionActual = 0;
                puntosCurso = 0;

                mostrarLeccion();

            }
        );

}


/* =================================================
   CERRAR LECCIONES
================================================= */

function cerrarLecciones() {

    const panel =
        document.getElementById(
            "lessonPanel"
        );

    if (panel) {

        panel.classList.remove(
            "active"
        );

    }

    const lecciones =
        document.getElementById(
            "lecciones"
        );

    if (lecciones) {

        lecciones.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =================================================
   BOTONES DE CURSO
================================================= */

document
    .querySelectorAll(".card-btn")
    .forEach((boton) => {

        boton.addEventListener(
            "click",
            () => {

                const curso =
                    boton.dataset.course;

                iniciarCurso(curso);

            }
        );

    });
    /* =================================================
       BOTONES DE LOS JUEGOS
    ================================================= */

    document.querySelectorAll(".game-btn").forEach((boton) => {

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
                iniciarRetoLinguaGo();
                return;
            }

        });

    });


    /* =================================================
       JUEGO 1
       MEMORIA
    ================================================= */

    const memorySection =
        document.getElementById("memoryGame");

    const memoryBoard =
        document.getElementById("memoryBoard");

    const memoryScore =
        document.getElementById("memoryScore");

    const memoryAttempts =
        document.getElementById("memoryAttempts");

    const memoryPairs =
        document.getElementById("memoryPairs");

    const restartMemory =
        document.getElementById("restartMemory");

    const closeMemory =
        document.getElementById("closeMemory");


    const palabras = [

        {
            id: 1,
            es: "Casa",
            en: "House"
        },

        {
            id: 2,
            es: "Perro",
            en: "Dog"
        },

        {
            id: 3,
            es: "Libro",
            en: "Book"
        },

        {
            id: 4,
            es: "Agua",
            en: "Water"
        },

        {
            id: 5,
            es: "Sol",
            en: "Sun"
        },

        {
            id: 6,
            es: "Amigo",
            en: "Friend"
        }

    ];


    let primeraCarta = null;
    let segundaCarta = null;
    let bloqueo = false;

    let intentos = 0;
    let puntosMemoria = 0;
    let parejas = 0;


    function crearMemoria() {

        if (!memoryBoard) return;

        memoryBoard.innerHTML = "";

        let cartas = [];

        palabras.forEach((palabra) => {

            cartas.push({
                id: palabra.id,
                idioma: "es",
                texto: palabra.es
            });

            cartas.push({
                id: palabra.id,
                idioma: "en",
                texto: palabra.en
            });

        });


        cartas.sort(() => Math.random() - 0.5);


        cartas.forEach((carta) => {

            const boton =
                document.createElement("button");

            boton.className = "memory-card";

            boton.dataset.id = carta.id;
            boton.dataset.language = carta.idioma;

            boton.innerHTML = `

                <div class="memory-card-inner">

                    <div class="memory-front">
                        🦊
                    </div>

                    <div class="memory-back">
                        ${carta.idioma === "es" ? "🇪🇸" : "🇬🇧"}
                        ${carta.texto}
                    </div>

                </div>

            `;


            boton.addEventListener("click", () => {

                voltearMemoria(boton);

            });


            memoryBoard.appendChild(boton);

        });

    }


    function voltearMemoria(carta) {

        if (bloqueo) return;

        if (carta === primeraCarta) return;

        if (carta.classList.contains("matched")) return;


        carta.classList.add("flipped");


        if (!primeraCarta) {

            primeraCarta = carta;

            return;

        }


        segundaCarta = carta;

        intentos++;

        memoryAttempts.textContent = intentos;

        comprobarMemoria();

    }


    function comprobarMemoria() {

        const mismaPalabra =
            primeraCarta.dataset.id ===
            segundaCarta.dataset.id;

        const idiomasDistintos =
            primeraCarta.dataset.language !==
            segundaCarta.dataset.language;


        if (mismaPalabra && idiomasDistintos) {

            parejaMemoriaCorrecta();

        } else {

            parejaMemoriaIncorrecta();

        }

    }


    function parejaMemoriaCorrecta() {

        primeraCarta.classList.add("matched");
        segundaCarta.classList.add("matched");

        parejas++;

        puntosMemoria += 100;

        memoryScore.textContent = puntosMemoria;

        memoryPairs.textContent =
            `${parejas}/${palabras.length}`;


        primeraCarta = null;
        segundaCarta = null;


        if (parejas === palabras.length) {

            setTimeout(() => {

                mostrarMensaje(
                    "¡Ganaste! 🏆",
                    `Conseguiste ${puntosMemoria} puntos en ${intentos} intentos.`,
                    "🦊"
                );

            }, 500);

        }

    }


    function parejaMemoriaIncorrecta() {

        bloqueo = true;

        puntosMemoria =
            Math.max(0, puntosMemoria - 10);

        memoryScore.textContent = puntosMemoria;


        setTimeout(() => {

            primeraCarta.classList.remove("flipped");
            segundaCarta.classList.remove("flipped");

            primeraCarta = null;
            segundaCarta = null;

            bloqueo = false;

        }, 800);

    }


    function reiniciarMemoria() {

        primeraCarta = null;
        segundaCarta = null;

        bloqueo = false;

        intentos = 0;
        puntosMemoria = 0;
        parejas = 0;

        memoryScore.textContent = "0";
        memoryAttempts.textContent = "0";
        memoryPairs.textContent =
            `0/${palabras.length}`;

        crearMemoria();

    }


    function iniciarMemoria() {

        cerrarMensaje();

        if (!memorySection) return;

        cerrarTodosLosJuegos();

        memorySection.classList.add("active");

        reiniciarMemoria();

        memorySection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    if (restartMemory) {

        restartMemory.addEventListener(
            "click",
            reiniciarMemoria
        );

    }


    if (closeMemory) {

        closeMemory.addEventListener(
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
       JUEGO 2
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


    function iniciarPalabraCorrecta() {

        cerrarMensaje();

        cerrarTodosLosJuegos();

        preguntaActual = 0;
        puntosPalabra = 0;

        const juego =
            document.getElementById("correctWordGame");

        if (!juego) return;

        juego.classList.add("active");

        mostrarPregunta();

        juego.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    function mostrarPregunta() {

        const juego =
            document.getElementById("correctWordGame");

        if (!juego) return;


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


        const opciones =
            juego.querySelector(".correct-options");


        const lista =
            [...preguntas[preguntaActual].opciones];

        lista.sort(() => Math.random() - 0.5);


        lista.forEach((opcion) => {

            const boton =
                document.createElement("button");

            boton.className = "correct-option";

            boton.textContent = opcion;


            boton.addEventListener("click", () => {

                responderPalabra(opcion, boton);

            });


            opciones.appendChild(boton);

        });

    }


    function responderPalabra(respuesta, botonSeleccionado) {

        const correcta =
            preguntas[preguntaActual].correcta;


        const juego =
            document.getElementById("correctWordGame");


        const botones =
            juego.querySelectorAll(".correct-option");


        botones.forEach((boton) => {

            boton.disabled = true;

            if (boton.textContent === correcta) {

                boton.classList.add("correct-answer");

            }

        });


        let resultado;


        if (respuesta === correcta) {

            puntosPalabra += 100;

            resultado = "🎉 ¡Correcto! +100 puntos";

        } else {

            puntosPalabra =
                Math.max(0, puntosPalabra - 25);

            resultado =
                `❌ La respuesta era "${correcta}"`;

        }


        const mensaje =
            document.createElement("p");

        mensaje.className = "correct-feedback";

        mensaje.textContent = resultado;

        juego
            .querySelector(".correct-word-box")
            .appendChild(mensaje);


        setTimeout(() => {

            preguntaActual++;


            if (preguntaActual >= preguntas.length) {

                terminarPalabraCorrecta();

            } else {

                mostrarPregunta();

            }

        }, 1000);

    }


    function terminarPalabraCorrecta() {

        const juego =
            document.getElementById("correctWordGame");

        if (!juego) return;


        juego.innerHTML = `

            <div class="correct-word-box final">

                <div style="font-size:4rem;">
                    🏆
                </div>

                <h2>
                    ¡Reto terminado!
                </h2>

                <p>
                    Terminaste las ${preguntas.length}
                    preguntas.
                </p>

                <div class="final-score"
                     style="font-size:3rem;font-weight:900;color:#ff7043;margin:20px;">
                    ${puntosPalabra}
                    <small style="font-size:1rem;">
                        puntos
                    </small>
                </div>

                <button
                    class="correct-restart"
                    id="restartCorrectWord"
                    style="padding:12px 20px;border:0;border-radius:10px;background:#2878e3;color:white;font-weight:800;">
                    🔄 Jugar otra vez
                </button>

                <button
                    class="correct-close"
                    id="closeCorrectWord"
                    style="padding:12px 20px;border:1px solid #ddd;border-radius:10px;background:white;font-weight:800;">
                    ✕ Cerrar
                </button>

            </div>

        `;


        document
            .getElementById("restartCorrectWord")
            .addEventListener("click", () => {

                preguntaActual = 0;
                puntosPalabra = 0;

                mostrarPregunta();

            });


        document
            .getElementById("closeCorrectWord")
            .addEventListener(
                "click",
                cerrarPalabraCorrecta
            );

    }


    function cerrarPalabraCorrecta() {

        const juego =
            document.getElementById("correctWordGame");

        if (juego) {

            juego.classList.remove("active");

        }


        document
            .getElementById("juegos")
            .scrollIntoView({
                behavior: "smooth"
            });

    }


    /* =================================================
   JUEGO 3
   RETO LINGUAGO - CRUCIGRAMA
================================================= */

const challengeSection =
    document.getElementById("challengeGame");

const crossword =
    document.getElementById("crossword");

const clues =
    document.getElementById("clues");

const challengeScore =
    document.getElementById("challengeScore");

const challengeCompleted =
    document.getElementById("challengeCompleted");

const restartChallenge =
    document.getElementById("restartChallenge");

const closeChallenge =
    document.getElementById("closeChallenge");


/* =================================================
   DATOS DEL CRUCIGRAMA
================================================= */

const crucigrama = {

    filas: 9,
    columnas: 9,

    palabras: [

        {
            numero: 1,
            palabra: "HOUSE",
            fila: 0,
            columna: 2,
            direccion: "horizontal",
            pista: "🏠 Casa"
        },

        {
            numero: 2,
            palabra: "SUN",
            fila: 0,
            columna: 2,
            direccion: "vertical",
            pista: "☀️ Sol"
        },

        {
            numero: 3,
            palabra: "SCHOOL",
            fila: 2,
            columna: 0,
            direccion: "horizontal",
            pista: "🏫 Escuela"
        },

        {
            numero: 4,
            palabra: "DOG",
            fila: 2,
            columna: 3,
            direccion: "vertical",
            pista: "🐶 Perro"
        },

        {
            numero: 5,
            palabra: "WATER",
            fila: 5,
            columna: 0,
            direccion: "horizontal",
            pista: "💧 Agua"
        },

        {
            numero: 6,
            palabra: "BOOK",
            fila: 4,
            columna: 3,
            direccion: "vertical",
            pista: "📚 Libro"
        },

        {
            numero: 7,
            palabra: "FRIEND",
            fila: 7,
            columna: 1,
            direccion: "horizontal",
            pista: "🤝 Amigo"
        }

    ]

};


let puntosReto = 0;
let palabrasCompletadas = 0;
let palabrasCorrectas = new Set();


/* =================================================
   INICIAR RETO
================================================= */

function iniciarRetoLinguaGo() {

    cerrarMensaje();

    cerrarTodosLosJuegos();

    if (!challengeSection) return;

    challengeSection.classList.add("active");

    reiniciarCrucigrama();

    challengeSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =================================================
   REINICIAR
================================================= */

function reiniciarCrucigrama() {

    puntosReto = 0;
    palabrasCompletadas = 0;

    palabrasCorrectas.clear();

    if (challengeScore) {
        challengeScore.textContent = "0";
    }

    if (challengeCompleted) {
        challengeCompleted.textContent = "0";
    }

    crearCrucigrama();

}


/* =================================================
   CREAR CUADRÍCULA
================================================= */

function crearCrucigrama() {

    if (!crossword) return;

    crossword.innerHTML = "";

    const celdas = {};


    /* Crear estructura */

    crucigrama.palabras.forEach((palabra) => {

        for (
            let i = 0;
            i < palabra.palabra.length;
            i++
        ) {

            let fila = palabra.fila;
            let columna = palabra.columna;


            if (palabra.direccion === "horizontal") {
                columna += i;
            } else {
                fila += i;
            }


            const clave =
                `${fila}-${columna}`;


            if (!celdas[clave]) {

                celdas[clave] = {

                    fila,
                    columna,
                    letra: palabra.palabra[i],
                    palabras: []

                };

            }


            celdas[clave].palabras.push(
                palabra.numero
            );

        }

    });


    /* Crear las 81 posiciones */

    for (let fila = 0; fila < crucigrama.filas; fila++) {

        for (
            let columna = 0;
            columna < crucigrama.columnas;
            columna++
        ) {

            const clave =
                `${fila}-${columna}`;

            const celda =
                celdas[clave];


            if (!celda) {

                const bloque =
                    document.createElement("div");

                bloque.className = "cross-cell block";

                crossword.appendChild(bloque);

                continue;

            }


            const input =
                document.createElement("input");

            input.className = "cross-cell";

            input.maxLength = 1;

            input.dataset.fila = fila;
            input.dataset.columna = columna;

            input.dataset.respuesta =
                celda.letra;

            input.dataset.palabras =
                celda.palabras.join(",");


            input.setAttribute(
                "aria-label",
                "Letra del crucigrama"
            );


            input.addEventListener(
                "input",
                () => {

                    input.value =
                        input.value
                            .toUpperCase()
                            .replace(/[^A-Z]/g, "")
                            .slice(0, 1);

                    if (input.value) {

                        moverSiguiente(
                            fila,
                            columna
                        );

                    }

                    comprobarCrucigrama();

                }
            );


            input.addEventListener(
                "keydown",
                (evento) => {

                    if (
                        evento.key === "Backspace" &&
                        input.value === ""
                    ) {

                        moverAnterior(
                            fila,
                            columna
                        );

                    }

                }
            );


            crossword.appendChild(input);

        }

    }


    crearPistas();

}


/* =================================================
   MOVER A LA SIGUIENTE CELDA
================================================= */

function moverSiguiente(fila, columna) {

    const inputs =
        crossword.querySelectorAll(
            ".cross-cell:not(.block)"
        );


    const actual =
        crossword.querySelector(
            `[data-fila="${fila}"][data-columna="${columna}"]`
        );


    const index =
        Array.from(inputs).indexOf(actual);


    if (
        index >= 0 &&
        index < inputs.length - 1
    ) {

        inputs[index + 1].focus();

    }

}


/* =================================================
   MOVER A LA ANTERIOR
================================================= */

function moverAnterior(fila, columna) {

    const inputs =
        crossword.querySelectorAll(
            ".cross-cell:not(.block)"
        );


    const actual =
        crossword.querySelector(
            `[data-fila="${fila}"][data-columna="${columna}"]`
        );


    const index =
        Array.from(inputs).indexOf(actual);


    if (index > 0) {

        inputs[index - 1].focus();

    }

}


/* =================================================
   CREAR PISTAS
================================================= */

function crearPistas() {

    if (!clues) return;

    clues.innerHTML = "";

    crucigrama.palabras.forEach((palabra) => {

        const pista =
            document.createElement("div");

        pista.className = "clue";

        pista.innerHTML = `

            <strong>
                ${palabra.numero}.
            </strong>

            ${palabra.pista}

            <small>
                (${palabra.palabra.length} letras)
            </small>

        `;

        clues.appendChild(pista);

    });

}


/* =================================================
   COMPROBAR CRUCIGRAMA
================================================= */

function comprobarCrucigrama() {

    crucigrama.palabras.forEach((palabra) => {

        if (palabrasCorrectas.has(palabra.numero)) {
            return;
        }


        let respuesta = "";


        for (
            let i = 0;
            i < palabra.palabra.length;
            i++
        ) {

            let fila = palabra.fila;
            let columna = palabra.columna;


            if (palabra.direccion === "horizontal") {
                columna += i;
            } else {
                fila += i;
            }


            const input =
                crossword.querySelector(
                    `[data-fila="${fila}"][data-columna="${columna}"]`
                );


            if (!input) return;


            respuesta += input.value;

        }


        if (respuesta.length !== palabra.palabra.length) {
            return;
        }


        if (respuesta === palabra.palabra) {

            palabrasCorrectas.add(
                palabra.numero
            );

            palabrasCompletadas++;

            puntosReto += 100;


            if (challengeScore) {
                challengeScore.textContent =
                    puntosReto;
            }


            if (challengeCompleted) {
                challengeCompleted.textContent =
                    palabrasCompletadas;
            }


            /* Marcar palabra correcta */

            for (
                let i = 0;
                i < palabra.palabra.length;
                i++
            ) {

                let fila = palabra.fila;
                let columna = palabra.columna;


                if (
                    palabra.direccion ===
                    "horizontal"
                ) {

                    columna += i;

                } else {

                    fila += i;

                }


                const input =
                    crossword.querySelector(
                        `[data-fila="${fila}"][data-columna="${columna}"]`
                    );


                if (input) {

                    input.classList.add(
                        "correct-cell"
                    );

                    input.disabled = true;

                }

            }

        }

    });


    /* =================================================
       VICTORIA
    ================================================= */

    if (
        palabrasCompletadas ===
        crucigrama.palabras.length
    ) {

        setTimeout(() => {

            mostrarMensaje(
                "¡Crucigrama completado! 🏆",
                `Excelente. Lograste ${puntosReto} puntos.`,
                "🧩"
            );

        }, 400);

    }

}


/* =================================================
   BOTÓN REINICIAR
================================================= */

if (restartChallenge) {

    restartChallenge.addEventListener(
        "click",
        reiniciarCrucigrama
    );

}


/* =================================================
   BOTÓN CERRAR
================================================= */

if (closeChallenge) {

    closeChallenge.addEventListener(
        "click",
        () => {

            if (challengeSection) {

                challengeSection.classList.remove(
                    "active"
                );

            }


            const juegos =
                document.getElementById("juegos");


            if (juegos) {

                juegos.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}    /* =================================================
       CERRAR TODOS LOS JUEGOS
    ================================================= */

    function cerrarTodosLosJuegos() {

        if (memorySection) {
            memorySection.classList.remove("active");
        }

        const palabra =
            document.getElementById("correctWordGame");

        if (palabra) {
            palabra.classList.remove("active");
        }

        if (challengeSection) {
            challengeSection.classList.remove("active");
        }

    }


    /* =================================================
       LINGO
    ================================================= */

    const lingo =
        document.getElementById("lingo");


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
       SALUDO
    ================================================= */

    setTimeout(() => {

        mostrarMensaje(
            "¡Hola! Soy Lingo 🦊",
            "Bienvenido a LinguaGo. ¡Vamos a aprender jugando!",
            "👋"
        );

    }, 1200);


});
