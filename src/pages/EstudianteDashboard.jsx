import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const miPerfil = {
  nombre: 'Kevin Perea',
  curso: 'Programación Web',
  asistencia: '90%',
  promedio: 4.5,
  estado: 'Activo',
  email: 'kevin@edu.co',
  telefono: '300-111-2233',
}

const misCursos = [
  { nombre: 'Programación Web', horario: 'Lun - Mié 8:00am', progreso: 75, docente: 'Jose Castro' },
  { nombre: 'Base de Datos', horario: 'Mar - Jue 10:00am', progreso: 60, docente: 'Ana López' },
]

const misCalificaciones = [
  { curso: 'Programación Web', parcial1: 4.5, parcial2: 4.2, final: 4.8, promedio: 4.5 },
  { curso: 'Base de Datos', parcial1: 3.8, parcial2: 4.0, final: 4.2, promedio: 4.0 },
]

const misAsistencias = [
  { fecha: '14 Abr 2026', curso: 'Programación Web', estado: '✔' },
  { fecha: '15 Abr 2026', curso: 'Base de Datos',    estado: '✔' },
  { fecha: '16 Abr 2026', curso: 'Programación Web', estado: '✘' },
  { fecha: '17 Abr 2026', curso: 'Base de Datos',    estado: '✔' },
  { fecha: '21 Abr 2026', curso: 'Programación Web', estado: '✔' },
]

const misMaterialesIni = [
  { id: 1, nombre: 'Taller HTML', curso: 'Programación Web', fecha: '10 Abr 2026', tipo: 'PDF' },
  { id: 2, nombre: 'Ejercicio SQL', curso: 'Base de Datos', fecha: '15 Abr 2026', tipo: 'DOC' },
]

const tipoColor = {
  PDF: ['#fee2e2','#ef4444'], DOC: ['#e0e7ff','#4f46e5'],
  VIDEO: ['#fef9c3','#ca8a04'], PPT: ['#dcfce7','#16a34a'],
}
const gc = v => v >= 4.5 ? '#16a34a' : v >= 3.5 ? '#4f46e5' : '#ef4444'

const Modal = ({ title, onClose, children }) => (
  <div style={S.overlay} onClick={onClose}>
    <div style={S.modal} onClick={e => e.stopPropagation()}>
      <div style={S.mHead}><h3 style={S.mTitle}>{title}</h3><button style={S.mClose} onClick={onClose}>✕</button></div>
      <div style={S.mBody}>{children}</div>
    </div>
  </div>
)

export default function EstudianteDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('inicio')
  const [materiales, setMateriales] = useState(misMaterialesIni)
  const [subirM, setSubirM] = useState(false)
  const [nuevoMat, setNuevoMat] = useState({ nombre: '', tipo: 'PDF', curso: misCursos[0].nombre })
  const [verCalifM, setVerCalifM] = useState(null)
  const [verCursoM, setVerCursoM] = useState(null)
  const [toast, setToast] = useState(null)
  const fileRef = useRef()

  const showToast = (msg, color = '#16a34a') => { setToast({ msg, color }); setTimeout(() => setToast(null), 2500) }
  const cerrarSesion = () => { localStorage.clear(); navigate('/') }

  const subirMaterial = () => {
    if (!nuevoMat.nombre.trim()) return showToast('⚠️ Ingresa un nombre', '#f59e0b')
    setMateriales(p => [{ id: Date.now(), ...nuevoMat, fecha: new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'}) }, ...p])
    setNuevoMat({ nombre: '', tipo: 'PDF', curso: misCursos[0].nombre })
    setSubirM(false); showToast('✅ Material subido')
  }

  const eliminarMat = id => {
    if (window.confirm('¿Eliminar este material?')) {
      setMateriales(p => p.filter(m => m.id !== id)); showToast('🗑️ Eliminado', '#ef4444')
    }
  }

  const presentes = misAsistencias.filter(a => a.estado === '✔').length
  const pctAsistencia = Math.round((presentes / misAsistencias.length) * 100)

  const navItems = [
    { id: 'inicio',         icon: '🏠', label: 'Panel de Estudiante' },
    { id: 'cursos',         icon: '📚', label: 'Mis Cursos' },
    { id: 'calificaciones', icon: '📝', label: 'Mis Notas' },
    { id: 'asistencia',     icon: '✅', label: 'Mi Asistencia' },
    { id: 'material',       icon: '📁', label: 'Mis Materiales' },
    { id: 'horario',        icon: '🗓️', label: 'Horario' },
    { id: 'calendario',     icon: '📅', label: 'Calendario' },
  ]

  return (
    <div style={S.layout}>
      {toast && <div style={{ ...S.toast, background: toast.color }}>{toast.msg}</div>}

      <div style={S.sidebar}>
        <div style={S.sideTop}>
          <div style={S.logoBox}>🎓</div>
          <div style={S.logoText}>EDUCAMPUS</div>
          <div style={S.logoSub}>Estudiante</div>
        </div>
        <nav style={S.nav}>
          {navItems.map(item => (
            <button key={item.id} style={{ ...S.navBtn, ...(tab === item.id ? S.navActive : {}) }} onClick={() => setTab(item.id)}>
              <span style={S.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={S.sideBottom}>
          <div style={S.sideUser}>👤 {localStorage.getItem('nombre') || miPerfil.nombre}</div>
          <button style={S.btnLogout} onClick={cerrarSesion}>🚪 Cerrar Sesión</button>
        </div>
      </div>

      <div style={S.main}>
        <div style={S.topbar}>
          <h1 style={S.tTitle}>
            {tab === 'inicio' ? '🏠 Panel de Estudiante' : `${navItems.find(n => n.id === tab)?.icon} ${navItems.find(n => n.id === tab)?.label}`}
          </h1>
          <div style={S.tUser}>👤 {localStorage.getItem('nombre') || miPerfil.nombre}</div>
        </div>

        <div style={S.content}>

          {tab === 'inicio' && <>
            <h2 style={S.secTitle}>Bienvenido, {localStorage.getItem('nombre') || miPerfil.nombre}</h2>
            <hr style={S.hr} />
            <div style={S.grid4}>
              {[
                ['📚','MIS CURSOS',    misCursos.length,      '#4f46e5'],
                ['📝','PROMEDIO GRAL', miPerfil.promedio,     '#4f46e5'],
                ['✅','ASISTENCIA',    `${pctAsistencia}%`,   '#16a34a'],
                ['🏅','ESTADO',        miPerfil.estado,       '#16a34a'],
              ].map(([ic,lb,vl,color]) => (
                <div key={lb} style={S.stat}><div style={S.sIcon}>{ic}</div><p style={S.sLabel}>{lb}</p><p style={{...S.sVal,color}}>{vl}</p></div>
              ))}
            </div>
            <div style={S.card}>
              <h3 style={S.cardT}>Mi Información</h3>
              {[['📧 Email',miPerfil.email],['📞 Teléfono',miPerfil.telefono],['📚 Curso Principal',miPerfil.curso],['🏅 Estado',miPerfil.estado]].map(([l,v]) => (
                <div key={l} style={S.infoRow}><span style={{color:'#64748b'}}>{l}</span><span style={{fontWeight:600,color:'#1e293b'}}>{v}</span></div>
              ))}
            </div>
          </>}

          {tab === 'cursos' && <>
            <h2 style={S.secTitle}>Mis Cursos</h2>
            <hr style={S.hr} />
            <div style={S.grid2}>
              {misCursos.map((c,i) => (
                <div key={i} style={S.cursoCard}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontSize:32}}>📚</span><span style={S.badge}>Activo</span>
                  </div>
                  <h3 style={S.cNombre}>{c.nombre}</h3>
                  <p style={S.cInfo}>👨‍🏫 Docente: {c.docente}</p>
                  <p style={S.cInfo}>🕐 {c.horario}</p>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}>
                    <span style={{fontSize:12,color:'#64748b'}}>Progreso</span>
                    <span style={{fontSize:12,fontWeight:700,color:'#4f46e5'}}>{c.progreso}%</span>
                  </div>
                  <div style={S.barBg}><div style={{...S.barFill,width:c.progreso+'%',background:c.progreso>=70?'#16a34a':'#4f46e5'}}/></div>
                  <button style={S.btnP} onClick={() => setVerCursoM(c)}>Ver Detalles →</button>
                </div>
              ))}
            </div>
          </>}

          {tab === 'calificaciones' && <>
            <h2 style={S.secTitle}>Mis Calificaciones</h2>
            <hr style={S.hr} />
            <div style={S.grid3}>
              {[
                ['📝','PROMEDIO GRAL',(misCalificaciones.reduce((s,c)=>s+c.promedio,0)/misCalificaciones.length).toFixed(1)],
                ['✅','MEJOR NOTA',Math.max(...misCalificaciones.map(c=>c.promedio))],
                ['📚','CURSOS',misCalificaciones.length],
              ].map(([ic,lb,vl]) => (
                <div key={lb} style={S.stat}><div style={S.sIcon}>{ic}</div><p style={S.sLabel}>{lb}</p><p style={S.sVal}>{vl}</p></div>
              ))}
            </div>
            <div style={S.tableCard}>
              <h3 style={{...S.cardT,marginBottom:16}}>Mis Notas por Curso</h3>
              <table style={S.table}>
                <thead><tr>{['CURSO','PARCIAL 1','PARCIAL 2','FINAL','PROMEDIO',''].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {misCalificaciones.map((c,i) => (
                    <tr key={i}>
                      <td style={S.td}>{c.curso}</td>
                      {[c.parcial1,c.parcial2,c.final].map((v,j)=>(
                        <td key={j} style={S.td}><span style={{color:gc(v),fontWeight:600}}>{v}</span></td>
                      ))}
                      <td style={S.td}><span style={{padding:'4px 12px',borderRadius:20,fontSize:13,fontWeight:700,background:gc(c.promedio)+'20',color:gc(c.promedio)}}>{c.promedio}</span></td>
                      <td style={S.td}><button style={S.btnV} onClick={()=>setVerCalifM(c)}>👁️ Ver Detalle</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}

          {tab === 'asistencia' && <>
            <h2 style={S.secTitle}>Mi Asistencia</h2>
            <hr style={S.hr} />
            <div style={S.grid3}>
              {[
                ['📋','TOTAL CLASES', misAsistencias.length,            '#4f46e5'],
                ['✅','PRESENTES',    presentes,                         '#16a34a'],
                ['❌','AUSENTES',     misAsistencias.length - presentes, '#ef4444'],
              ].map(([ic,lb,vl,color]) => (
                <div key={lb} style={S.stat}>
                  <div style={S.sIcon}>{ic}</div><p style={S.sLabel}>{lb}</p>
                  <p style={{...S.sVal,color}}>{vl}</p>
                </div>
              ))}
            </div>
            <div style={S.tableCard}>
              <h3 style={{...S.cardT,marginBottom:16}}>Registro de Asistencia</h3>
              <p style={{fontSize:12,color:'#64748b',marginBottom:12,padding:'6px 12px',background:'#f8fafc',borderRadius:6,borderLeft:'3px solid #94a3b8'}}>
                🔒 Solo lectura — la asistencia es registrada por tu docente
              </p>
              <table style={S.table}>
                <thead><tr>{['FECHA','CURSO','ESTADO'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {misAsistencias.map((a,i) => (
                    <tr key={i}>
                      <td style={S.td}>{a.fecha}</td>
                      <td style={S.td}>{a.curso}</td>
                      <td style={S.td}>
                        <span style={{padding:'4px 14px',borderRadius:20,fontSize:13,fontWeight:700,background:a.estado==='✔'?'#dcfce7':'#fee2e2',color:a.estado==='✔'?'#16a34a':'#ef4444'}}>
                          {a.estado === '✔' ? 'Presente' : 'Ausente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}

          {tab === 'material' && <>
            <h2 style={S.secTitle}>Mis Materiales</h2>
            <hr style={S.hr} />
            <div style={S.grid3}>
              {[['📄','ARCHIVOS SUBIDOS',materiales.length],['📚','CURSOS',misCursos.length],['📅','ÚLTIMO SUBIDO',materiales[0]?.fecha||'—']].map(([ic,lb,vl]) => (
                <div key={lb} style={S.stat}><div style={S.sIcon}>{ic}</div><p style={S.sLabel}>{lb}</p><p style={{...S.sVal,fontSize:String(vl).length>6?16:28}}>{vl}</p></div>
              ))}
            </div>
            <div style={S.tableCard}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
                <h3 style={S.cardT}>Archivos Subidos</h3>
                <button style={S.btnP} onClick={()=>setSubirM(true)}>📤 Subir Material</button>
              </div>
              {materiales.length === 0
                ? <p style={{color:'#64748b',textAlign:'center',padding:32}}>No has subido materiales aún</p>
                : <table style={S.table}>
                    <thead><tr>{['NOMBRE','TIPO','CURSO','FECHA','ACCIONES'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                    <tbody>
                      {materiales.map(m => (
                        <tr key={m.id}>
                          <td style={S.td}>📎 {m.nombre}</td>
                          <td style={S.td}><span style={{padding:'4px 10px',borderRadius:20,fontSize:11,fontWeight:600,background:tipoColor[m.tipo]?.[0]||'#f1f5f9',color:tipoColor[m.tipo]?.[1]||'#64748b'}}>{m.tipo}</span></td>
                          <td style={S.td}>{m.curso}</td><td style={S.td}>{m.fecha}</td>
                          <td style={S.td}><button style={S.btnD} onClick={()=>eliminarMat(m.id)}>🗑️ Eliminar</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              }
            </div>
          </>}

          {tab === 'horario' && <>
            <h2 style={S.secTitle}>Mi Horario</h2>
            <hr style={S.hr} />
            <div style={S.tableCard}>
              <table style={S.table}>
                <thead><tr>{['DÍA','MATERIA','HORARIO','DOCENTE','AULA'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {[
                    ['Lunes',    'Programación Web','8:00am - 10:00am', 'Jose Castro','Sala 101'],
                    ['Miércoles','Programación Web','8:00am - 10:00am', 'Jose Castro','Sala 101'],
                    ['Martes',   'Base de Datos',   '10:00am - 12:00pm','Ana López',  'Sala 203'],
                    ['Jueves',   'Base de Datos',   '10:00am - 12:00pm','Ana López',  'Sala 203'],
                  ].map(([dia,mat,hora,doc,aula],i) => (
                    <tr key={i}>
                      <td style={S.td}><span style={{fontWeight:600,color:'#4f46e5'}}>{dia}</span></td>
                      <td style={S.td}>{mat}</td><td style={S.td}>🕐 {hora}</td>
                      <td style={S.td}>👨‍🏫 {doc}</td><td style={S.td}>🏫 {aula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}

          {tab === 'calendario' && <>
            <h2 style={S.secTitle}>Calendario Académico</h2>
            <hr style={S.hr} />
            <div style={S.grid2}>
              {[
                {fecha:'25 Abr 2026',evento:'Parcial 1 - Programación Web',tipo:'Examen',  color:'#fee2e2',tc:'#ef4444'},
                {fecha:'28 Abr 2026',evento:'Entrega Taller SQL',           tipo:'Tarea',   color:'#e0e7ff',tc:'#4f46e5'},
                {fecha:'5 May 2026', evento:'Parcial 1 - Base de Datos',    tipo:'Examen',  color:'#fee2e2',tc:'#ef4444'},
                {fecha:'12 May 2026',evento:'Proyecto Final Web',           tipo:'Proyecto',color:'#dcfce7',tc:'#16a34a'},
              ].map((ev,i) => (
                <div key={i} style={{...S.card,borderLeft:`4px solid ${ev.tc}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                    <span style={{fontWeight:700,color:'#1e293b',fontSize:15}}>{ev.evento}</span>
                    <span style={{padding:'4px 12px',borderRadius:20,fontSize:12,fontWeight:600,background:ev.color,color:ev.tc}}>{ev.tipo}</span>
                  </div>
                  <p style={{color:'#64748b',fontSize:13}}>📅 {ev.fecha}</p>
                </div>
              ))}
            </div>
          </>}

        </div>
      </div>

      {verCalifM && <Modal title={'📝 '+verCalifM.curso} onClose={()=>setVerCalifM(null)}>
        {[['Parcial 1',verCalifM.parcial1],['Parcial 2',verCalifM.parcial2],['Final',verCalifM.final],['Promedio',verCalifM.promedio]].map(([l,v]) => (
          <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid #f1f5f9'}}>
            <span style={{color:'#64748b',fontSize:14}}>{l}</span>
            <span style={{fontWeight:700,fontSize:16,color:gc(v)}}>{v}</span>
          </div>
        ))}
      </Modal>}

      {verCursoM && <Modal title={'📚 '+verCursoM.nombre} onClose={()=>setVerCursoM(null)}>
        {[['Docente',verCursoM.docente],['Horario',verCursoM.horario],['Progreso',verCursoM.progreso+'%']].map(([l,v]) => (
          <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid #f1f5f9'}}>
            <span style={{color:'#64748b',fontSize:14}}>{l}</span>
            <span style={{fontWeight:700,fontSize:15,color:'#1e293b'}}>{v}</span>
          </div>
        ))}
        <div style={{marginTop:16}}>
          <p style={{fontSize:12,color:'#64748b',marginBottom:8}}>PROGRESO DEL CURSO</p>
          <div style={S.barBg}><div style={{...S.barFill,width:verCursoM.progreso+'%',background:verCursoM.progreso>=70?'#16a34a':'#4f46e5'}}/></div>
        </div>
      </Modal>}

      {subirM && <Modal title="📤 Subir Material" onClose={()=>setSubirM(false)}>
        <div style={{marginBottom:14}}>
          <label style={S.label}>Nombre del archivo</label>
          <input style={S.input} placeholder="Ej: Taller de HTML" value={nuevoMat.nombre} onChange={e=>setNuevoMat(p=>({...p,nombre:e.target.value}))}/>
        </div>
        <div style={{marginBottom:14}}>
          <label style={S.label}>Tipo</label>
          <select style={S.input} value={nuevoMat.tipo} onChange={e=>setNuevoMat(p=>({...p,tipo:e.target.value}))}>
            {['PDF','DOC','VIDEO','PPT'].map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
        <div style={{marginBottom:14}}>
          <label style={S.label}>Curso</label>
          <select style={S.input} value={nuevoMat.curso} onChange={e=>setNuevoMat(p=>({...p,curso:e.target.value}))}>
            {misCursos.map(c=><option key={c.nombre}>{c.nombre}</option>)}
          </select>
        </div>
        <div style={{marginBottom:14}}>
          <label style={S.label}>Archivo</label>
          <input ref={fileRef} type="file" style={S.input}/>
        </div>
        <button style={{...S.btnP,width:'100%'}} onClick={subirMaterial}>📤 Subir</button>
      </Modal>}
    </div>
  )
}

const S = {
  layout:    { display:'flex', minHeight:'100vh', background:'#f1f5f9' },
  sidebar:   { width:220, background:'white', borderRight:'1px solid #e2e8f0', display:'flex', flexDirection:'column', position:'fixed', top:0, left:0, height:'100vh', zIndex:100 },
  sideTop:   { padding:'24px 16px 16px', textAlign:'center', borderBottom:'1px solid #e2e8f0' },
  logoBox:   { fontSize:36, marginBottom:4 },
  logoText:  { fontWeight:800, fontSize:16, color:'#1e293b', letterSpacing:1 },
  logoSub:   { fontSize:12, color:'#64748b', marginTop:2 },
  nav:       { flex:1, padding:'12px 8px', display:'flex', flexDirection:'column', gap:4, overflowY:'auto' },
  navBtn:    { display:'flex', alignItems:'center', gap:10, padding:'10px 14px', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, background:'transparent', color:'#64748b', textAlign:'left', width:'100%' },
  navActive: { background:'linear-gradient(135deg,#4f46e5,#3730a3)', color:'white', fontWeight:600 },
  navIcon:   { fontSize:16 },
  sideBottom:{ padding:16, borderTop:'1px solid #e2e8f0' },
  sideUser:  { fontSize:13, color:'#64748b', marginBottom:10, padding:'8px 0' },
  btnLogout: { width:'100%', padding:10, background:'#ef4444', color:'white', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:600 },
  main:      { marginLeft:220, flex:1, display:'flex', flexDirection:'column' },
  topbar:    { background:'linear-gradient(135deg,#4f46e5,#3730a3)', color:'white', padding:'18px 32px', display:'flex', justifyContent:'space-between', alignItems:'center' },
  tTitle:    { fontSize:20, fontWeight:600 },
  tUser:     { display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.2)', padding:'8px 16px', borderRadius:20, fontSize:14 },
  content:   { padding:32 },
  secTitle:  { fontSize:20, fontWeight:700, color:'#1e293b', marginBottom:4 },
  hr:        { border:'none', borderTop:'2px solid #4f46e5', marginBottom:24 },
  grid4:     { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20, marginBottom:24 },
  grid3:     { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:24 },
  grid2:     { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 },
  stat:      { background:'white', borderRadius:10, padding:24, textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', borderTop:'3px solid #4f46e5' },
  sIcon:     { fontSize:36, marginBottom:8 },
  sLabel:    { fontSize:11, color:'#64748b', textTransform:'uppercase', letterSpacing:1, marginBottom:4 },
  sVal:      { fontSize:28, fontWeight:700, color:'#4f46e5' },
  card:      { background:'white', borderRadius:10, padding:24, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', marginBottom:16 },
  cardT:     { fontSize:16, fontWeight:700, color:'#1e293b' },
  infoRow:   { display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #f1f5f9', fontSize:14 },
  cursoCard: { background:'white', borderRadius:12, padding:24, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', borderTop:'4px solid #4f46e5', display:'flex', flexDirection:'column', gap:10 },
  badge:     { padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:500, background:'#dcfce7', color:'#16a34a' },
  cNombre:   { fontSize:16, fontWeight:700, color:'#1e293b' },
  cInfo:     { fontSize:13, color:'#64748b' },
  barBg:     { height:8, background:'#e2e8f0', borderRadius:4, overflow:'hidden' },
  barFill:   { height:'100%', borderRadius:4, transition:'width 0.4s' },
  tableCard: { background:'white', borderRadius:10, padding:24, boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  table:     { width:'100%', borderCollapse:'collapse' },
  th:        { textAlign:'left', padding:12, fontSize:12, textTransform:'uppercase', color:'#64748b', borderBottom:'2px solid #e2e8f0' },
  td:        { padding:'14px 12px', fontSize:14, color:'#1e293b', borderBottom:'1px solid #f1f5f9' },
  btnP:      { padding:'10px 20px', background:'#4f46e5', color:'white', border:'none', borderRadius:8, cursor:'pointer', fontSize:14, fontWeight:500 },
  btnV:      { padding:'6px 12px', background:'#f0fdf4', color:'#16a34a', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, marginRight:6 },
  btnD:      { padding:'6px 12px', background:'#fee2e2', color:'#ef4444', border:'none', borderRadius:6, cursor:'pointer', fontSize:12 },
  overlay:   { position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 },
  modal:     { background:'white', borderRadius:16, width:480, maxWidth:'95vw', boxShadow:'0 20px 60px rgba(0,0,0,0.3)', overflow:'hidden' },
  mHead:     { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 24px', background:'linear-gradient(135deg,#4f46e5,#3730a3)', color:'white' },
  mTitle:    { fontSize:16, fontWeight:700 },
  mClose:    { background:'rgba(255,255,255,0.2)', border:'none', color:'white', borderRadius:6, cursor:'pointer', fontSize:16, padding:'4px 10px' },
  mBody:     { padding:24 },
  label:     { display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 },
  input:     { width:'100%', padding:'10px 12px', border:'1px solid #d1d5db', borderRadius:8, fontSize:14, outline:'none', boxSizing:'border-box' },
  toast:     { position:'fixed', bottom:24, right:24, color:'white', padding:'14px 24px', borderRadius:10, fontWeight:600, fontSize:14, zIndex:9999, boxShadow:'0 4px 20px rgba(0,0,0,0.2)' },
}