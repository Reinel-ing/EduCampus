import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const matriculasIni = [
  { id:1, estudiante:'Kevin Perea',   curso:'Programación Web',      fecha:'01 Ene 2026', estado:'Activa' },
  { id:2, estudiante:'Kevin Perea',   curso:'Base de Datos',          fecha:'01 Ene 2026', estado:'Activa' },
  { id:3, estudiante:'Laura Gómez',   curso:'Diseño UX/UI',           fecha:'05 Ene 2026', estado:'Activa' },
  { id:4, estudiante:'Andrés Torres', curso:'Base de Datos',          fecha:'10 Ene 2026', estado:'Activa' },
  { id:5, estudiante:'María Ruiz',    curso:'Matemáticas Avanzadas',  fecha:'12 Ene 2026', estado:'Activa' },
]

const cursosList     = ['Programación Web','Base de Datos','Matemáticas Avanzadas','Diseño UX/UI','Inteligencia Artificial']
const estudiantesList = ['Kevin Perea','Laura Gómez','Andrés Torres','María Ruiz','Carlos Díaz','Sofía Martínez']

export default function Matriculas() {
  const [lista, setLista]     = useState(matriculasIni)
  const [form,  setForm]      = useState({ estudiante:'', curso:'' })
  const [error, setError]     = useState('')
  const [toast, setToast]     = useState(null)

  const showToast = (msg, color='#16a34a') => { setToast({msg,color}); setTimeout(()=>setToast(null),2000) }

  const registrar = () => {
    if (!form.estudiante || !form.curso) { setError('Completa todos los campos.'); return }
    const existe = lista.find(m => m.estudiante===form.estudiante && m.curso===form.curso)
    if (existe) { setError('Esa matrícula ya existe.'); return }
    const nueva = { id:Date.now(), ...form, fecha:new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'}), estado:'Activa' }
    setLista(prev => [nueva, ...prev])
    setForm({ estudiante:'', curso:'' }); setError('')
    showToast('✅ Matrícula registrada')
  }

  const eliminar = (id) => {
    if (window.confirm('¿Eliminar esta matrícula?')) {
      setLista(prev => prev.filter(m => m.id !== id))
      showToast('🗑️ Eliminada', '#ef4444')
    }
  }

  return (
    <div style={styles.layout}>
      {toast && <div style={{ ...styles.toast, background:toast.color }}>{toast.msg}</div>}
      <Sidebar />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Matrículas</h1>
          <div style={styles.topbarUser}>👤 {localStorage.getItem('nombre')||'Administrador'}</div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Gestión de Matrículas</h2>
          <hr style={styles.divider} />

          {/* STATS */}
          <div style={styles.statsGrid}>
            {[
              { icon:'📋', label:'TOTAL MATRÍCULAS', val:lista.length },
              { icon:'✅', label:'ACTIVAS',           val:lista.filter(m=>m.estado==='Activa').length },
              { icon:'👥', label:'ESTUDIANTES',       val:[...new Set(lista.map(m=>m.estudiante))].length },
            ].map((s,i) => (
              <div key={i} style={styles.statCard}>
                <div style={styles.statIcon}>{s.icon}</div>
                <p style={styles.statLabel}>{s.label}</p>
                <p style={styles.statValue}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* FORMULARIO */}
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>➕ Nueva Matrícula</h3>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'flex-end' }}>
              <div style={{ flex:1, minWidth:200 }}>
                <label style={styles.label}>Estudiante</label>
                <select style={styles.input} value={form.estudiante} onChange={e=>setForm({...form,estudiante:e.target.value})}>
                  <option value="">Seleccionar...</option>
                  {estudiantesList.map(e=><option key={e}>{e}</option>)}
                </select>
              </div>
              <div style={{ flex:1, minWidth:200 }}>
                <label style={styles.label}>Curso</label>
                <select style={styles.input} value={form.curso} onChange={e=>setForm({...form,curso:e.target.value})}>
                  <option value="">Seleccionar...</option>
                  {cursosList.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <button style={styles.btnPrimary} onClick={registrar}>Registrar</button>
            </div>
            {error && <p style={{ color:'#ef4444', fontSize:13, marginTop:8 }}>⚠️ {error}</p>}
          </div>

          {/* TABLA */}
          <div style={styles.tableCard}>
            <h3 style={styles.tableTitle}>Lista de Matrículas</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['ESTUDIANTE','CURSO','FECHA','ESTADO','ACCIONES'].map(h=>(
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lista.map(m=>(
                  <tr key={m.id}>
                    <td style={styles.td}>{m.estudiante}</td>
                    <td style={styles.td}>{m.curso}</td>
                    <td style={styles.td}>{m.fecha}</td>
                    <td style={styles.td}><span style={styles.badgeActivo}>{m.estado}</span></td>
                    <td style={styles.td}>
                      <button style={styles.btnDelete} onClick={()=>eliminar(m.id)}>🗑️ Eliminar</button>
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
  formCard:     { background:'white', borderRadius:'10px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', marginBottom:'24px' },
  formTitle:    { fontSize:'16px', fontWeight:'700', color:'#1e293b', marginBottom:'16px' },
  label:        { display:'block', fontSize:'13px', color:'#64748b', marginBottom:'6px', fontWeight:'500' },
  input:        { width:'100%', padding:'10px 14px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', outline:'none', boxSizing:'border-box' },
  btnPrimary:   { padding:'10px 24px', background:'#4f46e5', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontWeight:'600' },
  tableCard:    { background:'white', borderRadius:'10px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  tableTitle:   { fontSize:'16px', fontWeight:'700', color:'#1e293b', marginBottom:'16px' },
  table:        { width:'100%', borderCollapse:'collapse' },
  th:           { textAlign:'left', padding:'12px', fontSize:'12px', textTransform:'uppercase', color:'#64748b', borderBottom:'2px solid #e2e8f0' },
  td:           { padding:'14px 12px', fontSize:'14px', color:'#1e293b', borderBottom:'1px solid #f1f5f9' },
  badgeActivo:  { padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'600', background:'#dcfce7', color:'#16a34a' },
  btnDelete:    { padding:'6px 14px', background:'#fee2e2', color:'#ef4444', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'12px' },
  toast:        { position:'fixed', bottom:24, right:24, color:'white', padding:'14px 24px', borderRadius:'10px', fontWeight:'600', fontSize:'14px', zIndex:9999 },
}