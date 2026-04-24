import Sidebar from '../components/Sidebar'

const materiales = [
  { nombre: 'Introducción a HTML', tipo: 'PDF', curso: 'Programación Web', fecha: '10 Abr 2026', size: '2.3 MB' },
  { nombre: 'Guía de CSS Avanzado', tipo: 'PDF', curso: 'Programación Web', fecha: '12 Abr 2026', size: '1.8 MB' },
  { nombre: 'Ejercicios SQL', tipo: 'DOC', curso: 'Base de Datos', fecha: '15 Abr 2026', size: '890 KB' },
  { nombre: 'Video: Joins en SQL', tipo: 'VIDEO', curso: 'Base de Datos', fecha: '18 Abr 2026', size: '45 MB' },
  { nombre: 'Redes Neuronales - Slides', tipo: 'PPT', curso: 'Inteligencia Artificial', fecha: '20 Abr 2026', size: '5.1 MB' },
]

const tipoColor = {
  PDF: { bg: '#fee2e2', color: '#ef4444' },
  DOC: { bg: '#e0e7ff', color: '#4f46e5' },
  VIDEO: { bg: '#fef9c3', color: '#ca8a04' },
  PPT: { bg: '#dcfce7', color: '#16a34a' },
}

function MaterialDidactico() {
  return (
    <div style={styles.layout}>
      <Sidebar rol="docente" />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Material Didáctico</h1>
          <div style={styles.topbarUser}>👤 jose castro</div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Materiales Subidos</h2>
          <hr style={styles.divider} />
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📄</div>
              <p style={styles.statLabel}>TOTAL ARCHIVOS</p>
              <p style={styles.statValue}>5</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📚</div>
              <p style={styles.statLabel}>CURSOS CON MATERIAL</p>
              <p style={styles.statValue}>3</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>💾</div>
              <p style={styles.statLabel}>ESPACIO USADO</p>
              <p style={styles.statValue}>55MB</p>
            </div>
          </div>
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>Archivos Subidos</h3>
              <button style={styles.btnPrimary}>+ Subir Material</button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>NOMBRE</th>
                  <th style={styles.th}>TIPO</th>
                  <th style={styles.th}>CURSO</th>
                  <th style={styles.th}>FECHA</th>
                  <th style={styles.th}>TAMAÑO</th>
                  <th style={styles.th}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {materiales.map((m, i) => (
                  <tr key={i}>
                    <td style={styles.td}>📎 {m.nombre}</td>
                    <td style={styles.td}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px', fontSize: '11px',
                        fontWeight: '600', background: tipoColor[m.tipo].bg,
                        color: tipoColor[m.tipo].color,
                      }}>
                        {m.tipo}
                      </span>
                    </td>
                    <td style={styles.td}>{m.curso}</td>
                    <td style={styles.td}>{m.fecha}</td>
                    <td style={styles.td}>{m.size}</td>
                    <td style={styles.td}>
                      <button style={styles.btnEdit}>⬇️ Descargar</button>
                      <button style={styles.btnDelete}>🗑️ Eliminar</button>
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
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' },
  statCard: {
    background: 'white', borderRadius: '10px', padding: '24px',
    textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    borderTop: '3px solid #4f46e5',
  },
  statIcon: { fontSize: '36px', marginBottom: '8px' },
  statLabel: { fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' },
  statValue: { fontSize: '28px', fontWeight: '700', color: '#4f46e5' },
  tableCard: { background: 'white', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  tableTitle: { fontSize: '16px', fontWeight: '700', color: '#1e293b' },
  btnPrimary: {
    padding: '10px 20px', background: '#4f46e5', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left', padding: '12px', fontSize: '12px',
    textTransform: 'uppercase', color: '#64748b', borderBottom: '2px solid #e2e8f0',
  },
  td: { padding: '14px 12px', fontSize: '14px', color: '#1e293b', borderBottom: '1px solid #f1f5f9' },
  btnEdit: {
    padding: '6px 12px', background: '#e0e7ff', color: '#4f46e5',
    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', marginRight: '6px',
  },
  btnDelete: {
    padding: '6px 12px', background: '#fee2e2', color: '#ef4444',
    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
  },
}

export default MaterialDidactico