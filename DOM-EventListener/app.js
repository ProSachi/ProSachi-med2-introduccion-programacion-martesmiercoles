// 1. Selección de Nodos:
// Guardamos en variables los elementos del DOM con los que vamos a trabajar.
const tareaInput = document.getElementById('tarea-input');
const agregarBtn = document.getElementById('agregar-btn');
const listaTareasUL = document.getElementById('lista-tareas');

// 2. Creación de la Función `crearTarea()`:
// Esta función centraliza la lógica para crear y añadir una nueva tarea.
function crearTarea() {
  // a. Obtenemos el texto del input y quitamos espacios en blanco.
  const textoTarea = tareaInput.value.trim();

  // Si no hay texto, salimos de la función para no añadir tareas vacías.
  if (textoTarea === '') {
    alert('Por favor, ingresa una tarea.');
    return;
  }

  // b. Creamos el elemento <li> principal.
  const nuevaTareaLI = document.createElement('li');

  // c. Creamos el <span> para el texto de la tarea.
  const textoSpan = document.createElement('span');
  textoSpan.innerText = textoTarea; // Usamos innerText para seguridad.

  // d. Creamos el botón de eliminar.
  const btnEliminar = document.createElement('button');
  btnEliminar.innerText = 'Eliminar';
  btnEliminar.classList.add('btn-eliminar'); // Le damos una clase para identificarlo.

  // e. Usamos appendChild para "ensamblar" la tarea:
  // Metemos el span y el botón DENTRO del li.
  nuevaTareaLI.appendChild(textoSpan);
  nuevaTareaLI.appendChild(btnEliminar);

  // f. Usamos appendChild para hacer visible la tarea completa en la lista <ul>.
  listaTareasUL.appendChild(nuevaTareaLI);

  // g. Limpiamos el input para que el usuario pueda escribir una nueva tarea.
  tareaInput.value = '';
}

// 3. Escuchar Eventos para Añadir Tareas:
// Opción 1: Al hacer clic en el botón "Añadir".
agregarBtn.addEventListener('click', crearTarea);

// Opción 2 (Reto): Al presionar la tecla "Enter" en el input.
tareaInput.addEventListener('keyup', function(event) {
  // Verificamos si la tecla presionada fue 'Enter'.
  if (event.key === 'Enter') {
    crearTarea();
  }
});

// 4. Escuchar Eventos para Eliminar y Completar (Delegación de Eventos):
// Añadimos UN SOLO listener al contenedor <ul> para manejar todos los clics internos.
listaTareasUL.addEventListener('click', function(event) {
  const elementoClicado = event.target; // El elemento específico que recibió el clic.

  // a. Lógica para Eliminar:
  // Si el elemento clicado tiene la clase 'btn-eliminar'...
  if (elementoClicado.classList.contains('btn-eliminar')) {
    // ...buscamos su elemento padre (el <li>) y lo eliminamos.
    const tareaParaEliminar = elementoClicado.parentElement;
    tareaParaEliminar.remove();
  }

  // b. Lógica para Completar (Reto):
  // Si el elemento clicado es un <span>...
  if (elementoClicado.tagName === 'SPAN') {
    // ...le aplicamos o quitamos la clase 'completada' a su elemento padre (el <li>).
    const tareaParaCompletar = elementoClicado.parentElement;
    tareaParaCompletar.classList.toggle('completada');
  }
});