# Proyecto 2 - Sistema de Encuestas en JavaScript

## Descripción del Proyecto
El **Sistema de Encuestas** es una aplicación interactiva que permite a los usuarios crear, votar y visualizar resultados de encuestas. Implementa dos paradigmas de programación: **Programación Orientada a Objetos (POO)** y **Programación Funcional (PF)**, demostrando cómo ambos enfoques pueden cumplir los mismos objetivos con diferentes estilos.

---

## 🔧 **Funcionalidades del Sistema**

1. **Crear encuestas con opciones de respuesta.**
   - Permite agregar preguntas y sus opciones al sistema.

2. **Permitir a los usuarios votar en las encuestas.**
   - Los usuarios pueden seleccionar una opción por cada pregunta.

3. **Mostrar los resultados de las encuestas.**
   - Muestra en tiempo real los votos registrados para cada opción.

4. **Reiniciar las encuestas.**
   - Restablece todos los votos a cero y desmarca las opciones seleccionadas.

5. **Almacenar datos en estructuras adecuadas.**
   - Utiliza arrays para preguntas y objetos para resultados.

6. **Soporte para al menos 8 preguntas.**
   - Cada encuesta incluye al menos 8 preguntas con opciones predefinidas.

---

## 📌 **Dónde se aplican los conceptos principales**

| **Concepto**                  | **Descripción**                                                     | **Dónde se aplica en el sistema**                           |
|--------------------------------|---------------------------------------------------------------------|------------------------------------------------------------|
| Operaciones aritméticas        | Incremento de votos por cada opción seleccionada.                  | Método/función `votar`.                                    |
| Operadores de comparación      | Validación de preguntas y opciones antes de registrar votos.        | Método/función `votar` y control de selección de opciones. |
| Control de flujo               | Condiciones y bucles para iterar sobre preguntas y opciones.        | Renderizado, registro de votos y reinicio de encuestas.    |
| Manipulación de estructuras de datos | Almacenamiento de preguntas y resultados en arrays y objetos.      | Sección de inicialización y votación.                      |

---

## 🛠 **Cómo Usar**

1. **Clona este repositorio:**
   ```bash
   git clone <url_del_repositorio>
   cd proyecto-encuestas
Sistema-de-votaci-n-con-Javascript
