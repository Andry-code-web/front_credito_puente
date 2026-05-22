const BASE_URL = 'http://localhost:3000';

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
