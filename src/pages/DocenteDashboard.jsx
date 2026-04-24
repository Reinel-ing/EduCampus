import { useState, useRef } from 'react'

const cursosData = [
  { nombre: 'Programación Web',      estudiantes: 12, horario: 'Lun - Mié 8:00am',  progreso: 75, estado: 'Activo' },
  { nombre: 'Base de Datos',         estudiantes: 15, horario: 'Mar - Jue 10:00am', progreso: 60, estado: 'Activo' },
  { nombre: 'Inteligencia Artificial', estudiantes: 9, horario: 'Vie 2:00pm',        progreso: 40, estado: 'Activo' },
]

const estudiantesIni = [
  { nombre: 'Kevin Perea',    curso: 'Programación Web',      asistencia: '90%', promedio: 4.5, estado: 'Activo' },
  { nombre: 'Laura Gómez',    curso: 'Programación Web',      asistencia: '85%', promedio: 4.1, estado: 'Activo' },
  { nombre: 'Andrés Torres',  curso: 'Base de Datos',         asistencia: '78%', promedio: 3.8, estado: 'Activo' },
  { nombre: 'María Ruiz',     curso: 'Base de Datos',         asistencia: '95%', promedio: 4.8, estado: 'Activo' },
  { nombre: 'Carlos Díaz',    curso: 'Inteligencia Artificial', asistencia: '70%', promedio: 3.5, estado: 'Activo' },
  { nombre: 'Sofía Martínez', curso: 'Inteligencia Artificial', asistencia: '88%', promedio: 4.3, estado: 'Activo' },
]

const califIni = [
  { nombre: 'Kevin Perea',    curso: 'Programación Web',      parcial1: 4.5, parcial2: 4.2, final: 4.8, promedio: 4.5 },
  { nombre: 'Laura Gómez',    curso: 'Programación Web',      parcial1: 3.8, parcial2: 4.0, final: 4.2, promedio: 4.0 },
  { nombre: 'Andrés Torres',  curso: 'Base de Datos',         parcial1: 3.5, parcial2: 3.8, final: 4.0, promedio: 3.8 },
  { nombre: 'María Ruiz',     curso: 'Base de Datos',         parcial1: 4.8, parcial2: 4.9, final: 5.0, promedio: 4.9 },
  { nombre: 'Carlos Díaz',    curso: 'Inteligencia Artificial', parcial1: 3.2, parcial2: 3.5, final: 3.8, promedio: 3.5 },
  { nombre: 'Sofía Martínez', curso: 'Inteligencia Artificial', parcial1: 4.3, parcial2: 4.4, final: 4.5, promedio: 4.4 },
]

const matsIni = [
  { id: 1, nombre: 'Introducción a HTML',  tipo: 'PDF',   curso: 'Programación Web',      fecha: '10 Abr 2026', size: '2.3 MB' },
  { id: 2, nombre: 'Guía de CSS Avanzado', tipo: 'PDF',   curso: 'Programación Web',      fecha: '12 Abr 2026', size: '1.8 MB' },
  { id: 3, nombre: 'Ejercicios SQL',       tipo: 'DOC',   curso: 'Base de Datos',         fecha: '15 Abr 2026', size: '890 KB' },
  { id: 4, nombre: 'Video: Joins en SQL',  tipo: 'VIDEO', curso: 'Base de Datos',         fecha: '18 Abr 2026', size: '45 MB' },
  { id: 5, nombre: 'Redes Neuronales',     tipo: 'PPT',   curso: 'Inteligencia Artificial', fecha: '20 Abr 2026', size: '5.1 MB' },
]

const tipoColor = {
  PDF:   ['#fee2e2','#ef4444'],
  DOC:   ['#e0e7ff','#4f46e5'],
  VIDEO: ['#fef9c3','#ca8a04'],
  PPT:   ['#dcfce7','#16a34a'],
}
const gc = v => v >= 4.5 ? '#16a34a' : v >= 3.5 ? '#4f46e5' : '#ef4444'
const today = new Date().toISOString().split('T')[0]

const Modal = ({ title, children, onClose }) => (
  <div style={S.overlay} onClick={onClose}>
    <div style={S.modal} onClick={e => e.stopPropagation()}>
      <div style={S.mHead}><h3 style={S.mTitle}>{title}</h3><button style={S.mClose} onClick={onClose}>✕</button></div>
      {children}
    </div>
  </div>
)

export default function DocenteDashboard() {
  const [tab, setTab]       = useState('inicio')
  const [mats, setMats]     = useState(matsIni)
  const [califs, setCalifs] = useState(califIni)
  const [ests, setEsts]     = useState(estudiantesIni)
  const [asistencias, setAsistencias] = useState([])
  const [attCurso, setAttCurso]       = useState(cursosData[0].nombre)
  const [attFecha, setAttFecha]       = useState(today)
  const [attSeleccion, setAttSeleccion] = useState({})
  const [cursoM,  setCursoM]   = useState(null)
  const [estM,    setEstM]     = useState(null)
  const [editCI,  setEditCI]   = useState(null); const [editCD, setEditCD] = useState({})
  const [editEI,  setEditEI]   = useState(null); const [editED, setEditED] = useState({})
  const [subirM,  setSubirM]   = useState(false)
  const [nuevoMat, setNuevoMat] = useState({ nombre: '', tipo: 'PDF', curso: cursosData[0].nombre })
  const [toast,   setToast]    = useState(null)
  const fileRef = useRef()

  const showToast = (msg, color = '#16a34a') => { setToast({ msg, color }); setTimeout(() => setToast(null), 2500) }

  const tabs = [
    ['inicio',        '🏠 Inicio'],
    ['cursos',        '📚 Mis Cursos'],
    ['estudiantes',   '👥 Estudiantes'],
    ['asistencia',    '✅ Asistencia'],
    ['calificaciones','📝 Calificaciones'],
    ['material',      '📁 Material'],
  ]

  const exportar = () => {
    const csv = 'Estudiante,Curso,P1,P2,Final,Promedio\n' +
      califs.map(c => `${c.nombre},${c.curso},${c.parcial1},${c.parcial2},${c.final},${c.promedio}`).join('\n')
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
      download: 'calificaciones.csv',
    })
    a.click(); showToast('✅ Exportado correctamente')
  }

  const guardarCalif = () => {
    const [p1, p2, fn] = [parseFloat(editCD.parcial1), parseFloat(editCD.parcial2), parseFloat(editCD.final)]
    setCalifs(prev => prev.map((c, i) => i === editCI
      ? { ...c, parcial1: p1, parcial2: p2, final: fn, promedio: +((p1+p2+fn)/3).toFixed(1) }
      : c))
    setEditCI(null); showToast('✅ Calificación actualizada')
  }

  const descargar = m => {
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([`${m.nombre}\n${m.tipo} - ${m.curso}`])),
      download: `${m.nombre}.txt`,
    })
    a.click(); showToast(`⬇️ Descargando: ${m.nombre}`)
  }
  const eliminarMat = id => {
    if (window.confirm('¿Eliminar material?')) { setMats(p => p.filter(m => m.id !== id)); showToast('🗑️ Eliminado', '#ef4444') }
  }
  const subirMaterial = () => {
    if (!nuevoMat.nombre.trim()) return showToast('⚠️ Ingresa un nombre', '#f59e0b')
    setMats(p => [{ id: Date.now(), ...nuevoMat, fecha: new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'}), size: '—' }, ...p])
    setNuevoMat({ nombre:'', tipo:'PDF', curso: cursosData[0].nombre })
    setSubirM(false); showToast('✅ Material subido')
  }

  const guardarEst  = () => { setEsts(p => p.map((e, i) => i === editEI ? { ...e, ...editED } : e)); setEditEI(null); showToast('✅ Estudiante actualizado') }
  const eliminarEst = i  => { if (window.confirm('¿Eliminar estudiante?')) { setEsts(p => p.filter((_,idx) => idx !== i)); showToast('🗑️ Eliminado', '#ef4444') } }

  const estudiantesCurso = ests.filter(e => e.curso === attCurso)

  const guardarAsistencia = () => {
    const sinMarcar = estudiantesCurso.filter(e => !attSeleccion[e.nombre])
    if (sinMarcar.length > 0) return showToast(`⚠️ Faltan ${sinMarcar.length} estudiante(s) por marcar`, '#f59e0b')
    const registros = estudiantesCurso.map(e => ({ nombre: e.nombre, estado: attSeleccion[e.nombre] }))
    setAsistencias(prev => {
      const existe = prev.findIndex(a => a.curso === attCurso && a.fecha === attFecha)
      if (existe >= 0) { const copia = [...prev]; copia[existe] = { curso: attCurso, fecha: attFecha, registros }; return copia }
      return [{ curso: attCurso, fecha: attFecha, registros }, ...prev]
    })
    setAttSeleccion({})
    showToast(`✅ Asistencia guardada (${registros.length} estudiantes)`)
  }

  const pctAsistencia = nombre => {
    const total = asistencias.reduce((acc, a) => acc + a.registros.filter(r => r.nombre === nombre).length, 0)
    if (total === 0) return '—'
    const pres = asistencias.reduce((acc, a) => acc + a.registros.filter(r => r.nombre === nombre && r.estado === 'Presente').length, 0)
    return `${Math.round((pres/total)*100)}%`
  }

  return (
    <div style={S.layout}>
      {toast && <div style={{...S.toast, background: toast.color}}>{toast.msg}</div>}

      <div style={S.sidebar}>
        <div style={S.brand}>
          <div style={S.logo}>🎓</div>
          <h2 style={S.bName}>EDUCAMPUS</h2>
          <p style={S.bRol}>Docente</p>
        </div>
        <nav style={S.nav}>
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{...S.navItem, ...(tab===id ? S.navActive : {})}}>
              {label}
            </button>
          ))}
        </nav>
        <div style={{padding:12}}>
          <button style={S.btnOut} onClick={() => window.location.href='/'}>🚪 Cerrar Sesión</button>
        </div>
      </div>

      <div style={S.main}>
        <div style={S.topbar}>
          <h1 style={S.tTitle}>Panel de Docente</h1>
          <div style={S.tUser}>👤 jose castro</div>
        </div>

        <div style={S.content}>

          {tab === 'inicio' && <>
            <h2 style={S.secTitle}>Bienvenido, jose</h2>
            <p style={S.secSub}>Resumen de tu actividad docente</p>
            <hr style={S.hr}/>
            <div style={S.grid3}>
              {[['📚','MIS CURSOS',3],['👥','ESTUDIANTES',ests.length],['📁','MATERIALES',mats.length]].map(([ic,lb,vl]) => (
                <div key={lb} style={S.stat}><div style={S.sIcon}>{ic}</div><p style={S.sLabel}>{lb}</p><p style={S.sVal}>{vl}</p></div>
              ))}
            </div>
            <div style={S.card}>
              <h3 style={S.cardT}>Próximas Clases</h3>
              {[['📖 Programación Web','Lunes 8:00am'],['🗄️ Base de Datos','Martes 10:00am'],['🤖 Inteligencia Artificial','Viernes 2:00pm']].map(([n,h]) => (
                <div key={n} style={S.claseRow}><span>{n}</span><span style={S.claseH}>{h}</span></div>
              ))}
            </div>
          </>}

          {tab === 'cursos' && <>
            <h2 style={S.secTitle}>Mis Cursos</h2>
            <hr style={S.hr}/>
            <div style={S.grid3}>
              {cursosData.map((c,i) => (
                <div key={i} style={S.cursoCard}>
                  <div style={{display:'flex',justifyContent:'space-between'}}><span style={{fontSize:32}}>📚</span><span style={S.badge}>{c.estado}</span></div>
                  <h3 style={S.cNombre}>{c.nombre}</h3>
                  <p style={S.cInfo}>👥 {c.estudiantes} estudiantes</p>
                  <p style={S.cInfo}>🕐 {c.horario}</p>
                  <div style={{display:'flex',justifyContent:'space-between'}}><span style={S.pText}>Progreso</span><span style={{...S.pText,color:'#4f46e5',fontWeight:700}}>{c.progreso}%</span></div>
                  <div style={S.barBg}><div style={{...S.barFill,width:`${c.progreso}%`,background:c.progreso>=70?'#16a34a':'#4f46e5'}}/></div>
                  <button style={S.btnP} onClick={() => setCursoM(c)}>Ver Curso →</button>
                </div>
              ))}
            </div>
          </>}

          {tab === 'estudiantes' && <>
            <h2 style={S.secTitle}>Mis Estudiantes</h2>
            <hr style={S.hr}/>
            <div style={S.grid3}>
              {[['🎓','TOTAL',ests.length],['✅','ASISTENCIA',`${(ests.reduce((a,e)=>a+parseInt(e.asistencia),0)/ests.length).toFixed(0)}%`],['⭐','PROMEDIO',(ests.reduce((a,e)=>a+e.promedio,0)/ests.length).toFixed(1)]].map(([ic,lb,vl]) => (
                <div key={lb} style={S.stat}><div style={S.sIcon}>{ic}</div><p style={S.sLabel}>{lb}</p><p style={S.sVal}>{vl}</p></div>
              ))}
            </div>
            <div style={S.tableCard}>
              <table style={S.table}>
                <thead><tr>{['ESTUDIANTE','CURSO','ASISTENCIA','PROMEDIO','ESTADO','ACCIONES'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>{ests.map((e,i)=>(
                  <tr key={i}>
                    <td style={S.td}>🎓 {e.nombre}</td><td style={S.td}>{e.curso}</td>
                    <td style={S.td}>{pctAsistencia(e.nombre) !== '—' ? pctAsistencia(e.nombre) : e.asistencia}</td>
                    <td style={S.td}><span style={{fontWeight:700,color:e.promedio>=4?'#16a34a':'#f59e0b'}}>{e.promedio}</span></td>
                    <td style={S.td}><span style={S.badge}>{e.estado}</span></td>
                    <td style={S.td}>
                      <button style={S.btnV} onClick={()=>setEstM(e)}>👁️ Ver</button>
                      <button style={S.btnE} onClick={()=>{setEditEI(i);setEditED({...e})}}>✏️ Editar</button>
                      <button style={S.btnD} onClick={()=>eliminarEst(i)}>🗑️</button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>}

          {tab === 'asistencia' && <>
            <h2 style={S.secTitle}>Registrar Asistencia</h2>
            <p style={S.secSub}>Selecciona curso y fecha, luego marca el estado de cada estudiante</p>
            <hr style={S.hr}/>
            <div style={{display:'flex',gap:16,marginBottom:24,flexWrap:'wrap'}}>
              <div style={{flex:1,minWidth:180}}>
                <label style={S.label}>Curso</label>
                <select style={S.input} value={attCurso} onChange={e=>{setAttCurso(e.target.value);setAttSeleccion({})}}>
                  {cursosData.map(c=><option key={c.nombre}>{c.nombre}</option>)}
                </select>
              </div>
              <div style={{flex:1,minWidth:180}}>
                <label style={S.label}>Fecha</label>
                <input type="date" style={S.input} value={attFecha} max={today} onChange={e=>{setAttFecha(e.target.value);setAttSeleccion({})}}/>
              </div>
            </div>
            <div style={S.tableCard}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                <h3 style={S.cardT}>Estudiantes — {attCurso}</h3>
                <span style={{fontSize:12,color:'#64748b'}}>{attFecha}</span>
              </div>
              {estudiantesCurso.length === 0
                ? <p style={{color:'#64748b',textAlign:'center',padding:24}}>No hay estudiantes en este curso</p>
                : <>
                    <table style={S.table}>
                      <thead><tr>{['ESTUDIANTE','ESTADO','MARCAR'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                      <tbody>
                        {estudiantesCurso.map((e,i)=>{
                          const sel = attSeleccion[e.nombre]
                          return (
                            <tr key={i}>
                              <td style={S.td}>🎓 {e.nombre}</td>
                              <td style={S.td}>
                                {sel
                                  ? <span style={{padding:'4px 14px',borderRadius:20,fontSize:13,fontWeight:700,background:sel==='Presente'?'#dcfce7':'#fee2e2',color:sel==='Presente'?'#16a34a':'#ef4444'}}>{sel}</span>
                                  : <span style={{color:'#94a3b8',fontSize:12}}>Sin marcar</span>}
                              </td>
                              <td style={S.td}>
                                <button style={{...S.btnV,background:sel==='Presente'?'#16a34a':'#f0fdf4',color:sel==='Presente'?'white':'#16a34a',marginRight:8}}
                                  onClick={()=>setAttSeleccion(p=>({...p,[e.nombre]:'Presente'}))}>✔ Presente</button>
                                <button style={{...S.btnD,background:sel==='Ausente'?'#ef4444':'#fee2e2',color:sel==='Ausente'?'white':'#ef4444'}}
                                  onClick={()=>setAttSeleccion(p=>({...p,[e.nombre]:'Ausente'}))}>✘ Ausente</button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <div style={{display:'flex',justifyContent:'flex-end',marginTop:16}}>
                      <button style={S.btnP} onClick={guardarAsistencia}>💾 Guardar Asistencia</button>
                    </div>
                  </>
              }
            </div>
            {asistencias.length > 0 && (
              <div style={{...S.tableCard,marginTop:24}}>
                <h3 style={{...S.cardT,marginBottom:16}}>Historial de Registros</h3>
                <table style={S.table}>
                  <thead><tr>{['FECHA','CURSO','ESTUDIANTE','ESTADO'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {asistencias.flatMap(a=>a.registros.map((r,i)=>(
                      <tr key={`${a.fecha}-${a.curso}-${i}`}>
                        <td style={S.td}>{a.fecha}</td><td style={S.td}>{a.curso}</td><td style={S.td}>🎓 {r.nombre}</td>
                        <td style={S.td}><span style={{padding:'4px 14px',borderRadius:20,fontSize:13,fontWeight:700,background:r.estado==='Presente'?'#dcfce7':'#fee2e2',color:r.estado==='Presente'?'#16a34a':'#ef4444'}}>{r.estado}</span></td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div>
            )}
          </>}

          {tab === 'calificaciones' && <>
            <h2 style={S.secTitle}>Calificaciones</h2>
            <hr style={S.hr}/>
            <div style={S.tableCard}>
              <div style={S.tHead}><h3 style={S.cardT}>Registro de Calificaciones</h3><button style={S.btnP} onClick={exportar}>📥 Exportar CSV</button></div>
              <table style={S.table}>
                <thead><tr>{['ESTUDIANTE','CURSO','PARCIAL 1','PARCIAL 2','FINAL','PROMEDIO',''].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>{califs.map((c,i)=>(
                  <tr key={i}>
                    <td style={S.td}>🎓 {c.nombre}</td><td style={S.td}>{c.curso}</td>
                    {[c.parcial1,c.parcial2,c.final].map((v,j)=><td key={j} style={S.td}><span style={{color:gc(v),fontWeight:600}}>{v}</span></td>)}
                    <td style={S.td}><span style={{padding:'4px 12px',borderRadius:20,fontSize:13,fontWeight:700,background:gc(c.promedio)+'20',color:gc(c.promedio)}}>{c.promedio}</span></td>
                    <td style={S.td}><button style={S.btnE} onClick={()=>{setEditCI(i);setEditCD({parcial1:c.parcial1,parcial2:c.parcial2,final:c.final})}}>✏️ Editar</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>}

          {tab === 'material' && <>
            <h2 style={S.secTitle}>Material Didáctico</h2>
            <hr style={S.hr}/>
            <div style={S.grid3}>
              {[['📄','TOTAL ARCHIVOS',mats.length],['📚','CURSOS CON MAT.',3],['💾','ESPACIO','55MB']].map(([ic,lb,vl])=>(
                <div key={lb} style={S.stat}><div style={S.sIcon}>{ic}</div><p style={S.sLabel}>{lb}</p><p style={S.sVal}>{vl}</p></div>
              ))}
            </div>
            <div style={S.tableCard}>
              <div style={S.tHead}><h3 style={S.cardT}>Archivos Subidos</h3><button style={S.btnP} onClick={()=>setSubirM(true)}>+ Subir Material</button></div>
              <table style={S.table}>
                <thead><tr>{['NOMBRE','TIPO','CURSO','FECHA','TAMAÑO','ACCIONES'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>{mats.map(m=>(
                  <tr key={m.id}>
                    <td style={S.td}>📎 {m.nombre}</td>
                    <td style={S.td}><span style={{padding:'4px 10px',borderRadius:20,fontSize:11,fontWeight:600,background:tipoColor[m.tipo]?.[0]||'#f1f5f9',color:tipoColor[m.tipo]?.[1]||'#64748b'}}>{m.tipo}</span></td>
                    <td style={S.td}>{m.curso}</td><td style={S.td}>{m.fecha}</td><td style={S.td}>{m.size}</td>
                    <td style={S.td}>
                      <button style={S.btnE} onClick={()=>descargar(m)}>⬇️ Descargar</button>
                      <button style={S.btnD} onClick={()=>eliminarMat(m.id)}>🗑️ Eliminar</button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>}

        </div>
      </div>

      {cursoM && <Modal title={`📚 ${cursoM.nombre}`} onClose={()=>setCursoM(null)}>
        <div style={S.mBody}>
          <p><b>Estado:</b> {cursoM.estado}</p><p><b>Estudiantes:</b> {cursoM.estudiantes}</p>
          <p><b>Horario:</b> {cursoM.horario}</p><p><b>Progreso:</b> {cursoM.progreso}%</p>
          <div style={S.barBg}><div style={{...S.barFill,width:`${cursoM.progreso}%`,background:cursoM.progreso>=70?'#16a34a':'#4f46e5'}}/></div>
          <h4 style={{marginTop:16}}>Estudiantes:</h4>
          {ests.filter(e=>e.curso===cursoM.nombre).map((e,i)=><div key={i} style={S.claseRow}><span>🎓 {e.nombre}</span><span style={{color:'#4f46e5',fontWeight:600}}>Prom: {e.promedio}</span></div>)}
        </div>
      </Modal>}

      {estM && <Modal title={`🎓 ${estM.nombre}`} onClose={()=>setEstM(null)}>
        <div style={S.mBody}>
          <p><b>Curso:</b> {estM.curso}</p>
          <p><b>Asistencia:</b> {pctAsistencia(estM.nombre) !== '—' ? pctAsistencia(estM.nombre) : estM.asistencia}</p>
          <p><b>Promedio:</b> <span style={{color:gc(estM.promedio),fontWeight:700}}>{estM.promedio}</span></p>
          <h4 style={{marginTop:16}}>Calificaciones:</h4>
          {califs.filter(c=>c.nombre===estM.nombre).map((c,i)=><div key={i} style={S.claseRow}><span>P1:{c.parcial1} P2:{c.parcial2} Final:{c.final}</span><span style={{color:gc(c.promedio),fontWeight:700}}>Prom:{c.promedio}</span></div>)}
        </div>
      </Modal>}

      {editEI!==null && <Modal title="✏️ Editar Estudiante" onClose={()=>setEditEI(null)}>
        <div style={S.mBody}>
          {[['nombre','Nombre'],['asistencia','Asistencia'],['promedio','Promedio']].map(([f,l])=>(
            <div key={f} style={{marginBottom:14}}><label style={S.label}>{l}</label>
              <input style={S.input} value={editED[f]||''} onChange={e=>setEditED(p=>({...p,[f]:e.target.value}))}/>
            </div>
          ))}
          <div style={{marginBottom:14}}><label style={S.label}>Estado</label>
            <select style={S.input} value={editED.estado} onChange={e=>setEditED(p=>({...p,estado:e.target.value}))}>
              <option>Activo</option><option>Inactivo</option>
            </select>
          </div>
          <button style={{...S.btnP,width:'100%'}} onClick={guardarEst}>💾 Guardar</button>
        </div>
      </Modal>}

      {editCI!==null && <Modal title="✏️ Editar Calificación" onClose={()=>setEditCI(null)}>
        <div style={S.mBody}>
          <p style={{color:'#64748b',marginBottom:12}}><b>{califs[editCI].nombre}</b> — {califs[editCI].curso}</p>
          {[['parcial1','Parcial 1'],['parcial2','Parcial 2'],['final','Final']].map(([f,l])=>(
            <div key={f} style={{marginBottom:14}}><label style={S.label}>{l}</label>
              <input type="number" min="0" max="5" step="0.1" style={S.input} value={editCD[f]||''} onChange={e=>setEditCD(p=>({...p,[f]:e.target.value}))}/>
            </div>
          ))}
          <button style={{...S.btnP,width:'100%'}} onClick={guardarCalif}>💾 Guardar</button>
        </div>
      </Modal>}

      {subirM && <Modal title="📤 Subir Material" onClose={()=>setSubirM(false)}>
        <div style={S.mBody}>
          <div style={{marginBottom:14}}><label style={S.label}>Nombre</label><input style={S.input} value={nuevoMat.nombre} onChange={e=>setNuevoMat(p=>({...p,nombre:e.target.value}))}/></div>
          <div style={{marginBottom:14}}><label style={S.label}>Tipo</label>
            <select style={S.input} value={nuevoMat.tipo} onChange={e=>setNuevoMat(p=>({...p,tipo:e.target.value}))}>
              {['PDF','DOC','VIDEO','PPT'].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{marginBottom:14}}><label style={S.label}>Curso</label>
            <select style={S.input} value={nuevoMat.curso} onChange={e=>setNuevoMat(p=>({...p,curso:e.target.value}))}>
              {cursosData.map(c=><option key={c.nombre}>{c.nombre}</option>)}
            </select>
          </div>
          <div style={{marginBottom:14}}><label style={S.label}>Archivo</label><input ref={fileRef} type="file" style={S.input}/></div>
          <button style={{...S.btnP,width:'100%'}} onClick={subirMaterial}>📤 Subir</button>
        </div>
      </Modal>}
    </div>
  )
}

const S = {
  layout:    { display:'flex', minHeight:'100vh', background:'#f1f5f9' },
  sidebar:   { width:220, background:'white', height:'100vh', position:'fixed', display:'flex', flexDirection:'column', boxShadow:'2px 0 8px rgba(0,0,0,0.05)' },
  brand:     { textAlign:'center', padding:'24px 20px', borderBottom:'1px solid #f1f5f9' },
  logo:      { width:60, height:60, background:'#1e293b', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, margin:'0 auto 8px' },
  bName:     { fontSize:13, color:'#1e293b', fontWeight:700 },
  bRol:      { fontSize:12, color:'#64748b' },
  nav:       { flex:1, padding:12, display:'flex', flexDirection:'column', gap:4, overflowY:'auto' },
  navItem:   { display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderRadius:8, border:'none', cursor:'pointer', fontSize:13, textAlign:'left', width:'100%', background:'transparent', color:'#64748b' },
  navActive: { background:'linear-gradient(135deg,#4f46e5,#3730a3)', color:'white', fontWeight:600 },
  btnOut:    { width:'100%', padding:12, background:'#ef4444', color:'white', border:'none', borderRadius:8, cursor:'pointer', fontSize:14 },
  main:      { marginLeft:220, flex:1, display:'flex', flexDirection:'column' },
  topbar:    { background:'linear-gradient(135deg,#4f46e5,#3730a3)', color:'white', padding:'18px 32px', display:'flex', justifyContent:'space-between', alignItems:'center' },
  tTitle:    { fontSize:22, fontWeight:600 },
  tUser:     { display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.2)', padding:'8px 16px', borderRadius:20, fontSize:14 },
  content:   { padding:32 },
  secTitle:  { fontSize:20, fontWeight:700, color:'#1e293b', marginBottom:4 },
  secSub:    { fontSize:13, color:'#64748b', marginBottom:8 },
  hr:        { border:'none', borderTop:'2px solid #4f46e5', marginBottom:24 },
  grid3:     { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:24 },
  stat:      { background:'white', borderRadius:10, padding:24, textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', borderTop:'3px solid #4f46e5' },
  sIcon:     { fontSize:36, marginBottom:8 },
  sLabel:    { fontSize:11, color:'#64748b', textTransform:'uppercase', letterSpacing:1, marginBottom:4 },
  sVal:      { fontSize:28, fontWeight:700, color:'#4f46e5' },
  card:      { background:'white', borderRadius:10, padding:24, boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  cardT:     { fontSize:16, fontWeight:700, color:'#1e293b' },
  claseRow:  { display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #f1f5f9', fontSize:14, color:'#1e293b' },
  claseH:    { color:'#4f46e5', fontWeight:600 },
  cursoCard: { background:'white', borderRadius:12, padding:24, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', borderTop:'4px solid #4f46e5', display:'flex', flexDirection:'column', gap:10 },
  badge:     { padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:500, background:'#dcfce7', color:'#16a34a' },
  cNombre:   { fontSize:16, fontWeight:700, color:'#1e293b' },
  cInfo:     { fontSize:13, color:'#64748b' },
  pText:     { fontSize:12, color:'#64748b' },
  barBg:     { height:8, background:'#e2e8f0', borderRadius:4, overflow:'hidden' },
  barFill:   { height:'100%', borderRadius:4, transition:'width 0.4s' },
  tableCard: { background:'white', borderRadius:10, padding:24, boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  tHead:     { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 },
  table:     { width:'100%', borderCollapse:'collapse' },
  th:        { textAlign:'left', padding:12, fontSize:12, textTransform:'uppercase', color:'#64748b', borderBottom:'2px solid #e2e8f0' },
  td:        { padding:'14px 12px', fontSize:14, color:'#1e293b', borderBottom:'1px solid #f1f5f9' },
  btnP:      { padding:'10px 20px', background:'#4f46e5', color:'white', border:'none', borderRadius:8, cursor:'pointer', fontSize:14, fontWeight:500 },
  btnV:      { padding:'6px 12px', background:'#f0fdf4', color:'#16a34a', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, marginRight:6 },
  btnE:      { padding:'6px 12px', background:'#e0e7ff', color:'#4f46e5', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, marginRight:6 },
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