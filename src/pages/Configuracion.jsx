import { useState } from 'react'
import Sidebar from '../components/Sidebar'

function Configuracion() {
  const [perfil, setPerfil] = useState({ nombre: 'Carlos Pérez', correo: 'admin@edu.com', telefono: '+57 300 000 0000' })
  const [sistema, setSistema] = useState({ institucion: 'EduCampus', anio: '2026', idioma: 'Español' })
  const [seguridad, setSeguridad] = useState({ actual: '', nueva: '', confirmar: '' })

  const handleGuardarPerfil = () => {
    alert('Perfil guardado exitosamente!')
  }

  const handleGuardarSistema = () => {
    alert('Configuración del sistema guardada!')
  }

  const handleCambiarPassword = () => {
    if (!seguridad.actual || !seguridad.nueva || !seguridad.confirmar) {
      alert('Por favor complete todos los campos de contraseña')
      return
    }
    if (seguridad.nueva !== seguridad.confirmar) {
      alert('Las contraseñas no coinciden')
      return
    }
    alert('Contraseña cambiada exitosamente!')
    setSeguridad({ actual: '', nueva: '', confirmar: '' })
  }
  return (
    <div style={styles.layout}>
      <Sidebar rol="admin" />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Configuración</h1>
          <div style={styles.topbarUser}>👤 Administrador</div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Configuración del Sistema</h2>
          <hr style={styles.divider} />

          <div style={styles.grid}>

            {/* PERFIL */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>👤 Perfil del Administrador</h3>
              <hr style={styles.cardDivider} />
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre completo</label>
                <input style={styles.input} defaultValue="Carlos Pérez" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Correo electrónico</label>
                <input style={styles.input} defaultValue="admin@edu.com" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Teléfono</label>
                <input style={styles.input} defaultValue={perfil.telefono} onChange={(e) => setPerfil({...perfil, telefono: e.target.value})} />
              </div>
              <button style={styles.btnPrimary} onClick={handleGuardarPerfil}>💾 Guardar Cambios</button>
            </div>

            {/* SISTEMA */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>⚙️ Configuración General</h3>
              <hr style={styles.cardDivider} />
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre de la institución</label>
                <input style={styles.input} defaultValue="EduCampus" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Año académico</label>
                <input style={styles.input} defaultValue="2026" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Idioma del sistema</label>
                <select style={styles.input} value={sistema.idioma} onChange={(e) => setSistema({...sistema, idioma: e.target.value})}>
                  <option>Español</option>
                  <option>Inglés</option>
                </select>
              </div>
              <button style={styles.btnPrimary} onClick={handleGuardarSistema}>💾 Guardar Cambios</button>
            </div>

            {/* SEGURIDAD */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>🔒 Seguridad</h3>
              <hr style={styles.cardDivider} />
              <div style={styles.formGroup}>
                <label style={styles.label}>Contraseña actual</label>
                <input style={styles.input} type="password" placeholder="••••••••" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nueva contraseña</label>
                <input style={styles.input} type="password" placeholder="••••••••" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Confirmar contraseña</label>
                <input style={styles.input} type="password" placeholder="••••••••" value={seguridad.confirmar} onChange={(e) => setSeguridad({...seguridad, confirmar: e.target.value})}/>
              </div>
              <button style={styles.btnPrimary} onClick={handleCambiarPassword}>🔑 Cambiar Contraseña</button>
            </div>

            {/* NOTIFICACIONES */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>🔔 Notificaciones</h3>
              <hr style={styles.cardDivider} />
              {[
                'Notificar nuevos usuarios',
                'Notificar nuevos cursos',
                'Alertas de sistema',
                'Reportes automáticos semanales',
              ].map((item, i) => (
                <div key={i} style={styles.toggleRow}>
                  <span style={styles.toggleLabel}>{item}</span>
                  <div style={styles.toggleOn}>✓</div>
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
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  card: { background: 'white', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  cardTitle: { fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' },
  cardDivider: { border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '16px' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '6px', fontWeight: '500' },
  input: {
    width: '100%', padding: '10px 14px',
    border: '1px solid #e2e8f0', borderRadius: '8px',
    fontSize: '14px', outline: 'none', color: '#1e293b',
  },
  btnPrimary: {
    padding: '10px 20px', background: '#4f46e5',
    color: 'white', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginTop: '8px',
  },
  toggleRow: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '12px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  toggleLabel: { fontSize: '14px', color: '#1e293b' },
  toggleOn: {
    width: '28px', height: '28px', background: '#4f46e5',
    borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: '700',
  },
}

export default Configuracion