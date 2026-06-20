import { apiFetch } from './api.js';

/**
 * Obtiene todos los préstamos registrados
 * @returns {Promise<Array>}
 */
export async function getPrestamos() {
    return apiFetch('/prestamos');
}

/**
 * Obtiene un préstamo por ID
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function getPrestamoById(id) {
    return apiFetch(`/prestamos/${id}`);
}

/**
 * Elimina un préstamo por ID
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export async function deletePrestamo(id) {
    return apiFetch(`/prestamos/${id}`, { method: 'DELETE' });
}
