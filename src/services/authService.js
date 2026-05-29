import { apiFetch } from './api'

const TOKEN_KEY = 'authToken'
const USER_KEY = 'authUser'

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getAuthUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function setSession({ token, user } = {}) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  if (user !== undefined) localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

const LOGIN_PATH = '/auth/login'

export async function login({ usuario, password }) {
  const data = await apiFetch(LOGIN_PATH, {
    method: 'POST',
    auth: false,
    body: { usuario, password },
  })

  const token = data?.token || data?.accessToken || data?.jwt || data?.data?.token
  const user = data?.user || data?.usuario || data?.data?.user || null

  if (!token) {
    throw new Error('Respuesta de login sin token')
  }

  setSession({ token, user })
  return { token, user, raw: data }
}

