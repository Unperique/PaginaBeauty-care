document.addEventListener('DOMContentLoaded', () => {
    cargarServicios();
    cargarProductos();

    // Escuchar eventos en tiempo real
    window.addEventListener('actualizarVista', () => {
        cargarServicios();
        cargarProductos();
    });
});

function cargarServicios() {
    const serviciosList = document.getElementById('serviciosList');
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    serviciosList.innerHTML = servicios.map(s => `
        <div class="bg-white p-4 rounded-lg shadow">
            <img src="${s.imagen}" alt="${s.nombre}" class="w-full h-32 object-cover mb-2 rounded">
            <h3 class="font-bold">${s.nombre}</h3>
            <p>${s.descripcion}</p>
            <p class="text-pink-600 font-bold">$${s.precio}</p>
        </div>
    `).join('');
}

function cargarProductos() {
    const productosList = document.getElementById('productosList');
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    productosList.innerHTML = productos.map(p => `
        <div class="bg-white p-4 rounded-lg shadow">
            <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-32 object-cover mb-2 rounded">
            <h3 class="font-bold">${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p class="text-pink-600 font-bold">$${p.precio}</p>
        </div>
    `).join('');
}
