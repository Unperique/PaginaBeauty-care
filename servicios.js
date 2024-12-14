document.addEventListener('DOMContentLoaded', () => {
    cargarServicios();
    window.addEventListener('actualizarVista', cargarServicios);
    
    document.getElementById('saveButton').onclick = guardarServicio;
});

function mostrarFormularioServicio() {
    // Reiniciar el formulario
    document.getElementById('itemForm').reset();
    document.getElementById('itemType').value = 'servicio';
    document.getElementById('modalTitle').textContent = 'Agregar Servicio';
    document.getElementById('modal').classList.remove('hidden');
}


function cargarServicios() {
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const serviciosList = document.getElementById('serviciosList');
    serviciosList.innerHTML = '';

    servicios.forEach(servicio => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('p-2', 'border', 'mb-2');
        itemDiv.innerHTML = `
            <div>
                <img src="${servicio.imagen}" class="w-16 h-16 object-cover rounded mr-4">
                <strong>${servicio.nombre}</strong> - $${servicio.precio}<br>
                <small>${servicio.descripcion}</small>
            </div>
            <button onclick="editarServicio(${servicio.id})" class="bg-blue-500 px-2 py-1 rounded">Editar</button>
            <button onclick="eliminarServicio(${servicio.id})" class="bg-red-500 px-2 py-1 rounded">Eliminar</button>
        `;
        serviciosList.appendChild(itemDiv);
    });
}

function editarServicio(id) {
    const servicios = JSON.parse(localStorage.getItem('servicios'));
    const servicio = servicios.find(s => s.id === id);

    document.getElementById('itemId').value = servicio.id;
    document.getElementById('itemName').value = servicio.nombre;
    document.getElementById('itemDescription').value = servicio.descripcion;
    document.getElementById('itemPrice').value = servicio.precio;
    document.getElementById('itemImageData').value = servicio.imagen;
    document.getElementById('modalTitle').textContent = 'Editar Servicio';
    document.getElementById('modal').classList.remove('hidden');
}

function guardarServicio() {
    const id = document.getElementById('itemId').value || Date.now();
    const nombre = document.getElementById('itemName').value;
    const descripcion = document.getElementById('itemDescription').value;
    const precio = document.getElementById('itemPrice').value;
    const imagen = document.getElementById('itemImageData').value;

    const servicio = { id: parseInt(id), nombre, descripcion, precio, imagen };
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const index = servicios.findIndex(s => s.id === parseInt(id));

    if (index >= 0) servicios[index] = servicio;
    else servicios.push(servicio);

    localStorage.setItem('servicios', JSON.stringify(servicios));
    cerrarModal();
    emitirActualizacion();
}
