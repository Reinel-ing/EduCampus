import Sidebar from '../components/Sidebar'

const rol = () => localStorage.getItem('rol')

const horarioDocente = [
  { hora:'8:00am',  lun:'Prog. Web',   mar:'',           mie:'Prog. Web',   jue:'',             vie:'' },
  { hora:'10:00am', lun:'',            mar:'Base Datos',  mie:'',            jue:'Base Datos',   vie:'' },
  { hora:'12:00pm', lun:'',            mar:'',           mie:'',            jue:'',             vie:'' },
  { hora:'2:00pm',  lun:'',            mar:'',           mie:'',            jue:'',             vie:'Int. Artificial' },
]

const horarioEstudiante = [
  { hora:'8:00am',  lun:'Prog. Web',  mar:'',           mie:'Prog. Web',  jue:'',           vie:'' },
  { hora:'10:00am', lun:'',           mar:'Base Datos', mie:'',           jue:'Base Datos', vie:'' },
  { hora:'12:00pm', lun:'',           mar:'',           mie:'',           jue:'',           vie:'' },
  { hora:'2:00pm',  lun:'',           mar:'',           mie:'',           jue:'',           vie:'' },
]

export default function Horarios() {
  const esDocente  = rol() === 'docente'
  const horario    = esDocente ? horarioDocente : horarioEstudiante
  const dias       = ['hora','lun','mar','mie','jue','vie']
  const diasLabel  = ['HORA','LUNES','MARTES','MIÉRCOLES','JUEVES','VIERNES']
  const colores    = { 'Prog. Web':'#e0e7ff', 'Base Datos':'#dcfce7', 'Int. Artificial':'#fef9c3' }

  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Horario</h1>
          <div style={styles.topbarUser}>👤 {localStorage.getItem('nombre') || 'Usuario'}</div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Horario Semanal</h2>
          <hr style={styles.divider} />
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr style={{ background:'linear-gradient(135deg,#4f46e5,#3730a3)' }}>
                  {diasLabel.map(d => <th key={d} style={styles.th}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {horario.map((fila, i) => (
                  <tr key={i} style={{ background: i%2===0 ? '#f8fafc' : 'white' }}>
                    {dias.map(d => (
                      <td key={d} style={{ ...styles.td, fontWeight: d==='hora'?'700':'400', textAlign:'center' }}>
                        {fila[d] ? (
                          <span style={{ padding:'4px 10px', borderRadius:'8px', fontSize:'13px', background: colores[fila[d]]||'#e2e8f0', color:'#1e293b', fontWeight:'600' }}>
                            {fila[d]}
                          </span>
                        ) : (d==='hora' ? '' : '—')}
                      </td>
                    ))}
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
  tableCard:    { background:'white', borderRadius:'10px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', overflowX:'auto' },
  table:        { width:'100%', borderCollapse:'collapse' },
  th:           { padding:'14px 12px', color:'white', fontSize:'12px', textTransform:'uppercase', fontWeight:'700', textAlign:'center' },
  td:           { padding:'14px 12px', fontSize:'14px', color:'#1e293b', borderBottom:'1px solid #f1f5f9' },
}