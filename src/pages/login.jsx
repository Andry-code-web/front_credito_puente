import { useMemo, useState } from 'react'
import { RiLockPasswordLine, RiUserLine } from '@remixicon/react'
import { login } from '../services/authService'

export default function Login({ onLoggedIn }) {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const canSubmit = useMemo(() => {
    return usuario.trim().length > 0 && password.trim().length > 0 && !loading
  }, [usuario, password, loading])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError(null)
    try {
      await login({ usuario: usuario.trim(), password })
      onLoggedIn?.()
    } catch (err) {
      setError(err?.message || 'No se pudo iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-screen h-screen bg-white flex">
      <div className="hidden md:flex w-1/2 h-full bg-[#EDFCF5] items-center justify-center px-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold text-[#0DA071]">Crédito Puente</h1>
          <p className="mt-4 text-gray-600">
            Ingresa con tu usuario y contraseña para acceder al sistema.
          </p>
          <div className="mt-10 p-6 bg-white rounded-2xl border border-[#0DA071]/20">
            <p className="text-sm text-gray-600">
              Si el backend usa otra ruta de login, ajusta <code className="font-mono">LOGIN_PATH</code> en{' '}
              <code className="font-mono">src/services/authService.js</code>.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900">Iniciar sesión</h2>
          <p className="text-sm text-gray-500 mt-1">Accede con tus credenciales.</p>

          {error && (
            <div className="mt-6 px-4 py-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Usuario</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <RiUserLine size={18} />
                </span>
                <input
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0DA071]/30 focus:border-[#0DA071]"
                  placeholder="tu usuario"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <RiLockPasswordLine size={18} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0DA071]/30 focus:border-[#0DA071]"
                  placeholder="********"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full h-11 rounded-xl font-semibold text-white transition-all duration-200 ${
                canSubmit ? 'bg-[#0DA071] hover:bg-[#0b8a61]' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {loading ? 'Ingresando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

