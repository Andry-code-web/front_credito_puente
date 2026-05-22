const BASE_URL = 'http://localhost:3000/inversores';

/**
 * Obtiene todos los inversores
 * @returns {Promise<Array>}
 */
export async function getInversores() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener inversores');
    return res.json();
}

/**
 * Obtiene un inversor por su ID
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export async function getInversorById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Error al obtener el inversor');
    return res.json();
}

/**
 * Crea un nuevo inversor
 * @param {Object} data - { nombre, dni, celular, correo, direccion }
 * @returns {Promise<Object>}
 */
export async function createInversor(data) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear el inversor');
    return res.json();
}

/**
 * Actualiza un inversor existente
 * @param {string|number} id
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function updateInversor(id, data) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar el inversor');
    return res.json();
}

/**
 * Elimina un inversor por su ID
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteInversor(id) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar el inversor');
}