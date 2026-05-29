import { useState, useEffect } from 'react'
import AsesorDashboard from './pages/asesorDashboard.jsx'
import Simulador from './pages/simulador.jsx'
import Clientes from './pages/clientes.jsx'
import Inversionistas from './pages/inversionistas.jsx'
import Usuarios from './pages/usuarios.jsx'
import Login from './pages/login.jsx'
import { clearSession, getAuthToken } from './services/authService.js'

const VALID_PAGES = ['login', 'asesor', 'simulador', 'clientes', 'inversionistas', 'usuarios']

function getInitialPage() {
  const token = getAuthToken()

  if (!token) return 'login'

  const hash = window.location.hash.replace('#', '')

  if (VALID_PAGES.includes(hash) && hash !== 'login') {
    return hash
  }

  return 'asesor'
}

function App() {

  const [page, setPage] = useState(getInitialPage)
  const [isAuthed, setIsAuthed] = useState(() => Boolean(getAuthToken()))

  const handlePage = (newPage) => {
    if (!isAuthed && newPage !== 'login') {
      localStorage.setItem('afterLoginPage', newPage)
      setPage('login')
      window.location.hash = 'login'
      return
    }
    setPage(newPage)
    localStorage.setItem('currentPage', newPage)
    window.location.hash = newPage
  }

  // Sincroniza el hash inicial sin disparar navegación
  useEffect(() => {
    const token = getAuthToken()

    if (!token) {
      setIsAuthed(false)
      setPage('login')
      window.location.hash = 'login'
      return
    }

    setIsAuthed(true)

    const hash = window.location.hash.replace('#', '')

    if (VALID_PAGES.includes(hash) && hash !== 'login') {
      setPage(hash)
    } else {
      setPage('asesor')
      window.location.hash = 'asesor'
    }
  }, [])

  const handleLoggedIn = () => {
    setIsAuthed(true)

    setPage('asesor')

    localStorage.setItem('currentPage', 'asesor')

    window.location.hash = 'asesor'
  }

  const handleLogout = () => {
    clearSession()
    setIsAuthed(false)
    localStorage.removeItem('currentPage')
    localStorage.removeItem('afterLoginPage')
    setPage('login')
    window.location.hash = 'login'
  }

  if (!isAuthed) {
    return <Login onLoggedIn={handleLoggedIn} />
  }

  return (
    <>
      {page === 'asesor' && <AsesorDashboard handlePage={handlePage} page={page} onLogout={handleLogout} />}
      {page === 'simulador' && <Simulador handlePage={handlePage} page={page} onLogout={handleLogout} />}
      {page === 'clientes' && <Clientes handlePage={handlePage} page={page} onLogout={handleLogout} />}
      {page === 'inversionistas' && <Inversionistas handlePage={handlePage} page={page} onLogout={handleLogout} />}
      {page === 'usuarios' && <Usuarios handlePage={handlePage} page={page} onLogout={handleLogout} />}
    </>
  )
}

export default App
