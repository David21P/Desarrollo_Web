import { createContext, useContext, useReducer } from "react";

// Estado inicial de la sesión
const estadoInicial = {
  isAuthenticated: false,
  usuario: null,
  error: null,
};

// Reducer: gestiona 4 acciones sobre el estado de sesión
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
  const [estado, dispatch] = useReducer(authReducer, estadoInicial);

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