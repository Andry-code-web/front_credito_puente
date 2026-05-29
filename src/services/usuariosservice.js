import { apiFetch } from './api';

const BASE_PATH = '/users';

export async function getUsuarios() {
  return await apiFetch(BASE_PATH, { method: 'GET' });
}

export async function getUsuario(id) {
  return await apiFetch(`${BASE_PATH}/${id}`, { method: 'GET' });
}

export async function createUsuario(data) {
  return await apiFetch(BASE_PATH, {
    method: 'POST',
    body: data,
  });
}

export async function updateUsuario(id, data) {
  return await apiFetch(`${BASE_PATH}/${id}`, {
    method: 'PUT',
    body: data,
  });
}

export async function deleteUsuario(id) {
  return await apiFetch(`${BASE_PATH}/${id}`, {
    method: 'DELETE',
  });
}
