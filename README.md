# EduCampus - Prototipo No Funcional

EduCampus es una plataforma educativa web diseñada para simular la gestión académica de una institución. Este sistema permite la interacción entre tres tipos de usuarios: Administrador, Docente y Estudiante.

> Este proyecto corresponde a un prototipo no funcional, por lo tanto no cuenta con conexión a base de datos ni backend. Toda la información es simulada en el frontend.

---

## Objetivo del Proyecto

Desarrollar un prototipo navegable que represente la estructura de un sistema educativo real, permitiendo visualizar la experiencia del usuario, los roles del sistema y la interacción entre las diferentes pantallas.

---

## Roles de Usuario

El sistema cuenta con tres roles principales:

| Rol           | Correo         | Contraseña  |
|--------------|---------------|------------|
| Administrador | admin@edu.com | Admin123!  |
| Docente       | jose@edu.com  | Docente123!|
| Estudiante    | kevin@edu.com | Est123!    |

### Funcionalidades por Rol

#### Administrador
- Gestión de usuarios (crear, editar, eliminar)
- Administración de cursos
- Visualización de reportes
- Configuración del sistema
- Supervisión de actividad

#### Docente
- Gestión de cursos asignados
- Registro de asistencia
- Ingreso de calificaciones
- Subida de material didáctico
- Seguimiento de estudiantes

#### Estudiante
- Visualización de cursos matriculados
- Consulta de calificaciones
- Consulta de asistencia
- Acceso a materiales
- Visualización de horarios y calendario

---

## Módulos y Pantallas

El sistema cuenta con múltiples pantallas (más de 5 requeridas):

1. Login  
2. Panel de Administración  
3. Panel de Docente  
4. Panel de Estudiante  
5. Gestión de Usuarios  
6. Gestión de Cursos  
7. Matrículas  
8. Calificaciones  
9. Asistencia (Docente)  
10. Asistencia (Estudiante)  
11. Material Didáctico  
12. Horarios  
13. Calendario  
14. Reportes  
15. Configuración  

---

## Navegación del Sistema

El sistema es completamente navegable mediante un menú lateral (Sidebar) que cambia dinámicamente según el rol del usuario autenticado.

- El Administrador tiene acceso total  
- El Docente tiene acceso académico  
- El Estudiante tiene acceso de consulta  

---

## Simulación de Autenticación

El inicio de sesión se realiza de forma simulada utilizando:

- Validación de credenciales predefinidas  
- Manejo de sesión con `localStorage`  
- Redirección según rol  

---

## Tecnologías Utilizadas

- React 18  
- Vite  
- React Router DOM v6  
- JavaScript  
- localStorage  

---

## Requisitos

- Node.js v18 o superior  
- npm v9 o superior  

---

## Instalación y Ejecución

### 1. Clonar el repositorio
git clone https://github.com/Reinel-ing/EduCampus.git

### 2. Entrar a la carpeta
cd EduCampus

### 3. Instalar dependencias
npm install

### 4. Iniciar el proyecto
npm run dev

### 5. Abrir en el navegador
http://localhost:5173

Explicación del paso 5:

Después de ejecutar `npm run dev`, el sistema levanta un servidor local en tu computador.  
La dirección http://localhost:5173 es donde se ejecuta la aplicación.

---

## Tecnologías

- React  
- Vite  
- React Router DOM  
- localStorage  

---

## Autor

Reinel Alfaro-Jose Rodriguez
