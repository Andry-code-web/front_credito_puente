const DEFAULT_API_URL = 'https://back-credito-puente-131dfbfcf40e.herokuapp.com/'

function getApiUrl() {
  return (import.meta?.env?.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '')
}

function getToken() {
  return localStorage.getItem('authToken')
}

async function safeReadJson(res) {
  try {
    return await res.json()
  } catch {
    return null
  }
}

export async function apiFetch(path, { method = 'GET', headers, body, auth = true } = {}) {
  const url = `${getApiUrl()}${path.startsWith('/') ? path : `/${path}`}`

  const finalHeaders = {
    ...(body != null ? { 'Content-Type': 'application/json' } : {}),
    ...(headers || {}),
  }

  if (auth) {
    const token = getToken()
    if (token) finalHeaders.Authorization = `Bearer ${token}`
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body == null ? undefined : JSON.stringify(body),
  })

  if (!res.ok) {
    const data = await safeReadJson(res)
    const msg = data?.message || data?.error || `HTTP ${res.status}`
    const err = new Error(msg)
    err.status = res.status
    err.data = data
    throw err
  }

  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return res.json()
  return res.text()
}

