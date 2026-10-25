import { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = `${import.meta.env.VITE_API_URL}/auth/login`;

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargando, setCargando] = useState(false);
  const { estado, dispatch } = useAuth();
  const navigate = useNavigate();

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (correo.trim() === "" || contrasena.trim() === "") {
      dispatch({ type: "LOGIN_ERROR", payload: "Completa tu correo y contraseña para continuar." });
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: correo.trim(), contrasena }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        dispatch({ type: "LOGIN_ERROR", payload: datos.mensaje || "No se pudo iniciar sesión." });
        return;
      }

      dispatch({
        type: "LOGIN",
        payload: {
          ...datos,
          fechaAcceso: new Date().toLocaleString("es-GT"),
        },
      });

      navigate("/perfil");
    } catch (err) {
      dispatch({ type: "LOGIN_ERROR", payload: "No se pudo conectar con el servidor." });
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Iniciar sesión</h2>

      {estado.error && <Alert variant="danger">{estado.error}</Alert>}

      <Form onSubmit={manejarEnvio}>
        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={contrasena}
            onChange={(evento) => setContrasena(evento.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={cargando}>
          {cargando ? <Spinner animation="border" size="sm" /> : "Entrar"}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;