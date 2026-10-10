# Tarea 3 - Tienda en Línea con Autenticación (Ferretería El Tornillo)

## Descripción del proyecto
Evolución del proyecto de la Tarea 2: se agregó un flujo de autenticación
simulada (Login / Logout / Perfil) mediante una arquitectura de estado
global, para que la sesión del usuario se comparta en toda la aplicación
sin pasar props manualmente entre componentes. El Login valida que los
campos no estén vacíos y registra la sesión con datos estructurados
(nombre, correo, rol y fecha de acceso). La Navbar reacciona en tiempo real
al estado de sesión, mostrando "Iniciar sesión" o el nombre del usuario
activo con acceso a su perfil y botón de cerrar sesión. La vista de Perfil
muestra los datos de sesión usando Card, Badge y ListGroup de
React-Bootstrap, con opción de cerrar sesión desde ahí mismo.

## Tecnología de estado seleccionada: Opción A - Context API + useReducer
Se eligió `useContext` + `useReducer` en lugar de Redux Toolkit porque el
alcance del estado global en este proyecto es pequeño (solo la sesión del
usuario), y React ya trae estas herramientas nativas — no hace falta una
librería externa ni la configuración adicional de una tienda Redux para un
caso de uso tan acotado. `AuthContext.jsx` centraliza el `useReducer` en un
`AuthProvider`, y expone el estado y el `dispatch` mediante el hook
personalizado `useAuth()`. El reducer gestiona 4 acciones: `LOGIN`,
`LOGOUT`, `LOGIN_ERROR` y `CLEAR_ERROR`.

## Sitio publicado


## Autor
Javier Pirir - Carnet: 9490-22-15282