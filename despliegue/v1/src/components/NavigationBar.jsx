import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function NavigationBar() {
  const { estado, dispatch } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="navbar-tienda" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Ferretería El Tornillo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-principal" />
        <Navbar.Collapse id="navbar-principal">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/categorias">
              Categorías
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas">
              Ofertas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ubicaciones">
              Ubicaciones
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>

          <Nav>
            {estado.isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/perfil">
                  Hola, {estado.usuario.nombre}
                </Nav.Link>
                <Button variant="outline-light" size="sm" onClick={cerrarSesion}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Iniciar sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;