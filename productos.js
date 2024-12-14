document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    window.addEventListener('actualizarVista', cargarProductos);
    
    // Asociar el botón de guardar con la función correspondiente
    document.getElementById('saveButton').onclick = guardarProducto;
});

function mostrarFormularioProducto() {
    // Reiniciar el formulario
    document.getElementById('itemForm').reset();
    document.getElementById('itemType').value = 'producto';
    document.getElementById('modalTitle').textContent = 'Agregar Producto';
    document.getElementById('modal').classList.remove('hidden');
}


function cargarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const productosList = document.getElementById('productosList');
    productosList.innerHTML = '';

    productos.forEach(producto => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('p-2', 'border', 'mb-2');
        itemDiv.innerHTML = `
            <div>
                <img src="${producto.imagen}" class="w-16 h-16 object-cover rounded mr-4">
                <strong>${producto.nombre}</strong> - $${producto.precio}<br>
                <small>${producto.descripcion}</small>
            </div>
            <button onclick="editarProducto(${producto.id})" class="bg-blue-500 px-2 py-1 rounded">Editar</button>
            <button onclick="eliminarProducto(${producto.id})" class="bg-red-500 px-2 py-1 rounded">Eliminar</button>
        `;
        productosList.appendChild(itemDiv);
    });
}

function mostrarFormularioProducto() {
    document.getElementById('itemForm').reset();
    document.getElementById('itemType').value = 'producto';
    document.getElementById('modalTitle').textContent = 'Agregar Producto';
    document.getElementById('modal').classList.remove('hidden');
}

function editarProducto(id) {
    const productos = JSON.parse(localStorage.getItem('productos'));
    const producto = productos.find(p => p.id === id);
    
    document.getElementById('itemId').value = producto.id;
    document.getElementById('itemName').value = producto.nombre;
    document.getElementById('itemDescription').value = producto.descripcion;
    document.getElementById('itemPrice').value = producto.precio;
    document.getElementById('itemImageData').value = producto.imagen;
    document.getElementById('modalTitle').textContent = 'Editar Producto';
    document.getElementById('modal').classList.remove('hidden');
}

function guardarProducto() {
    const id = document.getElementById('itemId').value || Date.now();
    const nombre = document.getElementById('itemName').value;
    const descripcion = document.getElementById('itemDescription').value;
    const precio = document.getElementById('itemPrice').value;
    const imagen = document.getElementById('itemImageData').value;

    const producto = { id: parseInt(id), nombre, descripcion, precio, imagen };
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    const index = productos.findIndex(p => p.id === parseInt(id));

    if (index >= 0) productos[index] = producto; // Editar
    else productos.push(producto); // Agregar

    localStorage.setItem('productos', JSON.stringify(productos));
    cerrarModal();
    emitirActualizacion();
}

function eliminarProducto(id) {
    let productos = JSON.parse(localStorage.getItem('productos'));
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem('productos', JSON.stringify(productos));
    emitirActualizacion();
}

function cerrarModal() {
    document.getElementById('modal').classList.add('hidden');
}
