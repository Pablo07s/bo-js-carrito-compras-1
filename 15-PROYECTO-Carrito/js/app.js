// VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

// CARGA DE EVENTOS

function cargarEventListeners() {
    // agregar un curso por medio del boton
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar un curso por medio del boton
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; // Resetea el array
        limpiarHtml(); // Limpiamos html
    });
    
}

// FUNCIONES

// Agregar un curso al carrito
function agregarCurso(e) {

    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const contenido = e.target.parentElement.parentElement;
        obtenerDatosCurso(contenido);
    }
}

// Eliminar un curso
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        const actualCurso = articulosCarrito.find(curso => curso.id === cursoId);

        if (actualCurso.cantidad > 1) {
            actualCurso.cantidad--;
        } else {
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        }
        PintarCarritoHtml();
    }
}

// OBTENER CONTENIDO DEL CARD

function obtenerDatosCurso(curso) {
    let imagen = curso.querySelector('img').src;
    let titulo = curso.querySelector('h4').textContent;
    let precio = curso.querySelector('.precio span').textContent;
    let id = curso.querySelector('a').getAttribute('data-id');
    let cantidad = 1;
    //crear un objeto a partir de la informacion del curso
    const cursoActual = {
        imagen,
        titulo,
        precio,
        id,
        cantidad
    }

    // COMPROBAR QUE EL CURSO A AGREGAR NO EXISTA EN EL CARRITO 
    const existe = articulosCarrito.some(curso => curso.id === cursoActual.id);
    
    if (existe) {
        // Actualizamos la cantidad del curso existente
        const cursosActuales = articulosCarrito.map(curso => {
            if (curso.id === cursoActual.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });

        articulosCarrito = [...cursosActuales]
    } else {
        // Agregamos el nuevo curso
        articulosCarrito = [...articulosCarrito, cursoActual];
    }

    PintarCarritoHtml();
}

// CONSTRUCCION HTML EN EL CARRITO

function PintarCarritoHtml() {
    // limpiar el HTML carrito
    limpiarHtml();

    articulosCarrito.forEach(curso => {
        const fila = document.createElement('tr');
        let {imagen, titulo, precio, cantidad, id} = curso
        // console.log(curso);
        fila.innerHTML = `
            <td> <img src="${imagen}" width="100"> </td>
            <td> ${titulo}</td>
            <td> <b>${precio} </b> </td>
            <td> ${cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> x </a> </td>
        `;

        contenedorCarrito.appendChild(fila);
    });
}

// LIMPIAR CARRITO HTML

function limpiarHtml() {
    // Manera lenta
    // contenedorCarrito.innerHTML = '';

    // Manera optimizada
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
