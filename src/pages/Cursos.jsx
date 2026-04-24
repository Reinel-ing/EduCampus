import { useNavigate, useSearchParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const cursos = [
  { nombre: 'Programación Web', estudiantes: 12, horario: 'Lun - Mié 8:00am', progreso: 75, estado: 'Activo', descripcion: 'Aprende a crear aplicaciones web modernas con HTML, CSS, JavaScript, React y más.' },
  { nombre: 'Base de Datos', estudiantes: 15, horario: 'Mar - Jue 10:00am', progreso: 60, estado: 'Activo', descripcion: 'Fundamentos de bases de datos relacionales, SQL, MySQL y gestión de datos.' },
  { nombre: 'Inteligencia Artificial', estudiantes: 9, horario: 'Vie 2:00pm', progreso: 40, estado: 'Activo', descripcion: 'Introducción a Machine Learning, redes neuronales y aplicaciones de IA.' },
]

function Cursos() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const cursoVer = searchParams.get('ver')

  const handleVerCurso = (nombre) => {
    navigate(`/cursos?ver=${encodeURIComponent(nombre)}`)
  }

  const handleVolver = () => {
    navigate('/cursos')
  }

  // Mostrar detalles del curso
  if (cursoVer) {
    const curso = cursos.find(c => c.nombre === decodeURIComponent(cursoVer))
    return (
      <div style={styles.layout}>
        <Sidebar rol="docente" />
        <div style={styles.main}>
          <div style={styles.topbar}>
            <h1 style={styles.topbarTitle}>Mis Cursos</h1>
            <div style={styles.topbarUser}>👤 jose castro</div>
          </div>
          <div style={styles.content}>
            <h2 style={styles.sectionTitle}>📚 {decodeURIComponent(cursoVer)}</h2>
            <hr style={styles.divider} />
            <div style={styles.detailCard}>
              <div style={styles.detailHeader}>
                <span style={styles.detailIcon}>📚</span>
                <span style={styles.badgeActivo}>{curso?.estado}</span>
              </div>
              <p style={styles.detailDesc}>{curso?.descripcion}</p>
              <div style={styles.detailGrid}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>👥 Estudiantes</span>
                  <span style={styles.detailValue}>{curso?.estudiantes}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>🕐 Horario</span>
                  <span style={styles.detailValue}>{curso?.horario}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>📈 Progreso</span>
                  <span style={styles.detailValue}>{curso?.progreso}%</span>
                </div>
              </div>
              <div style={styles.barBg}>
                <div style={{ ...styles.barFill, width: `${curso?.progreso}%`, background: '#4f46e5' }} />
              </div>
              <div style={styles.detailActions}>
                <button style={styles.btnSecondary} onClick={handleVolver}>← Volver</button>
                <button style={styles.btnPrimary}>Editar Curso</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div style={styles.layout}>
      <Sidebar rol="docente" />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Mis Cursos</h1>
          <div style={styles.topbarUser}>👤 jose castro</div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Cursos Asignados</h2>
          <hr style={styles.divider} />
          <div style={styles.grid}>
            {cursos.map((c, i) => (
              <div key={i} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>📚</span>
                  <span style={styles.badgeActivo}>{c.estado}</span>
                </div>
                <h3 style={styles.cardTitle}>{c.nombre}</h3>
                <p style={styles.cardInfo}>👥 {c.estudiantes} estudiantes</p>
                <p style={styles.cardInfo}>🕐 {c.horario}</p>
                <div style={styles.progressLabel}>
                  <span style={styles.progressText}>Progreso del curso</span>
                  <span style={styles.progressValue}>{c.progreso}%</span>
                </div>
                <div style={styles.barBg}>
                  <div style={{
                    ...styles.barFill,
                    width: `${c.progreso}%`,
                    background: c.progreso >= 70 ? '#16a34a' : '#4f46e5',
                  }} />
                </div>
                <button style={styles.btnPrimary} onClick={() => handleVerCurso(c.nombre)}>Ver Curso →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#f1f5f9' },
  main: { marginLeft: '220px', flex: 1, display: 'flex', flexDirection: 'column' },
  topbar: {
    background: 'linear-gradient(135deg, #4f46e5, #3730a3)',
    color: 'white', padding: '18px 32px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  topbarTitle: { fontSize: '22px', fontWeight: '600' },
  topbarUser: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.2)', padding: '8px 16px',
    borderRadius: '20px', fontSize: '14px',
  },
  content: { padding: '32px' },
  sectionTitle: { fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' },
  divider: { border: 'none', borderTop: '2px solid #4f46e5', marginBottom: '24px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  card: {
    background: 'white', borderRadius: '12px', padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '4px solid #4f46e5',
    display: 'flex', flexDirection: 'column', gap: '10px',
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardIcon: { fontSize: '32px' },
  badgeActivo: {
    padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
    fontWeight: '500', background: '#dcfce7', color: '#16a34a',
  },
  cardTitle: { fontSize: '16px', fontWeight: '700', color: '#1e293b' },
  cardInfo: { fontSize: '13px', color: '#64748b' },
  progressLabel: { display: 'flex', justifyContent: 'space-between' },
  progressText: { fontSize: '12px', color: '#64748b' },
  progressValue: { fontSize: '12px', fontWeight: '700', color: '#4f46e5' },
  barBg: { height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: '4px' },
  btnPrimary: {
    marginTop: '8px', padding: '10px', background: '#4f46e5',
    color: 'white', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '500',
  },
  detailCard: {
    background: 'white', borderRadius: '12px', padding: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', maxWidth: '800px',
  },
  detailHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  detailIcon: { fontSize: '48px' },
  detailDesc: { fontSize: '16px', color: '#64748b', marginBottom: '24px', lineHeight: '1.6' },
  detailGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' },
  detailItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  detailLabel: { fontSize: '12px', color: '#64748b', textTransform: 'uppercase' },
  detailValue: { fontSize: '18px', fontWeight: '600', color: '#1e293b' },
  detailActions: { display: 'flex', gap: '12px', marginTop: '24px' },
  btnSecondary: {
    padding: '12px 24px', background: '#f1f5f9', color: '#64748b',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '14px', fontWeight: '500',
  },
}

export default Cursos