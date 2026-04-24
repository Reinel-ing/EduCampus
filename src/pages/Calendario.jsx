import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const eventosIni = [
  { fecha:'25 Abr 2026', evento:'Parcial Programación Web',  tipo:'examen',     curso:'Programación Web' },
  { fecha:'28 Abr 2026', evento:'Entrega Taller SQL',         tipo:'tarea',      curso:'Base de Datos' },
  { fecha:'5 May 2026',  evento:'Exposición Base de Datos',   tipo:'exposicion', curso:'Base de Datos' },
  { fecha:'10 May 2026', evento:'Parcial Final - Prog. Web',  tipo:'examen',     curso:'Programación Web' },
  { fecha:'15 May 2026', evento:'Proyecto Final IA',          tipo:'proyecto',   curso:'Inteligencia Artificial' },
]

const tipoStyle = {
  examen:     { bg:'#fee2e2', color:'#ef4444',  label:'Examen' },
  tarea:      { bg:'#dbeafe', color:'#2563eb',  label:'Tarea' },
  exposicion: { bg:'#dcfce7', color:'#16a34a',  label:'Exposición' },
  proyecto:   { bg:'#fef9c3', color:'#ca8a04',  label:'Proyecto' },
}

export default function Calendario() {
  const [filtro, setFiltro] = useState('todos')

  const eventos = filtro === 'todos'
    ? eventosIni
    : eventosIni.filter(e => e.tipo === filtro)

  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Calendario</h1>
          <div style={styles.topbarUser}>👤 {localStorage.getItem('nombre') || 'Estudiante'}</div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Calendario de Actividades</h2>
          <hr style={styles.divider} />

          {/* FILTROS */}
          <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
            {['todos','examen','tarea','exposicion','proyecto'].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                style={{ padding:'8px 16px', borderRadius:'20px', border:'none', cursor:'pointer', fontSize:'13px', fontWeight:filtro===f?'700':'500',
                  background: filtro===f ? '#4f46e5' : 'white',
                  color:      filtro===f ? 'white'   : '#64748b',
                  boxShadow:'0 1px 4px rgba(0,0,0,0.08)'
                }}
              >
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>

          <div style={styles.grid}>
            {eventos.map((ev, i) => {
              const t = tipoStyle[ev.tipo] || tipoStyle.tarea
              return (
                <div key={i} style={styles.card}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                    <div style={{ ...styles.fechaBadge }}>{ev.fecha}</div>
                    <span style={{ padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', background:t.bg, color:t.color }}>{t.label}</span>
                  </div>
                  <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#1e293b', marginBottom:8 }}>{ev.evento}</h3>
                  <p style={{ fontSize:'13px', color:'#64748b' }}>📚 {ev.curso}</p>
                </div>
              )
            })}
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
  grid:         { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 },
  card:         { background:'white', borderRadius:'12px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', borderLeft:'4px solid #4f46e5' },
  fechaBadge:   { background:'#e0e7ff', color:'#4f46e5', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'700' },
}