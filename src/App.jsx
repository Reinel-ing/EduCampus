import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import DocenteDashboard from './pages/DocenteDashboard'
import EstudianteDashboard from './pages/EstudianteDashboard'
import Usuarios from './pages/Usuarios'
import Cursos from './pages/Cursos'
import Reportes from './pages/Reportes'
import Configuracion from './pages/Configuracion'
import Matriculas from './pages/Matriculas'
import Asistencia from './pages/Asistencia'
import Horarios from './pages/Horarios'
import Calendario from './pages/Calendario'
import Calificaciones from './pages/Calificaciones'
import MaterialDidactico from './pages/MaterialDidactico'

function PrivateRoute({ children, roles }) {
  const rol = localStorage.getItem('rol')
  if (!rol) return <Navigate to="/" />
  if (roles && !roles.includes(rol)) return <Navigate to="/" />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* ADMIN */}
        <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute roles={['admin']}><Usuarios /></PrivateRoute>} />
        <Route path="/reportes" element={<PrivateRoute roles={['admin']}><Reportes /></PrivateRoute>} />
        <Route path="/configuracion" element={<PrivateRoute roles={['admin']}><Configuracion /></PrivateRoute>} />
        <Route path="/matriculas" element={<PrivateRoute roles={['admin']}><Matriculas /></PrivateRoute>} />

        {/* DOCENTE */}
        <Route path="/docente" element={<PrivateRoute roles={['docente']}><DocenteDashboard /></PrivateRoute>} />
        <Route path="/asistencia" element={<PrivateRoute roles={['docente']}><Asistencia /></PrivateRoute>} />

        {/* COMPARTIDAS */}
        <Route path="/cursos" element={<PrivateRoute roles={['admin','docente','estudiante']}><Cursos /></PrivateRoute>} />
        <Route path="/calificaciones" element={<PrivateRoute roles={['docente','estudiante']}><Calificaciones /></PrivateRoute>} />
        <Route path="/material" element={<PrivateRoute roles={['docente','estudiante']}><MaterialDidactico /></PrivateRoute>} />
        <Route path="/horario" element={<PrivateRoute roles={['docente','estudiante']}><Horarios /></PrivateRoute>} />

        {/* ESTUDIANTE */}
        <Route path="/estudiante" element={<PrivateRoute roles={['estudiante']}><EstudianteDashboard /></PrivateRoute>} />
        <Route path="/calendario" element={<PrivateRoute roles={['estudiante']}><Calendario /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App