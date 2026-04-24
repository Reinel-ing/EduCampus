# EduCampus - Prototipo No Funcional

Plataforma educativa con tres roles de usuario: Administrador, Docente y Estudiante.

## Roles de Usuario

| Rol | Correo | Contraseña |
|-----|--------|------------|
| Administrador | admin@edu.com | Admin123! |
| Docente | jose@edu.com | Docente123! |
| Estudiante | kevin@edu.com | Est123! |

## Pantallas

1. Login - Inicio de sesión por rol
2. Panel de Administración - Estadísticas, usuarios y actividad reciente
3. Panel de Docente - Cursos, estudiantes, calificaciones, asistencia y material
4. Panel de Estudiante - Cursos, notas, asistencia, materiales, horario y calendario
5. Gestión de Usuarios - Crear, editar y eliminar usuarios
6. Gestión de Cursos - Ver y administrar cursos con progreso
7. Matrículas - Registrar y eliminar matrículas
8. Calificaciones - Notas por parciales con promedio automático
9. Asistencia (Docente) - Registro diario de presentes y ausentes
10. Asistencia (Estudiante) - Vista de solo lectura del registro de asistencia
11. Material Didáctico - Subir y descargar archivos
12. Horarios - Tabla semanal de clases
13. Calendario - Fechas de exámenes y entregas
14. Reportes - Métricas académicas generales
15. Configuración - Perfil del administrador y ajustes del sistema

## Requisitos

- Node.js v18 o superior
- npm v9 o superior

## Instalación y Despliegue

### 1. Clonar el repositorio
git clone https://github.com/tu-usuario/educampus-prototipo.git

### 2. Entrar a la carpeta
cd educampus

### 3. Instalar dependencias
npm install

### 4. Iniciar el proyecto
npm run dev

### 5. Abrir en el navegador
http://localhost:5173

## Tecnologías

- React 18
- Vite
- React Router DOM v6
- localStorage (manejo de sesión)