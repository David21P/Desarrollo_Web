# Tarea 4 - Backend con Node.js, Express y MongoDB (Ferretería El Tornillo)

## Descripción del proyecto
Evolución del proyecto de la Tarea 3: se conectó el frontend de React a un
backend real construido con Node.js, Express y MongoDB Atlas, reemplazando
la autenticación simulada y los datos estáticos de productos por una API
REST completa con persistencia real en base de datos.

La entidad principal gestionada es **Producto** (herramientas, materiales
y artículos de la ferretería), además de un sistema de registro e inicio
de sesión de usuarios con contraseñas cifradas (bcrypt).

## Entidad utilizada: Producto
Se eligió **Producto** como entidad de negocio para mantener la temática de
la ferretería usada en las tareas anteriores. Cada producto se guarda en
MongoDB con los siguientes campos:

- `nombre`: nombre del producto (obligatorio)
- `categoria`: categoría a la que pertenece, por ejemplo "Plomería" (obligatorio)
- `precio`: precio en quetzales (obligatorio)
- `disponible`: indica si el producto está disponible o agotado
- `createdAt` y `updatedAt`: fechas generadas automáticamente

## Autenticación de usuarios
La autenticación se resuelve a nivel de endpoints de la API:

- **Registro:** `POST /api/auth/register` crea el usuario en MongoDB con su
  nombre, correo, contraseña cifrada con bcrypt y rol (`cliente` por defecto).
- **Validación de usuario:** `POST /api/auth/login` compara el correo y la
  contraseña contra la base de datos.

En la página web, el inicio de sesión usa este endpoint: si el usuario está
registrado, ingresa y se muestra su perfil con los datos reales guardados en
la base de datos; si no está registrado o la contraseña es incorrecta, se
muestra el mensaje de error "Credenciales inválidas.".

El frontend no incluye una pantalla de registro: los usuarios nuevos se
crean enviando la petición de registro a la API (ver la colección de Postman,
peticiones "Registrar usuario" e "Iniciar sesión").

## CRUD de Productos
El CRUD completo está implementado sobre la entidad **Producto** y se puede
usar de dos formas:

- **Desde la interfaz web (página Productos):** las opciones de escritura
  disponibles son **Agregar producto** (formulario en modal), **Editar** y
  **Eliminar** (con confirmación). La tabla muestra los productos leídos
  directamente desde la API, con indicadores de carga y de error.
- **Desde las peticiones de Postman:** la colección incluye las peticiones
  para listar, filtrar por categoría, obtener por ID, crear, actualizar y
  eliminar productos.

## Arquitectura del backend
El backend sigue una estructura modular tipo MVC, separada en:

```
backend/
├── config/
│   └── db.js                 # Conexión a MongoDB Atlas con manejo de errores
├── models/
│   ├── User.js                # Esquema de usuario (nombre, correo, contraseña, rol)
│   └── Producto.js            # Esquema de producto (nombre, categoría, precio, disponible)
├── controllers/
│   ├── authController.js      # Lógica de registro e inicio de sesión
│   └── productoController.js  # Lógica CRUD de productos
├── routes/
│   ├── authRoutes.js          # Rutas /api/auth
│   └── productoRoutes.js      # Rutas /api/recursos
├── server.js                  # Punto de entrada: Express, middlewares, conexión a DB
├── .env.example                # Plantilla de variables de entorno (sin datos reales)
└── ferreteria-api.postman_collection.json  # Colección de Postman con todos los endpoints
```

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

## Credenciales de prueba
Para probar el inicio de sesión real desde el frontend, puede usar:
- **Correo:** javier@correo.com
- **Contraseña:** 123456

También puede registrar un usuario nuevo directamente contra la API
usando el endpoint `POST /api/auth/register` (ver la colección de
Postman en `backend/ferreteria-api.postman_collection.json`).

## Autor
Javier Pirir - Carnet: 9490-22-15282