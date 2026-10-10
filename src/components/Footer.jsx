import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer-tienda">
      <Container>
        <Row>
          <Col className="text-center">
            <strong>Javier Pirir</strong> — Carnet: 9490-22-15282
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-2">
            <small>&copy; 2026 Ferreteria El Tornillo</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;