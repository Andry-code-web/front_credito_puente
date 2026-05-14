import { useState, useEffect } from 'react'
import AsesorDashboard from './pages/asesorDashboard.jsx'
import Simulador from './pages/simulador.jsx'
import Clientes from './pages/clientes.jsx'
import Inversionistas from './pages/inversionistas.jsx'

const VALID_PAGES = ['asesor', 'simulador', 'clientes', 'inversionistas']

function getInitialPage() {
  const hash = window.location.hash.replace('#', '')
  if (VALID_PAGES.includes(hash)) return hash
  const saved = localStorage.getItem('currentPage')
  if (VALID_PAGES.includes(saved)) return saved
  return 'asesor'
}

function App() {

  const [page, setPage] = useState(getInitialPage)

  const handlePage = (newPage) => {
    setPage(newPage)
    localStorage.setItem('currentPage', newPage)
    window.location.hash = newPage
  }

  // Sincroniza el hash inicial sin disparar navegación
  useEffect(() => {
    window.location.hash = page
  }, [])

  return (
    <>
      {page === 'asesor' && <AsesorDashboard handlePage={handlePage} page={page} />}
      {page === 'simulador' && <Simulador handlePage={handlePage} page={page} />}
      {page === 'clientes' && <Clientes handlePage={handlePage} page={page} />}
      {page === 'inversionistas' && <Inversionistas handlePage={handlePage} page={page} />}
    </>
  )
}

export default App
