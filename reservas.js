document.addEventListener('DOMContentLoaded', () => {
    flatpickr("#fechaReserva", { dateFormat: "Y-m-d", minDate: "today" });

    const horaReservaSelect = document.getElementById('horaReserva');
    for (let i = 9; i <= 18; i++) {
        const option = document.createElement('option');
        option.value = `${i}:00`;
        option.textContent = `${i}:00`;
        horaReservaSelect.appendChild(option);
    }

    document.getElementById('formReserva').addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreCliente = document.getElementById('nombreCliente').value;
        const telefonoCliente = document.getElementById('telefonoCliente').value;
        const fechaReserva = document.getElementById('fechaReserva').value;
        const horaReserva = document.getElementById('horaReserva').value;

        // Capturar los servicios seleccionados
        const serviciosSeleccionados = Array.from(document.querySelectorAll('input[name="servicios"]:checked'))
            .map(checkbox => checkbox.value);

        if (serviciosSeleccionados.length === 0) {
            alert('Por favor selecciona al menos un servicio.');
            return;
        }

        const nuevaReserva = {
            id: Date.now(),
            fecha: fechaReserva,
            cliente: nombreCliente,
            telefono: telefonoCliente,
            servicios: serviciosSeleccionados.join(", "),
            hora: horaReserva,
            estado: "Pendiente"
        };

        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(nuevaReserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));

        alert('Reserva realizada.');
        window.dispatchEvent(new Event('reservaActualizada'));
        document.getElementById('formReserva').reset();
    });
});
