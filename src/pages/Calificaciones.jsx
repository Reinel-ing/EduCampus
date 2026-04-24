import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const calificaciones = [
  { nombre: 'Kevin Perea', curso: 'Programación Web', parcial1: 4.5, parcial2: 4.2, final: 4.8, promedio: 4.5 },
  { nombre: 'Laura Gómez', curso: 'Programación Web', parcial1: 3.8, parcial2: 4.0, final: 4.2, promedio: 4.0 },
  { nombre: 'Andrés Torres', curso: 'Base de Datos', parcial1: 3.5, parcial2: 3.8, final: 4.0, promedio: 3.8 },
  { nombre: 'María Ruiz', curso: 'Base de Datos', parcial1: 4.8, parcial2: 4.9, final: 5.0, promedio: 4.9 },
  { nombre: 'Carlos Díaz', curso: 'Inteligencia Artificial', parcial1: 3.2, parcial2: 3.5, final: 3.8, promedio: 3.5 },
  { nombre: 'Sofía Martínez', curso: 'Inteligencia Artificial', parcial1: 4.3, parcial2: 4.4, final: 4.5, promedio: 4.4 },
]

function getColor(val) {
  if (val >= 4.5) return '#16a34a'
  if (val >= 3.5) return '#4f46e5'
  return '#ef4444'
}

function Calificaciones() {
  const handleExportar = () => {
    alert('Exportando calificaciones a Excel/PDF...')
  }
  return (
    <div style={styles.layout}>
      <Sidebar rol="docente" />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Calificaciones</h1>
          <div style={styles.topbarUser}>👤 jose castro</div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Registro de Calificaciones</h2>
          <hr style={styles.divider} />

          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>Calificaciones por Estudiante</h3>
              <button style={styles.btnPrimary} onClick={handleExportar}>📥 Exportar</button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ESTUDIANTE</th>
                  <th style={styles.th}>CURSO</th>
                  <th style={styles.th}>PARCIAL 1</th>
                  <th style={styles.th}>PARCIAL 2</th>
                  <th style={styles.th}>FINAL</th>
                  <th style={styles.th}>PROMEDIO</th>
                </tr>
              </thead>
              <tbody>
                {calificaciones.map((c, i) => (
                  <tr key={i}>
                    <td style={styles.td}>🎓 {c.nombre}</td>
                    <td style={styles.td}>{c.curso}</td>
                    <td style={styles.td}>
                      <span style={{ color: getColor(c.parcial1), fontWeight: '600' }}>{c.parcial1}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ color: getColor(c.parcial2), fontWeight: '600' }}>{c.parcial2}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ color: getColor(c.final), fontWeight: '600' }}>{c.final}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        padding: '4px 12px', borderRadius: '20px', fontSize: '13px',
                        fontWeight: '700', background: getColor(c.promedio) + '20',
                        color: getColor(c.promedio),
                      }}>
                        {c.promedio}
                      </span>
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
}

export default Calificaciones