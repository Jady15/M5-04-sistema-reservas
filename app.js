const mesasDisponibles = 5;  // Número de mesas disponibles para reservar

const reservationForm = document.getElementById('reservation-form');
const resultContainer = document.getElementById('result-container');

// Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (mesasSolicitadas <= mesasDisponibles) {
            resolve(`Mesas disponibles para ${mesasSolicitadas} mesa(s).`);
        } else {
            reject(`No hay suficientes mesas disponibles. Sólo hay ${mesasDisponibles} mesas.`);
        }
    }, 2000);  // Simula un retraso en la verificación (2 segundos)
  });
}

// Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const exito = Math.random() > 0.3;
        if (exito) {
            resolve(`Correo de confirmación enviado a ${nombreCliente}.`);
        } else {
            reject(`Error al enviar el correo de confirmación a ${nombreCliente}.`);
        }
    }, 1500);  // Simula el envío de un correo (1.5 segundos)
  });
}

// Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
    resultContainer.innerHTML = '<p class="info">Verificando disponibilidad de mesas...</p>';
    try {
        const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
        resultContainer.innerHTML = `<p class="success">${disponibilidad}</p>`;

        resultContainer.innerHTML += '<p class="info">Enviando correo de confirmación...</p>';
        const confirmacion = await enviarConfirmacionReserva(nombreCliente);
        resultContainer.innerHTML = `<p class="success">${disponibilidad}</p><p class="success">${confirmacion}</p>`;
    } catch (error) {
        resultContainer.innerHTML = `<p class="error">Error: ${error}</p>`;
    }
}

// Manejar el evento del formulario
reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombreCliente = document.getElementById('nombreCliente').value;
    const mesasSolicitadas = parseInt(document.getElementById('mesasSolicitadas').value);
    hacerReserva(nombreCliente, mesasSolicitadas);
});