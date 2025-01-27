// Crear una encuesta con un título, un arreglo de preguntas y un objeto para almacenar resultados.
const crearEncuesta = (titulo) => ({ titulo, preguntas: [], resultados: {} });

// Agrega una pregunta y opciones a la encuesta, inicializando los resultados de cada opción con 0 votos.
const agregarPregunta = (encuesta, pregunta, opciones) => {
  encuesta.preguntas.push({ pregunta, opciones });
  encuesta.resultados[pregunta] = opciones.reduce((acc, opcion) => {
    acc[opcion] = 0;
    return acc;
  }, {});
  return encuesta;
};

// Incrementa el conteo de votos para una opción específica de una pregunta.
const votar = (encuesta, pregunta, opcion) => {
  if (encuesta.resultados[pregunta] && encuesta.resultados[pregunta][opcion] !== undefined) {
    encuesta.resultados[pregunta][opcion]++;
  }
};

// Reinicia los resultados de la encuesta, estableciendo todos los conteos de votos en 0.
const reiniciarEncuesta = (encuesta) => {
  Object.keys(encuesta.resultados).forEach((pregunta) => {
    Object.keys(encuesta.resultados[pregunta]).forEach((opcion) => {
      encuesta.resultados[pregunta][opcion] = 0;
    });
  });
};

// Muestra los resultados de la encuesta en la consola.
const mostrarResultados = (encuesta) => {
  const resultados = encuesta.resultados;
  Object.entries(resultados).forEach(([pregunta, opciones]) => {
    console.log(`Pregunta: ${pregunta}`);
    Object.entries(opciones).forEach(([opcion, votos]) => {
      console.log(`  ${opcion}: ${votos} votos`);
    });
  });
};

// Renderiza las preguntas y opciones de la encuesta en la interfaz del usuario.
const renderizarEncuesta = (encuesta) => {
  const surveyContainer = document.getElementById("survey");
  surveyContainer.innerHTML = "";
  encuesta.preguntas.forEach((preguntaObj, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    const questionTitle = document.createElement("h3");
    questionTitle.textContent = preguntaObj.pregunta;
    questionDiv.appendChild(questionTitle);

    preguntaObj.opciones.forEach((opcion) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${index}`;
      radio.value = opcion;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(opcion));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    surveyContainer.appendChild(questionDiv);
  });
};

// Inicializa la encuesta y agrega preguntas
const encuesta = crearEncuesta("Encuesta de Opinión");
agregarPregunta(encuesta, "¿Qué lenguaje de programación te gusta más?", ["Python", "JavaScript", "C++"]);
agregarPregunta(encuesta, "¿Cuántas horas programas al día?", ["3", "6", "9"]);
agregarPregunta(encuesta, "¿Qué sistema operativo prefieres?", ["Windows", "Linux", "MacOS"]);
agregarPregunta(encuesta, "¿Cuál es tu editor de código favorito?", ["VS Code", "Sublime Text", "Atom"]);
agregarPregunta(encuesta, "¿Prefieres trabajar solo o en equipo?", ["Solo", "En equipo"]);
agregarPregunta(encuesta,"¿Qué tecnología móvil usas?", ["Android", "iOS"]);
agregarPregunta(encuesta, "¿Cuánto tiempo dedicas al aprendizaje de nuevas tecnologías?", ["Menos de 1 hora", "1-3 horas", "Más de 3 horas"]);
agregarPregunta(encuesta, "¿Cuál es tu base de datos preferida?", ["MySQL", "MongoDB", "PostgreSQL"]);

renderizarEncuesta(encuesta);

// Maneja los eventos de botones
const showResultsButton = document.getElementById("show-results");
const resetSurveyButton = document.getElementById("reset-survey");

showResultsButton.addEventListener("click", () => {
  encuesta.preguntas.forEach((preguntaObj, index) => {
    const selectedOption = document.querySelector(`input[name=\"question-${index}\"]:checked`);
    if (selectedOption) {
      votar(encuesta, preguntaObj.pregunta, selectedOption.value);
    }
  });

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "<h2>Resultados</h2>";
  const resultados = encuesta.resultados;
  Object.entries(resultados).forEach(([pregunta, opciones]) => {
    const preguntaDiv = document.createElement("div");
    preguntaDiv.innerHTML = `<h3>${pregunta}</h3>`;
    Object.entries(opciones).forEach(([opcion, votos]) => {
      const resultado = document.createElement("p");
      resultado.textContent = `${opcion}: ${votos} votos`;
      preguntaDiv.appendChild(resultado);
    });
    resultsContainer.appendChild(preguntaDiv);
  });

  // Desmarcar todas las opciones seleccionadas después de mostrar resultados.
  encuesta.preguntas.forEach((_, index) => {
    const radios = document.querySelectorAll(`input[name=\"question-${index}\"]`);
    radios.forEach(radio => (radio.checked = false));
  });
});

resetSurveyButton.addEventListener("click", () => {
  reiniciarEncuesta(encuesta);
  document.getElementById("results").innerHTML = "";
  renderizarEncuesta(encuesta);
});