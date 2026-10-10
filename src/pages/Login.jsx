import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const { estado, dispatch } = useAuth();
  const navigate = useNavigate();

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (nombre.trim() === "" || correo.trim() === "") {
      dispatch({ type: "LOGIN_ERROR", payload: "Completa tu nombre y correo para continuar." });
      return;
    }

    // Autenticación simulada: no hay backend real
    dispatch({
      type: "LOGIN",
      payload: {
        nombre: nombre.trim(),
        correo: correo.trim(),
        rol: "Cliente",
        fechaAcceso: new Date().toLocaleString("es-GT"),
      },
    });

    navigate("/perfil");
  };

  return (
    <Container className="my-4" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Iniciar sesión</h2>

      {estado.error && <Alert variant="danger">{estado.error}</Alert>}

      <Form onSubmit={manejarEnvio}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;