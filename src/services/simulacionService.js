const BASE_URL = 'https://back-credito-puente-131dfbfcf40e.herokuapp.com/';

/**
 * Realiza la simulación de un crédito puente
 * @param {Object} data - { monto, interes, meses, fecha_inicio }
 * @returns {Promise<Object>}
 */
export async function simularCredito(data) {
    const res = await fetch(`${BASE_URL}/simulacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error en la simulación');
    }
    return res.json();
}

/**
 * Crea un préstamo real en el sistema
 * @param {Object} data - Datos del préstamo
 * @returns {Promise<Object>}
 */
export async function crearPrestamo(data) {
    const res = await fetch(`${BASE_URL}/prestamos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al crear préstamo');
    }
    return res.json();
}


/* 
* Generar pdf de solicitud de prestamo (simulacion)
* POST /prestamos/pdf-simulacion
*
*/
export async function generarPdfSolicitudPrestamo(data) {
    const res = await fetch(`${BASE_URL}/prestamos/pdf-simulacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al generar el pdf de la solicitud de prestamo');
    return res.blob();
}

