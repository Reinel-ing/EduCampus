import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const datosIni = [
  { estudiante:'Kevin Perea',   asistencia:'✔', curso:'Programación Web' },
  { estudiante:'Laura Gómez',   asistencia:'✔', curso:'Programación Web' },
  { estudiante:'Andrés Torres', asistencia:'✘', curso:'Base de Datos' },
  { estudiante:'María Ruiz',    asistencia:'✔', curso:'Base de Datos' },
  { estudiante:'Carlos Díaz',   asistencia:'✘', curso:'Inteligencia Artificial' },
]

export default function Asistencia() {
  const [lista,   setLista]   = useState(datosIni)
  const [guardado, setGuardado] = useState(false)

  const toggle = (nombre) => {
    setLista(prev => prev.map(a =>
      a.estudiante === nombre
        ? { ...a, asistencia: a.asistencia === '✔' ? '✘' : '✔' }
        : a
    ))
    setGuardado(false)
  }

  const guardar = () => { setGuardado(true); setTimeout(() => setGuardado(false), 2000) }

  const presentes = lista.filter(a => a.asistencia === '✔').length

  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Asistencia</h1>
          <div style={styles.topbarUser}>👤 {localStorage.getItem('nombre') || 'Docente'}</div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Registro de Asistencia</h2>
          <hr style={styles.divider} />

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <p style={styles.statLabel}>TOTAL ESTUDIANTES</p>
              <p style={styles.statValue}>{lista.length}</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>✅</div>
              <p style={styles.statLabel}>PRESENTES</p>
              <p style={{ ...styles.statValue, color:'#16a34a' }}>{presentes}</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>❌</div>
              <p style={styles.statLabel}>AUSENTES</p>
              <p style={{ ...styles.statValue, color:'#ef4444' }}>{lista.length - presentes}</p>
            </div>
          </div>

          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>Lista — {new Date().toLocaleDateString('es-CO',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</h3>
              <button style={styles.btnPrimary} onClick={guardar}>
                {guardado ? '✅ Guardado!' : '💾 Guardar Asistencia'}
              </button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ESTUDIANTE</th>
                  <th style={styles.th}>CURSO</th>
                  <th style={styles.th}>ESTADO</th>
                  <th style={styles.th}>ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((a,i) => (
                  <tr key={i}>
                    <td style={styles.td}>🎓 {a.estudiante}</td>
                    <td style={styles.td}>{a.curso}</td>
                    <td style={styles.td}>
                      <span style={{
                        padding:'4px 14px', borderRadius:'20px', fontSize:'13px', fontWeight:'700',
                        background: a.asistencia==='✔' ? '#dcfce7' : '#fee2e2',
                        color:      a.asistencia==='✔' ? '#16a34a' : '#ef4444',
                      }}>
                        {a.asistencia==='✔' ? 'Presente' : 'Ausente'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => toggle(a.estudiante)}
                        style={{
                          padding:'6px 16px', borderRadius:'6px', border:'none', cursor:'pointer', fontSize:'13px', fontWeight:'600',
                          background: a.asistencia==='✔' ? '#fee2e2' : '#dcfce7',
                          color:      a.asistencia==='✔' ? '#ef4444' : '#16a34a',
                        }}
                      >
                        {a.asistencia==='✔' ? 'Marcar Ausente' : 'Marcar Presente'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  layout:       { display:'flex', minHeight:'100vh', background:'#f1f5f9' },
  main:         { marginLeft:'220px', flex:1, display:'flex', flexDirection:'column' },
  topbar:       { background:'linear-gradient(135deg,#4f46e5,#3730a3)', color:'white', padding:'18px 32px', display:'flex', justifyContent:'space-between', alignItems:'center' },
  topbarTitle:  { fontSize:'22px', fontWeight:'600' },
  topbarUser:   { display:'flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.2)', padding:'8px 16px', borderRadius:'20px', fontSize:'14px' },
  content:      { padding:'32px' },
  sectionTitle: { fontSize:'20px', fontWeight:'700', color:'#1e293b', marginBottom:'8px' },
  divider:      { border:'none', borderTop:'2px solid #4f46e5', marginBottom:'24px' },
  statsGrid:    { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px', marginBottom:'24px' },
  statCard:     { background:'white', borderRadius:'10px', padding:'24px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', borderTop:'3px solid #4f46e5' },
  statIcon:     { fontSize:'36px', marginBottom:'8px' },
  statLabel:    { fontSize:'11px', color:'#64748b', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'4px' },
  statValue:    { fontSize:'28px', fontWeight:'700', color:'#4f46e5' },
  tableCard:    { background:'white', borderRadius:'10px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  tableHeader:  { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' },
  tableTitle:   { fontSize:'15px', fontWeight:'700', color:'#1e293b' },
  btnPrimary:   { padding:'10px 20px', background:'#4f46e5', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px' },
  table:        { width:'100%', borderCollapse:'collapse' },
  th:           { textAlign:'left', padding:'12px', fontSize:'12px', textTransform:'uppercase', color:'#64748b', borderBottom:'2px solid #e2e8f0' },
  td:           { padding:'14px 12px', fontSize:'14px', color:'#1e293b', borderBottom:'1px solid #f1f5f9' },
}