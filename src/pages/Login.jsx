import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const USUARIOS = [
  { correo: 'admin@edu.com',      password: 'Admin123!',   rol: 'admin',      nombre: 'Administrador' },
  { correo: 'maria@edu.com',      password: 'Docente123!', rol: 'docente',    nombre: 'María López' },
  { correo: 'jose@edu.com',       password: 'Docente123!', rol: 'docente',    nombre: 'Jose Castro' },
  { correo: 'kevin@edu.com',      password: 'Est123!',     rol: 'estudiante', nombre: 'Kevin Perea' },
  { correo: 'laura@edu.com',      password: 'Est123!',     rol: 'estudiante', nombre: 'Laura Gómez' },
  { correo: 'andres@edu.com',     password: 'Est123!',     rol: 'estudiante', nombre: 'Andrés Torres' },
]

function Login() {
  const [correo, setCorreo]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const navigate = useNavigate()

  const limpiar = () => { setCorreo(''); setPassword(''); setError('') }

  const ingresar = () => {
    const found = USUARIOS.find(
      u => u.correo === correo.trim().toLowerCase() && u.password === password
    )
    if (!found) { setError('Correo o contraseña incorrectos.'); return }
    localStorage.setItem('rol',    found.rol)
    localStorage.setItem('nombre', found.nombre)
    localStorage.setItem('correo', found.correo)
    if (found.rol === 'admin')      navigate('/admin')
    if (found.rol === 'docente')    navigate('/docente')
    if (found.rol === 'estudiante') navigate('/estudiante')
  }

  const handleKey = (e) => { if (e.key === 'Enter') ingresar() }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.header}>
          <div style={styles.logo}>🎓</div>
          <div>
            <h1 style={styles.title}>EduCampus</h1>
            <p style={styles.subtitle}>Iniciar sesión</p>
          </div>
        </div>

        <div style={styles.info}>
          Bienvenido a la plataforma <strong>EduCampus</strong>. Ingresa según tu rol:
          Administrador, Docente o Estudiante.
          <br /><br />
          <strong>Usuarios de prueba:</strong><br />
          🔑 <b>Admin:</b> admin@edu.com / Admin123!<br />
          🔑 <b>Docente:</b> jose@edu.com / Docente123!<br />
          🔑 <b>Estudiante:</b> kevin@edu.com / Est123!
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Correo</label>
          <input
            style={styles.input}
            type="email"
            placeholder="correo@edu.com"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contraseña</label>
          <input
            style={styles.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>

        {error && (
          <div style={styles.errorBox}>⚠️ {error}</div>
        )}

        <div style={styles.buttons}>
          <button style={styles.btnClear}  onClick={limpiar}>Limpiar</button>
          <button style={styles.btnLogin}  onClick={ingresar}>Ingresar</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page:     { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f1f5f9' },
  card:     { background:'white', borderRadius:'12px', padding:'40px', width:'100%', maxWidth:'500px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  header:   { display:'flex', alignItems:'center', gap:'16px', marginBottom:'24px' },
  logo:     { width:'64px', height:'64px', background:'#1e293b', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' },
  title:    { fontSize:'24px', color:'#1e293b', margin:0 },
  subtitle: { fontSize:'14px', color:'#64748b', margin:0 },
  info:     { borderLeft:'4px solid #4f46e5', padding:'12px 16px', background:'#f8fafc', borderRadius:'4px', marginBottom:'24px', fontSize:'13px', color:'#64748b', lineHeight:'1.8' },
  formGroup:{ marginBottom:'18px' },
  label:    { display:'block', marginBottom:'6px', fontSize:'14px', color:'#1e293b', fontWeight:'500' },
  input:    { width:'100%', padding:'12px 14px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', outline:'none', boxSizing:'border-box' },
  errorBox: { background:'#fee2e2', color:'#ef4444', padding:'10px 14px', borderRadius:'8px', fontSize:'13px', marginBottom:'12px' },
  buttons:  { display:'flex', gap:'12px', marginTop:'8px' },
  btnClear: { flex:1, padding:'12px', background:'#e2e8f0', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px', color:'#1e293b' },
  btnLogin: { flex:1, padding:'12px', background:'#1e293b', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontWeight:'600' },
}

export default Login