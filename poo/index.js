// Clase Encuesta: encapsula los datos y comportamientos relacionados con una encuesta.
class Encuesta {
  constructor(titulo) {
    this.titulo = titulo; // Título de la encuesta.
    this.preguntas = []; // Lista de preguntas.
    this.resultados = {}; // Objeto para almacenar los resultados de las respuestas.
  }

  // Método para agregar una pregunta con sus opciones de respuesta.
  agregarPregunta(pregunta, opciones) {
    this.preguntas.push({ pregunta, opciones }); // Agrega la pregunta y sus opciones a la lista.
    this.resultados[pregunta] = opciones.reduce((acc, opcion) => {
      acc[opcion] = 0; // Inicializa los votos de cada opción en 0.
      return acc;
    }, {});
  }

  // Método para registrar un voto para una opción de una pregunta específica.
  votar(pregunta, opcion) {
    if (this.resultados[pregunta] && this.resultados[pregunta][opcion] !== undefined) {
      this.resultados[pregunta][opcion]++;
    } else {
      console.error("Pregunta u opción inválida.");
    }
  }

  // Método para reiniciar los resultados de todas las preguntas a 0.
  reiniciar() {
    Object.keys(this.resultados).forEach(pregunta => {
      Object.keys(this.resultados[pregunta]).forEach(opcion => {
        this.resultados[pregunta][opcion] = 0;
      });
    });
  }

  // Método para mostrar los resultados de la encuesta.
  mostrarResultados() {
    return this.resultados;
  }
}

// Crear una instancia de la clase Encuesta
const encuesta = new Encuesta("Encuesta de Opinión");
encuesta.agregarPregunta("¿Qué lenguaje de programación te gusta más?", ["Python", "JavaScript", "C++"]);
encuesta.agregarPregunta("¿Cuántas horas programas al día?", ["3", "6", "9"]);
encuesta.agregarPregunta("¿Qué sistema operativo prefieres?", ["Windows", "Linux", "MacOS"]);
encuesta.agregarPregunta("¿Cuál es tu editor de código favorito?", ["VS Code", "Sublime Text", "Atom"]);
encuesta.agregarPregunta("¿Prefieres trabajar solo o en equipo?", ["Solo", "En equipo"]);
encuesta.agregarPregunta("¿Qué tecnología móvil usas?", ["Android", "iOS"]);
encuesta.agregarPregunta("¿Cuánto tiempo dedicas al aprendizaje de nuevas tecnologías?", ["Menos de 1 hora", "1-3 horas", "Más de 3 horas"]);
encuesta.agregarPregunta("¿Cuál es tu base de datos preferida?", ["MySQL", "MongoDB", "PostgreSQL"]);

// Renderizar las preguntas de la encuesta en la interfaz.
const surveyContainer = document.getElementById("survey");
const renderEncuesta = () => {
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
renderEncuesta();

// Manejar eventos de los botones para mostrar resultados y reiniciar la encuesta.
const showResultsButton = document.getElementById("show-results");
const resetSurveyButton = document.getElementById("reset-survey");

showResultsButton.addEventListener("click", () => {
  encuesta.preguntas.forEach((preguntaObj, index) => {
    const selectedOption = document.querySelector(
      `input[name=\"question-${index}\"]:checked`
    );
    if (selectedOption) {
      encuesta.votar(preguntaObj.pregunta, selectedOption.value);
    }
  });

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "<h2>Resultados</h2>";
  const resultados = encuesta.mostrarResultados();
  for (let [pregunta, opciones] of Object.entries(resultados)) {
    const preguntaDiv = document.createElement("div");
    preguntaDiv.innerHTML = `<h3>${pregunta}</h3>`;
    for (let [opcion, votos] of Object.entries(opciones)) {
      const resultado = document.createElement("p");
      resultado.textContent = `${opcion}: ${votos} votos`;
      preguntaDiv.appendChild(resultado);
    }
    resultsContainer.appendChild(preguntaDiv);
  }

  // Desmarcar todas las opciones seleccionadas después de mostrar resultados.
  encuesta.preguntas.forEach((_, index) => {
    const radios = document.querySelectorAll(`input[name=\"question-${index}\"]`);
    radios.forEach(radio => (radio.checked = false));
  });
});

resetSurveyButton.addEventListener("click", () => {
  encuesta.reiniciar();
  document.getElementById("results").innerHTML = "";
  renderEncuesta();
});