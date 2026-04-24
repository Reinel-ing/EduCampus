import Sidebar from '../components/Sidebar'

const datos = [
  { mes: 'Ene', inscritos: 20 },
  { mes: 'Feb', inscritos: 35 },
  { mes: 'Mar', inscritos: 28 },
  { mes: 'Abr', inscritos: 45 },
  { mes: 'May', inscritos: 38 },
  { mes: 'Jun', inscritos: 52 },
]

const maxVal = 60

function Reportes() {
  return (
    <div style={styles.layout}>
      <Sidebar rol="admin" />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Reportes</h1>
          <div style={styles.topbarUser}>👤 Administrador</div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Reportes del Sistema</h2>
          <hr style={styles.divider} />

          {/* CARDS */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📈</div>
              <p style={styles.statLabel}>TASA DE APROBACIÓN</p>
              <p style={styles.statValue}>87%</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📉</div>
              <p style={styles.statLabel}>TASA DE DESERCIÓN</p>
              <p style={styles.statValue}>13%</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⭐</div>
              <p style={styles.statLabel}>PROMEDIO GENERAL</p>
              <p style={styles.statValue}>4.1</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>✅</div>
              <p style={styles.statLabel}>ASISTENCIA PROM.</p>
              <p style={styles.statValue}>92%</p>
            </div>
          </div>

          {/* GRÁFICA DE BARRAS */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📊 Estudiantes Inscritos por Mes</h3>
            <hr style={styles.cardDivider} />
            <div style={styles.chart}>
              {datos.map((d, i) => (
                <div key={i} style={styles.barCol}>
                  <p style={styles.barValue}>{d.inscritos}</p>
                  <div style={styles.barWrap}>
                    <div style={{
                      ...styles.bar,
                      height: `${(d.inscritos / maxVal) * 160}px`,
                    }} />
                  </div>
                  <p style={styles.barLabel}>{d.mes}</p>
                </div>
              ))}
            </div>
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
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' },
  statCard: {
    background: 'white', borderRadius: '10px', padding: '24px',
    textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    borderTop: '3px solid #4f46e5',
  },
  statIcon: { fontSize: '40px', marginBottom: '10px' },
  statLabel: { fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' },
  statValue: { fontSize: '32px', fontWeight: '700', color: '#4f46e5' },
  card: { background: 'white', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  cardTitle: { fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' },
  cardDivider: { border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '24px' },
  chart: { display: 'flex', alignItems: 'flex-end', gap: '20px', justifyContent: 'center', height: '200px' },
  barCol: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  barValue: { fontSize: '12px', fontWeight: '700', color: '#4f46e5' },
  barWrap: { display: 'flex', alignItems: 'flex-end', height: '160px' },
  bar: { width: '48px', background: 'linear-gradient(180deg, #4f46e5, #818cf8)', borderRadius: '6px 6px 0 0' },
  barLabel: { fontSize: '12px', color: '#64748b', fontWeight: '500' },
}

export default Reportes