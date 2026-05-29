const BASE_URL = 'https://back-credito-puente-131dfbfcf40e.herokuapp.com/clientes';

/**
 * Obtiene todos los clientes
 * @returns {Promise<Array>}
 */
export async function getClientes() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener clientes');
    return res.json();
}

/**
 * Obtiene un cliente por su ID
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export async function getClienteById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Error al obtener el cliente');
    return res.json();
}

/**
 * Crea un nuevo cliente
 * @param {Object} data - { nombre, dni, celular, correo, direccion }
 * @returns {Promise<Object>}
 */
export async function createCliente(data) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear el cliente');
    return res.json();
}

/**
 * Actualiza un cliente existente
 * @param {string|number} id
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function updateCliente(id, data) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar el cliente');
    return res.json();
}

/**
 * Elimina un cliente por su ID
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteCliente(id) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar el cliente');
}
