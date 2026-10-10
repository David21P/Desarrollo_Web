# Tarea 4 - Backend con Node.js, Express y MongoDB (Ferretería El Tornillo)

## Descripción del proyecto
Evolución del proyecto de la Tarea 3: se conectó el frontend de React a un
backend real construido con Node.js, Express y MongoDB Atlas, reemplazando
la autenticación simulada y los datos estáticos de productos por una API
REST completa con persistencia real en base de datos.

La entidad principal gestionada es **Producto** (herramientas, materiales
y artículos de la ferretería), además de un sistema de registro e inicio
de sesión de usuarios con contraseñas cifradas (bcrypt).

## Arquitectura del backend
El backend sigue una estructura modular tipo MVC, separada en:

backend/
├── config/
│ └── db.js # Conexión a MongoDB Atlas con manejo de errores
├── models/
│ ├── User.js # Esquema de usuario (nombre, correo, contraseña, rol)
│ └── Producto.js # Esquema de producto (nombre, categoría, precio, disponible)
├── controllers/
│ ├── authController.js # Lógica de registro e inicio de sesión
│ └── productoController.js # Lógica CRUD de productos
├── routes/
│ ├── authRoutes.js # Rutas /api/auth
│ └── productoRoutes.js # Rutas /api/recursos
├── server.js # Punto de entrada: Express, middlewares, conexión a DB
├── .env.example # Plantilla de variables de entorno (sin datos reales)
└── ferreteria-api.postman_collection.json # Colección de Postman con todos los endpoints


Las contraseñas se almacenan cifradas con **bcrypt**, y las variables
sensibles (cadena de conexión a MongoDB) se manejan con **dotenv**,
nunca subidas al repositorio (`.env` está en `.gitignore`).

## Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registra un nuevo usuario |
| POST | `/api/auth/login` | Inicia sesión y valida credenciales |
| GET | `/api/recursos` | Lista todos los productos (admite filtros `?categoria=` y `?nombre=`) |
| GET | `/api/recursos/:id` | Obtiene un producto por su ID |
| POST | `/api/recursos` | Crea un nuevo producto |
| PUT | `/api/recursos/:id` | Actualiza un producto existente |
| DELETE | `/api/recursos/:id` | Elimina un producto |

La colección completa de Postman con ejemplos de cada petición está en
`backend/ferreteria-api.postman_collection.json`.

## Sitios publicados
- **Frontend (Netlify):** https://ferreteriatarea4j.netlify.app
- **Backend (Render):** https://ferreteria-backend-ah51.onrender.com

> Nota: el backend está en un plan gratuito de Render, por lo que puede
> tardar entre 30 y 50 segundos en responder la primera petición después
> de un período de inactividad.

## Tecnologías utilizadas
- **Frontend:** React, React Router, React-Bootstrap, Vite
- **Backend:** Node.js, Express, Mongoose
- **Base de datos:** MongoDB Atlas (plan gratuito M0)
- **Autenticación:** bcrypt para cifrado de contraseñas
- **Despliegue:** Netlify (frontend) y Render (backend)

## Autor
Javier Pirir - Carnet: 9490-22-15282