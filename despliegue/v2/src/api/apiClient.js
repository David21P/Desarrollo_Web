const API_URL = import.meta.env.VITE_API_URL;

// Cliente centralizado: agrega el token a cada petición y vigila los 401
export async function apiFetch(ruta, opciones = {}) {
  let token = null;
  try {
    token = JSON.parse(localStorage.getItem("usuario"))?.token;
  } catch {
    token = null;
  }

  const headers = { "Content-Type": "application/json", ...opciones.headers };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const respuesta = await fetch(`${API_URL}${ruta}`, { ...opciones, headers });

  // Interceptor global: si el servidor responde 401, se cierra la sesión
  if (respuesta.status === 401) {
    localStorage.removeItem("usuario");
    window.dispatchEvent(new Event("sesion-expirada"));
  }

  return respuesta;
}