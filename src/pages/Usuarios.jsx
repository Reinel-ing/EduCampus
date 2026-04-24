import { useNavigate, useSearchParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const usuarios = [
  { nombre: 'Carlos Pérez', correo: 'carlos@edu.com', rol: 'Administrador', estado: 'Activo' },
  { nombre: 'Jose Castro', correo: 'docente@edu.com', rol: 'Docente', estado: 'Activo' },
  { nombre: 'María López', correo: 'maria@edu.com', rol: 'Docente', estado: 'Activo' },
  { nombre: 'Kevin Perea', correo: 'estudiante@edu.com', rol: 'Estudiante', estado: 'Activo' },
  { nombre: 'Laura Gómez', correo: 'laura@edu.com', rol: 'Estudiante', estado: 'Activo' },
  { nombre: 'Andrés Torres', correo: 'andres@edu.com', rol: 'Estudiante', estado: 'Activo' },
]

const badgeColors = {
  Administrador: { background: '#e0e7ff', color: '#4f46e5' },
  Docente: { background: '#dcfce7', color: '#16a34a' },
  Estudiante: { background: '#fef9c3', color: '#ca8a04' },
}

function Usuarios() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const action = searchParams.get('action')
  const usuarioEditar = searchParams.get('usuario')

  const handleNuevoUsuario = () => {
    navigate('/usuarios?action=nuevo')
  }

  const handleEditar = (nombre) => {
    navigate(`/usuarios?action=editar&usuario=${encodeURIComponent(nombre)}`)
  }

  const handleEliminar = (nombre) => {
    if (confirm(`¿Está seguro de eliminar el usuario "${nombre}"?`)) {
      alert(`Usuario "${nombre}" eliminado`)
    }
  }

  const handleVolver = () => {
    navigate('/usuarios')
  }

  // Mostrar formulario de nuevo usuario
  if (action === 'nuevo') {
    return (
      <div style={styles.layout}>
        <Sidebar rol="admin" />
        <div style={styles.main}>
          <div style={styles.topbar}>
            <h1 style={styles.topbarTitle}>Gestión de Usuarios</h1>
            <div style={styles.topbarUser}>👤 Administrador</div>
          </div>
          <div style={styles.content}>
            <h2 style={styles.sectionTitle}>➕ Nuevo Usuario</h2>
            <hr style={styles.divider} />
            <div style={styles.formCard}>
              <form style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre Completo</label>
                  <input style={styles.input} type="text" placeholder="Ingrese el nombre" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Correo Electrónico</label>
                  <input style={styles.input} type="email" placeholder="correo@edu.com" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Rol</label>
                  <select style={styles.input}>
                    <option value="">Seleccione un rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Docente">Docente</option>
                    <option value="Estudiante">Estudiante</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Contraseña</label>
                  <input style={styles.input} type="password" placeholder="********" />
                </div>
                <div style={styles.formButtons}>
                  <button type="button" style={styles.btnSecondary} onClick={handleVolver}>Cancelar</button>
                  <button type="button" style={styles.btnPrimary} onClick={() => alert('Usuario creado exitosamente!')}>Crear Usuario</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar formulario de editar usuario
  if (action === 'editar' && usuarioEditar) {
    return (
      <div style={styles.layout}>
        <Sidebar rol="admin" />
        <div style={styles.main}>
          <div style={styles.topbar}>
            <h1 style={styles.topbarTitle}>Gestión de Usuarios</h1>
            <div style={styles.topbarUser}>👤 Administrador</div>
          </div>
          <div style={styles.content}>
            <h2 style={styles.sectionTitle}>✏️ Editar Usuario: {decodeURIComponent(usuarioEditar)}</h2>
            <hr style={styles.divider} />
            <div style={styles.formCard}>
              <form style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre Completo</label>
                  <input style={styles.input} type="text" defaultValue={decodeURIComponent(usuarioEditar)} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Correo Electrónico</label>
                  <input style={styles.input} type="email" placeholder="correo@edu.com" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Rol</label>
                  <select style={styles.input}>
                    <option value="Docente">Docente</option>
                    <option value="Estudiante">Estudiante</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
                <div style={styles.formButtons}>
                  <button type="button" style={styles.btnSecondary} onClick={handleVolver}>Cancelar</button>
                  <button type="button" style={styles.btnPrimary} onClick={() => alert('Usuario actualizado exitosamente!')}>Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div style={styles.layout}>
      <Sidebar rol="admin" />

      <div style={styles.main}>
        {/* TOPBAR */}
        <div style={styles.topbar}>
          <h1 style={styles.topbarTitle}>Gestión de Usuarios</h1>
          <div style={styles.topbarUser}>👤 Administrador</div>
        </div>

        {/* CONTENIDO */}
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Usuarios del Sistema</h2>
          <hr style={styles.divider} />

          {/* TABLA */}
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>Lista de Usuarios</h3>
              <button style={styles.btnPrimary} onClick={handleNuevoUsuario}>+ Nuevo Usuario</button>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>NOMBRE</th>
                  <th style={styles.th}>CORREO</th>
                  <th style={styles.th}>ROL</th>
                  <th style={styles.th}>ESTADO</th>
                  <th style={styles.th}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, i) => (
                  <tr key={i}>
                    <td style={styles.td}>{u.nombre}</td>
                    <td style={styles.td}>{u.correo}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, ...badgeColors[u.rol] }}>
                        {u.rol}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.badgeActivo}>{u.estado}</span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.btnEdit} onClick={() => handleEditar(u.nombre)}>✏️ Editar</button>
                      <button style={styles.btnDelete} onClick={() => handleEliminar(u.nombre)}>🗑️ Eliminar</button>
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
  layout: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f1f5f9',
  },
  main: {
    marginLeft: '220px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  topbar: {
    background: 'linear-gradient(135deg, #4f46e5, #3730a3)',
    color: 'white',
    padding: '18px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topbarTitle: {
    fontSize: '22px',
    fontWeight: '600',
  },
  topbarUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.2)',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
  },
  content: {
    padding: '32px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
  },
  divider: {
    border: 'none',
    borderTop: '2px solid #4f46e5',
    marginBottom: '24px',
  },
  tableCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  tableTitle: {
    fontSize: '16px',
    color: '#1e293b',
    fontWeight: '600',
  },
  btnPrimary: {
    padding: '10px 20px',
    background: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#64748b',
    borderBottom: '2px solid #e2e8f0',
  },
  td: {
    padding: '14px 12px',
    fontSize: '14px',
    color: '#1e293b',
    borderBottom: '1px solid #f1f5f9',
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  badgeActivo: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    background: '#dcfce7',
    color: '#16a34a',
  },
  btnEdit: {
    padding: '6px 14px',
    background: '#e0e7ff',
    color: '#4f46e5',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    marginRight: '6px',
  },
  btnDelete: {
    padding: '6px 14px',
    background: '#fee2e2',
    color: '#ef4444',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  formCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    maxWidth: '600px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
  },
  formButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '12px',
  },
  btnSecondary: {
    padding: '12px 24px',
    background: '#f1f5f9',
    color: '#64748b',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
}

export default Usuarios