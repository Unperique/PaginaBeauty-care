document.addEventListener('DOMContentLoaded', () => {
    // Inicializar pestaña activa
    switchTab('reservas');

    // Cargar scripts específicos para cada pestaña
    loadScript('historialReservas.js');
    loadScript('productos.js');
    loadScript('servicios.js');
});

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(`${tabName}Content`).classList.remove('hidden');

    if (tabName === 'productos') loadScript('productos.js');
    if (tabName === 'servicios') loadScript('servicios.js');
    if (tabName === 'reservas') loadScript('historialReservas.js');
}

// Función para cargar scripts dinámicamente
function loadScript(scriptName) {
    const script = document.createElement('script');
    script.src = scriptName;
    script.async = true;
    document.body.appendChild(script);
}


// Emitir evento para actualización en tiempo real
function emitirActualizacion() {
    window.dispatchEvent(new Event('actualizarVista'));
}
