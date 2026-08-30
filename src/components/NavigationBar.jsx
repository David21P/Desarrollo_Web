import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavigationBar() {
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
