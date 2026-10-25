# Tarea 5 - Seguridad con JWT (Ferretería El Tornillo)

Evolución de la Tarea 4: la API ahora usa **autenticación stateless con JSON Web Tokens (JWT)**. El login devuelve un token que expira a los **5 minutos**, el backend protege las rutas de escritura con un middleware, y el frontend adjunta el token automáticamente y cierra la sesión cuando el servidor responde 401.

## Enlaces

- Repositorio: https://github.com/David21P/Desarrollo_Web (rama `Tarea5`)
- Frontend (Netlify): https://ferreteriatarea5j.netlify.app
- Backend (Render): https://ferreteria-backend-tarea5.onrender.com

## Entidad utilizada: Producto

La entidad de negocio es **Producto** (`nombre`, `categoria`, `precio`, `disponible`). Se administra con un CRUD completo, tanto desde la interfaz web como con requests directos a la API (ver colección de Postman).

## Autenticación de usuarios

- `POST /api/auth/register`: registra un usuario (contraseña cifrada con bcrypt).
- `POST /api/auth/login`: valida las credenciales y **devuelve un JWT** junto con los datos del usuario.
- En la interfaz, si el usuario está registrado ingresa a su perfil; si no, se muestra un error.

## Cómo funciona el JWT

### Backend

- **Configuración en `.env`** (nunca se sube al repositorio; solo existe `backend/.env.example` con valores de relleno):

```
  JWT_SECRET=clave_secreta_larga_y_aleatoria
  JWT_EXPIRES_IN=5m
```

- **Firma del token** (`controllers/authController.js`): al iniciar sesión se genera el token con `jwt.sign`, con payload `{ id, email, role }` y expiración tomada de `JWT_EXPIRES_IN` (5 minutos):

```javascript
  jwt.sign(
    { id: usuario._id, email: usuario.correo, role: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
```

- **Middleware reutilizable** (`middleware/authMiddleware.js`): lee el encabezado `Authorization: Bearer <token>` y verifica el token con `jwt.verify`.
  - Sin encabezado o sin token: **401** `token_requerido`.
  - Token vencido (`TokenExpiredError`): **401** con el JSON:

```json
    {
      "error": "token_expired",
      "message": "La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente."
    }
```

  - Token inválido: **401** `token_invalido`.

- **Rutas protegidas** (`routes/productoRoutes.js`): `POST`, `PUT` y `DELETE` de productos usan el middleware. Los `GET` quedan públicos para consultar el catálogo.

### Frontend

- **Almacenamiento del token:** al iniciar sesión, el usuario y su token se guardan en `localStorage` (clave `usuario`) y en el estado global (`AuthContext` con `useReducer`). Al recargar la página la sesión se conserva.
- **Cliente HTTP centralizado** (`src/api/apiClient.js`): la función `apiFetch` agrega automáticamente `Authorization: Bearer <token>` a todas las peticiones a la API.
- **Interceptor global de respuestas 401:** si la API responde 401, `apiFetch` borra el token y los datos del usuario de `localStorage` y emite el evento `sesion-expirada`.
- **Cierre de sesión y redirección:** el `AuthProvider` escucha ese evento, ejecuta `dispatch({ type: "SESION_EXPIRADA" })` (equivalente a LOGOUT, con mensaje) y redirige a `/login` con `useNavigate`. La pantalla de login muestra un `Alert` con el texto: *"Su sesión ya no es válida o ha caducado. Por favor, inicie sesión nuevamente."*

## Endpoints disponibles

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/api/auth/register` | Público | Registrar usuario |
| POST | `/api/auth/login` | Público | Iniciar sesión y obtener JWT |
| GET | `/api/recursos` | Público | Listar productos (`?categoria=`, `?nombre=`) |
| GET | `/api/recursos/:id` | Público | Obtener un producto |
| POST | `/api/recursos` | **Protegido (JWT)** | Crear producto |
| PUT | `/api/recursos/:id` | **Protegido (JWT)** | Actualizar producto |
| DELETE | `/api/recursos/:id` | **Protegido (JWT)** | Eliminar producto |

El rol del usuario viaja dentro del token; la autorización por rol (por ejemplo, solo `admin` puede modificar productos) queda como mejora futura.

## Arquitectura del backend

```
backend/
├── config/
│   └── db.js                  # Conexión a MongoDB
├── models/
│   ├── User.js                # Esquema de usuario
│   └── Producto.js            # Esquema de producto
├── controllers/
│   ├── authController.js      # Registro e inicio de sesión (emite el JWT)
│   └── productoController.js  # Lógica CRUD de productos
├── middleware/
│   └── authMiddleware.js      # Verificación del JWT (Bearer)
├── routes/
│   ├── authRoutes.js          # Rutas /api/auth
│   └── productoRoutes.js      # Rutas /api/recursos
├── server.js                  # Punto de entrada
├── .env.example               # Plantilla de variables de entorno
└── ferreteria-api-tarea5.postman_collection.json
```

## Colección de Postman

Archivo: `backend/ferreteria-api-tarea5.postman_collection.json` (importar en Postman). Incluye las requests de la Tarea 4 y tres nuevas:

1. **Tarea5 - Login (obtener token):** hace login y guarda el token en la variable `token` de la colección (script post-response).
2. **Tarea5 - Crear producto (token válido):** `POST /api/recursos` con `Authorization: Bearer {{token}}`. Responde **201**.
3. **Tarea5 - Crear producto (token expirado 401):** la misma petición enviada **más de 5 minutos después** del login. Responde **401** con `token_expired` (incluye un ejemplo guardado con la respuesta).

Para repetir la prueba: ejecutar el login, esperar 5 minutos sin volver a hacer login y enviar la request 3.

## Cómo probar en el sitio publicado

1. Entrar a **Productos** sin sesión: la lista carga (GET público).
2. Intentar **Agregar producto** sin sesión: redirige a `/login` con el aviso de sesión no válida.
3. Iniciar sesión con las credenciales de prueba y agregar un producto: se guarda correctamente.
4. Esperar 5 minutos e intentar guardar otro: la sesión se cierra y se redirige a `/login` con el mensaje de sesión caducada.

## Tecnologías utilizadas

- **Backend:** Node.js, Express, MongoDB Atlas, Mongoose, bcryptjs, jsonwebtoken, dotenv, cors.
- **Frontend:** React, Vite, React Router, React-Bootstrap, Context API + useReducer.
- **Despliegue:** Render (backend) y Netlify (frontend).

## Credenciales de prueba

- Correo: `javier@correo.com`
- Contraseña: `123456`


Javier Pirir | 9490-22-15282 | David21P 
Trabajo individual: backend (login con JWT, middleware de autenticación, protección de rutas), frontend (almacenamiento del token, cliente HTTP centralizado, interceptor 401, redirección), despliegue en Render y Netlify, colección de Postman y documentación. |