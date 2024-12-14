document.addEventListener('DOMContentLoaded', () => {
    cargarReservas();
    window.addEventListener('reservaActualizada', cargarReservas);
});

function cargarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const reservasTableBody = document.getElementById('reservasTableBody');
    reservasTableBody.innerHTML = '';

    reservas.forEach(reserva => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reserva.fecha}</td>
            <td>${reserva.cliente}</td>
            <td>${reserva.servicios}</td>
            <td>${reserva.hora}</td>
            <td>
                <select onchange="cambiarEstado(${reserva.id}, this.value)" class="border rounded">
                    <option value="Pendiente" ${reserva.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="Confirmado" ${reserva.estado === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
                    <option value="Cancelado" ${reserva.estado === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                </select>
            </td>
            <td>
                <button onclick="confirmarViaWhatsApp('${reserva.telefono}', '${reserva.cliente}', '${reserva.fecha}', '${reserva.hora}')" class="bg-green-500 text-white px-2 py-1 rounded">Confirmar vía WhatsApp</button>
            </td>
            <td>
                <button onclick="eliminarReserva(${reserva.id})" class="bg-red-500 text-white px-2 py-1 rounded">X</button>
            </td>
        `;
        reservasTableBody.appendChild(row);
    });
}

function cambiarEstado(id, nuevoEstado) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const index = reservas.findIndex(r => r.id === id);
    if (index !== -1) {
        reservas[index].estado = nuevoEstado;
        localStorage.setItem('reservas', JSON.stringify(reservas));
        window.dispatchEvent(new Event('reservaActualizada'));
    }
}

function confirmarViaWhatsApp(telefono, nombreCliente, fecha, hora) {
    const mensaje = `Hola ${nombreCliente}, tu reserva para el ${fecha} a las ${hora} ha sido confirmada. ¡Te esperamos!`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function eliminarReserva(id) {
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas = reservas.filter(r => r.id !== id);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    window.dispatchEvent(new Event('reservaActualizada'));
}
