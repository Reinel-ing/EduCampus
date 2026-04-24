import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const actividades = [
  { icon:'👤', texto:'Nuevo usuario registrado: Laura Gómez',      tiempo:'Hace 5 min',   color:'#e0e7ff' },
  { icon:'📚', texto:'Curso "Programación Web" actualizado',        tiempo:'Hace 20 min',  color:'#dcfce7' },
  { icon:'📝', texto:'Calificaciones subidas por Jose Castro',      tiempo:'Hace 1 hora',  color:'#fef9c3' },
  { icon:'🎓', texto:'Andrés Torres se inscribió a Base de Datos',  tiempo:'Hace 2 horas', color:'#fce7f3' },
  { icon:'⚙️', texto:'Configuración del sistema actualizada',       tiempo:'Hace 3 horas', color:'#f1f5f9' },
]

const cursosInit = [
  { nombre:'Programación Web',      docente:'María López', progreso:75 },
  { nombre:'Matemáticas Avanzadas', docente:'Jose Castro', progreso:60 },
  { nombre:'Base de Datos',         docente:'Jose Castro', progreso:90 },
  { nombre:'Diseño UX/UI',          docente:'María López', progreso:45 },
]

function AdminDashboard() {
  const navigate = useNavigate()
  const [cursos]  = useState(cursosInit)
  const nombre    = localStorage.getItem('nombre') || 'Administrador'

  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Panel de Administración</h1>
          <div style={styles.topbarUser}>👤 {nombre}</div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Bienvenido al Panel de Administración</h2>
          <hr style={styles.divider} />

          {/* STATS */}
          <div style={styles.statsGrid}>
            {[
              { icon:'👥', label:'TOTAL USUARIOS',  val:15,  path:'/usuarios' },
              { icon:'📚', label:'CURSOS ACTIVOS',  val:7,   path:'/cursos' },
              { icon:'👨‍🏫',label:'DOCENTES',         val:7,   path:'/usuarios' },
              { icon:'🎓', label:'ESTUDIANTES',      val:8,   path:'/usuarios' },
            ].map((s,i) => (
              <div key={i} style={{ ...styles.statCard, cursor:'pointer' }} onClick={() => navigate(s.path)}>
                <div style={styles.statIcon}>{s.icon}</div>
                <p style={styles.statLabel}>{s.label}</p>
                <p style={styles.statValue}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* ACCESOS RÁPIDOS */}
          <div style={styles.quickGrid}>
            {[
              { icon:'👥', label:'Gestionar Usuarios',  path:'/usuarios' },
              { icon:'📚', label:'Gestionar Cursos',    path:'/cursos' },
              { icon:'📋', label:'Ver Matrículas',      path:'/matriculas' },
              { icon:'📊', label:'Ver Reportes',        path:'/reportes' },
              { icon:'⚙️', label:'Configuración',       path:'/configuracion' },
            ].map((q,i) => (
              <button key={i} style={styles.quickBtn} onClick={() => navigate(q.path)}>
                <span style={{ fontSize:22 }}>{q.icon}</span>
                <span style={{ fontSize:13, fontWeight:500 }}>{q.label}</span>
              </button>
            ))}
          </div>

          <div style={styles.row}>
            {/* ACTIVIDAD */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>📋 Actividad Reciente</h3>
              <hr style={styles.cardDivider} />
              {actividades.map((a,i) => (
                <div key={i} style={styles.actividadItem}>
                  <div style={{ ...styles.actividadIcon, background:a.color }}>{a.icon}</div>
                  <div>
                    <p style={styles.actividadTexto}>{a.texto}</p>
                    <p style={styles.actividadTiempo}>{a.tiempo}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* PROGRESO */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>📊 Progreso de Cursos</h3>
              <hr style={styles.cardDivider} />
              {cursos.map((c,i) => (
                <div key={i} style={styles.cursoItem}>
                  <div style={styles.cursoHeader}>
                    <span style={styles.cursoNombre}>{c.nombre}</span>
                    <span style={styles.cursoProgreso}>{c.progreso}%</span>
                  </div>
                  <p style={styles.cursoDocente}>👨‍🏫 {c.docente}</p>
                  <div style={styles.barBg}>
                    <div style={{ ...styles.barFill, width:`${c.progreso}%`, background: c.progreso>=80?'#16a34a':c.progreso>=60?'#4f46e5':'#f59e0b' }} />
                  </div>
                </div>
              ))}
              <button style={{ ...styles.btnPrimary, marginTop:16 }} onClick={() => navigate('/reportes')}>
                Ver Reportes Completos →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  layout:        { display:'flex', minHeight:'100vh', background:'#f1f5f9' },
  main:          { marginLeft:'220px', flex:1, display:'flex', flexDirection:'column' },
  topbar:        { background:'linear-gradient(135deg,#4f46e5,#3730a3)', color:'white', padding:'18px 32px', display:'flex', justifyContent:'space-between', alignItems:'center' },
  topbarTitle:   { fontSize:'22px', fontWeight:'600' },
  topbarUser:    { display:'flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.2)', padding:'8px 16px', borderRadius:'20px', fontSize:'14px' },
  content:       { padding:'32px' },
  sectionTitle:  { fontSize:'20px', fontWeight:'700', color:'#1e293b', marginBottom:'8px' },
  divider:       { border:'none', borderTop:'2px solid #4f46e5', marginBottom:'24px' },
  statsGrid:     { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'20px' },
  statCard:      { background:'white', borderRadius:'10px', padding:'24px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', borderTop:'3px solid #4f46e5', transition:'transform 0.15s' },
  statIcon:      { fontSize:'40px', marginBottom:'10px' },
  statLabel:     { fontSize:'11px', color:'#64748b', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'6px' },
  statValue:     { fontSize:'32px', fontWeight:'700', color:'#4f46e5' },
  quickGrid:     { display:'flex', gap:'12px', marginBottom:'24px', flexWrap:'wrap' },
  quickBtn:      { display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', padding:'16px 20px', background:'white', border:'1px solid #e2e8f0', borderRadius:'10px', cursor:'pointer', color:'#1e293b', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' },
  row:           { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' },
  card:          { background:'white', borderRadius:'10px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  cardTitle:     { fontSize:'16px', fontWeight:'700', color:'#1e293b', marginBottom:'8px' },
  cardDivider:   { border:'none', borderTop:'1px solid #e2e8f0', marginBottom:'16px' },
  actividadItem: { display:'flex', alignItems:'flex-start', gap:'12px', marginBottom:'16px' },
  actividadIcon: { width:'36px', height:'36px', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0 },
  actividadTexto:{ fontSize:'13px', color:'#1e293b', marginBottom:'2px' },
  actividadTiempo:{ fontSize:'11px', color:'#94a3b8' },
  cursoItem:     { marginBottom:'20px' },
  cursoHeader:   { display:'flex', justifyContent:'space-between', marginBottom:'2px' },
  cursoNombre:   { fontSize:'13px', fontWeight:'600', color:'#1e293b' },
  cursoProgreso: { fontSize:'13px', fontWeight:'700', color:'#4f46e5' },
  cursoDocente:  { fontSize:'12px', color:'#94a3b8', marginBottom:'6px' },
  barBg:         { height:'8px', background:'#e2e8f0', borderRadius:'4px', overflow:'hidden' },
  barFill:       { height:'100%', borderRadius:'4px', transition:'width 0.3s' },
  btnPrimary:    { padding:'10px 20px', background:'#4f46e5', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px' },
}

export default AdminDashboard