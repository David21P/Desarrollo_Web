import { Container, Card, Badge, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Perfil() {
  const { estado, dispatch } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  if (!estado.isAuthenticated) {
    return (
      <Container className="my-4">
        <p>Debes iniciar sesión para ver tu perfil.</p>
      </Container>
    );
  }

  const { usuario } = estado;

  return (
    <Container className="my-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">Mi perfil</h2>

      <Card>
        <Card.Body>
          <Card.Title>{usuario.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{usuario.correo}</Card.Subtitle>

          <ListGroup variant="flush" className="my-3">
            <ListGroup.Item>
              Tipo de cliente: <Badge bg="info" text="dark">{usuario.rol}</Badge>
            </ListGroup.Item>
            <ListGroup.Item>Fecha de ingreso: {usuario.fechaAcceso}</ListGroup.Item>
            <ListGroup.Item>Pedidos realizados: 3 (historial simulado)</ListGroup.Item>
          </ListGroup>

          <Button variant="outline-danger" onClick={cerrarSesion}>
            Cerrar sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Perfil;