import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const rol       = localStorage.getItem('rol')
  const nombre    = localStorage.getItem('nombre') || 'Usuario'

  const menus = {
    admin: [
      { icon:'🏠', label:'Inicio',              path:'/admin' },
      { icon:'👥', label:'Gestión de Usuarios', path:'/usuarios' },
      { icon:'📚', label:'Gestión de Cursos',   path:'/cursos' },
      { icon:'📋', label:'Matrículas',          path:'/matriculas' },
      { icon:'📊', label:'Reportes',            path:'/reportes' },
      { icon:'⚙️', label:'Configuración',       path:'/configuracion' },
    ],
    docente: [
      { icon:'🏠', label:'Inicio',          path:'/docente' },
      { icon:'📚', label:'Mis Cursos',      path:'/cursos' },
      { icon:'👥', label:'Estudiantes',     path:'/estudiantes' },
      { icon:'📝', label:'Calificaciones',  path:'/calificaciones' },
      { icon:'✔️', label:'Asistencia',      path:'/asistencia' },
      { icon:'📁', label:'Material',        path:'/material' },
      { icon:'🗓️', label:'Horario',         path:'/horario' },
    ],
    estudiante: [
      { icon:'🏠', label:'Inicio',          path:'/estudiante' },
      { icon:'📚', label:'Mis Cursos',      path:'/cursos' },
      { icon:'📝', label:'Mis Notas',       path:'/calificaciones' },
      { icon:'📁', label:'Mis Materiales',  path:'/material' },
      { icon:'🗓️', label:'Horario',         path:'/horario' },
      { icon:'📅', label:'Calendario',      path:'/calendario' },
    ],
  }

  const rolLabel = { admin:'Administrador', docente:'Docente', estudiante:'Estudiante' }
  const items = menus[rol] || []

  return (
    <div style={styles.sidebar}>
      <div style={styles.brand}>
        <div style={styles.logo}>🎓</div>
        <h2 style={styles.brandName}>EDUCAMPUS</h2>
        <p style={styles.brandRol}>{rolLabel[rol]}</p>
      </div>

      <nav style={styles.nav}>
        {items.map((item, i) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              style={{ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div style={styles.footer}>
        <div style={styles.userInfo}>
          <span style={{ fontSize:18 }}>👤</span>
          <span style={{ fontSize:13, color:'#64748b', fontWeight:500 }}>{nombre}</span>
        </div>
        <button
          style={styles.btnLogout}
          onClick={() => { localStorage.clear(); navigate('/') }}
        >
          🚪 Cerrar Sesión
        </button>
      </div>
    </div>
  )
}

const styles = {
  sidebar:      { width:'220px', background:'white', height:'100vh', position:'fixed', display:'flex', flexDirection:'column', boxShadow:'2px 0 8px rgba(0,0,0,0.05)', zIndex:100 },
  brand:        { textAlign:'center', padding:'20px', borderBottom:'1px solid #f1f5f9' },
  logo:         { fontSize:'30px', marginBottom:'6px' },
  brandName:    { fontSize:'14px', fontWeight:'700', color:'#1e293b', margin:'0 0 2px' },
  brandRol:     { fontSize:'12px', color:'#64748b', margin:0 },
  nav:          { padding:'10px', flex:1, display:'flex', flexDirection:'column', gap:'4px', overflowY:'auto' },
  navItem:      { display:'flex', alignItems:'center', gap:'10px', width:'100%', padding:'12px', border:'none', background:'transparent', cursor:'pointer', textAlign:'left', borderRadius:'8px', fontSize:'14px', color:'#64748b' },
  navItemActive:{ background:'linear-gradient(135deg, #4f46e5, #3730a3)', color:'white', fontWeight:'600' },
  footer:       { padding:'10px', borderTop:'1px solid #e2e8f0' },
  userInfo:     { display:'flex', alignItems:'center', gap:'8px', padding:'8px 12px', marginBottom:'8px', background:'#f8fafc', borderRadius:'8px' },
  btnLogout:    { width:'100%', padding:'12px', background:'#ef4444', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontWeight:'500' },
}

export default Sidebar