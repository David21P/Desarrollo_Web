# Estrategias de despliegue con Docker: Ferretería El Tornillo

Manual práctico para desplegar la aplicación **Ferretería El Tornillo** con Docker usando tres estrategias: **Recreate**, **Blue-Green** y **Canary**.

- **Autor:** Javier David Pirir Gómez (carnet 9490-22-15282)
- **Curso:** Desarrollo Web, Universidad Mariano Gálvez de Guatemala
- **Rama:** `Tarea6`

## Versiones de la aplicación

| Versión | Origen | Comportamiento |
|---|---|---|
| `v1` | Tarea 4 | API sin autenticación. `POST /api/recursos` sin token responde `201`. |
| `v2` | Tarea 5 | API con JWT (expira en 5 min). `POST /api/recursos` sin token responde `401`. |

Ambas exponen `GET /api/version`, que devuelve la versión de la imagen en ejecución.

## Estructura

```
despliegue/
  Dockerfile.backend     # Node 20 (compartido por v1 y v2)
  Dockerfile.frontend    # Vite + Nginx, dos etapas (compartido)
  v1/                    # Código de la Tarea 4
  v2/                    # Código de la Tarea 5
  recreate/              # Estrategia 1
  bluegreen/             # Estrategia 2
  canary/                # Estrategia 3
```

## Requisitos

- Docker con Docker Compose v2 (probado con Docker 28.0.1 y Compose v2.33.1)
- Git
- Puerto **8080** libre (y el **8081** para Blue-Green). Se ejecuta una estrategia a la vez.

## 1. Clonar

```bash
git clone https://github.com/David21P/Desarrollo_Web.git
cd Desarrollo_Web
git checkout Tarea6
```

## 2. Construir las imágenes

Desde la raíz del repositorio:

```bash
docker build -f despliegue/Dockerfile.backend --build-arg APP_VERSION=v1 -t ferreteria-api:v1 despliegue/v1/backend
docker build -f despliegue/Dockerfile.backend --build-arg APP_VERSION=v2 -t ferreteria-api:v2 despliegue/v2/backend
docker build -f despliegue/Dockerfile.frontend -t ferreteria-web:v1 despliegue/v1
docker build -f despliegue/Dockerfile.frontend -t ferreteria-web:v2 despliegue/v2
docker images
```

## 3. Credenciales

**El repositorio no contiene contraseñas ni tokens.** El `JWT_SECRET` se entrega en tiempo de ejecución desde un archivo `.env` local, que está en el `.gitignore`.

En la carpeta de la estrategia que vayas a ejecutar crea un archivo `.env`:

```
JWT_SECRET=<clave larga y aleatoria>
```

Ejemplo para generar la clave:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

En `recreate/` puedes copiar `.env.example` como punto de partida. Si falta `JWT_SECRET`, Compose se detiene con un mensaje claro.

## 4. Estrategias

Cada una se ejecuta desde su carpeta. Para verificar que responde:

```bash
curl http://localhost:8080/api/version
```

y abre `http://localhost:8080` en el navegador.

### Estrategia 1: Recreate (`despliegue/recreate`)

Se detiene la versión actual y se levanta la nueva en su lugar. **Hay una caída** durante el cambio (≈ 15 s medidos).

| Acción | Comando |
|---|---|
| Iniciar v1 | `VERSION=v1 docker compose up -d` |
| Actualizar a v2 | `VERSION=v2 docker compose up -d` |
| Rollback a v1 | `VERSION=v1 docker compose up -d` |
| Estado | `docker compose ps` |
| Detener | `docker compose down` |

En PowerShell: `$env:VERSION="v1"; docker compose up -d`.

### Estrategia 2: Blue-Green (`despliegue/bluegreen`)

Dos entornos completos: **blue** (v1, producción) y **green** (v2). Green se prueba en el puerto **8081** y luego se cambia el tráfico con un cambio de archivo y una recarga de Nginx. **Sin caída** en las pruebas.

| Acción | Comando |
|---|---|
| Iniciar blue | `docker compose up -d mongo api-blue web-blue gateway` |
| Preparar green | `docker compose up -d api-green web-green` |
| Probar green | `curl http://localhost:8081/api/version` |
| Cambiar a green | `cp gateway/green.inc gateway/active.inc && docker compose exec gateway nginx -s reload` |
| Rollback a blue | `cp gateway/blue.inc gateway/active.inc && docker compose exec gateway nginx -s reload` |
| Detener | `docker compose down` |

En PowerShell: `Copy-Item gateway\green.inc gateway\active.inc -Force`.

### Estrategia 3: Canary (`despliegue/canary`)

Nginx reparte las peticiones de `/api/` entre v1 y v2 con `split_clients`. Se sube el porcentaje de forma gradual: 10 %, 50 % y 100 %. Solo se reparte la API; la interfaz se mantiene en v1.

| Acción | Comando |
|---|---|
| Iniciar (10 % a v2) | `docker compose up -d` |
| Validar configuración | `docker compose exec gateway nginx -t` |
| Medir el reparto | `curl` repetido a `/api/version` (ver abajo) |
| Subir al 50 % | `cp gateway/canary50.inc gateway/active.inc && docker compose exec gateway nginx -s reload` |
| Promover al 100 % | `cp gateway/canary100.inc gateway/active.inc && docker compose exec gateway nginx -s reload` |
| Rollback (0 % a v2) | `cp gateway/canary0.inc gateway/active.inc && docker compose exec gateway nginx -s reload` |
| Detener | `docker compose down` |

Medir el reparto en PowerShell (100 peticiones):

```powershell
1..100 | ForEach-Object { (Invoke-RestMethod http://localhost:8080/api/version).version } | Group-Object | Select-Object Name, Count
```

## Resultados

| Estrategia | Caída al actualizar | Rollback | Recursos |
|---|---|---|---|
| Recreate | ≈ 15 s | ≈ 11,5 s (con caída) | 4 contenedores |
| Blue-Green | Ninguna observada | Instantáneo | 6 contenedores |
| Canary | Ninguna observada | Instantáneo | 5 contenedores |

Reparto medido en Canary (100 peticiones): 10 % → 86 v1 / 14 v2, 50 % → 55 v1 / 45 v2, 100 % → 0 v1 / 100 v2.

## Limitaciones principales

- **Recreate:** hay caída y no se puede probar la versión nueva antes de exponerla.
- **Blue-Green:** duplica recursos y comparte la base de datos entre ambos entornos; el cambio es total.
- **Canary:** el reparto es estadístico y por petición (sin afinidad por usuario). Como v1 no envía token y v2 lo exige, durante el canary algunas peticiones de v1 pueden recibir `401`.

El detalle, con capturas de cada paso, está en el manual técnico (Word) entregado junto con esta tarea.

## Detener y limpiar

```bash
docker compose down        # conserva los datos de MongoDB
docker compose down -v     # también borra el volumen
```