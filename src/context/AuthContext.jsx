import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

// Lee la sesión guardada (si existe) al abrir la página
function crearEstadoInicial() {
  let usuarioGuardado = null;
  try {
    usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  } catch {
    usuarioGuardado = null;
  }
  return {
    isAuthenticated: !!usuarioGuardado,
    usuario: usuarioGuardado,
    error: null,
  };
}

// Reducer: gestiona las acciones sobre el estado de sesión
function authReducer(estado, accion) {
  switch (accion.type) {
    case "LOGIN":
      return {
        ...estado,
        isAuthenticated: true,
        usuario: accion.payload,
        error: null,
      };

    case "LOGOUT":
      return {
        ...estado,
        isAuthenticated: false,
        usuario: null,
        error: null,
      };

    case "SESION_EXPIRADA":
      return {
        ...estado,
        isAuthenticated: false,
        usuario: null,
        error: "Su sesión ya no es válida o ha caducado. Por favor, inicie sesión nuevamente.",
      };

    case "LOGIN_ERROR":
      return {
        ...estado,
        isAuthenticated: false,
        usuario: null,
        error: accion.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...estado,
        error: null,
      };

    default:
      return estado;
  }
}

// Contexto y proveedor centralizado
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [estado, dispatch] = useReducer(authReducer, null, crearEstadoInicial);
  const navigate = useNavigate();

  // Guarda o borra la sesión (usuario + token) en localStorage
  useEffect(() => {
    if (estado.usuario) {
      localStorage.setItem("usuario", JSON.stringify(estado.usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [estado.usuario]);

  // Escucha el aviso del cliente HTTP cuando el servidor responde 401
  useEffect(() => {
    function manejarSesionExpirada() {
      dispatch({ type: "SESION_EXPIRADA" });
      navigate("/login");
    }
    window.addEventListener("sesion-expirada", manejarSesionExpirada);
    return () => window.removeEventListener("sesion-expirada", manejarSesionExpirada);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ estado, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir el contexto sin pasar props manualmente
export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return contexto;
}