import { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

function Contacto() {
  const [datos, setDatos] = useState({ nombre: "", correo: "", telefono: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatos((datosActuales) => ({ ...datosActuales, [name]: value }));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    setEnviado(true);
  };

  return (
    <Container className="my-4">
      <h2 className="mb-3">Contáctanos</h2>

      {enviado && (
        <Alert variant="success" onClose={() => setEnviado(false)} dismissible>
          Tu mensaje fue registrado.
        </Alert>
      )}

      <Form onSubmit={manejarEnvio}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={datos.nombre}
                onChange={manejarCambio}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="correo">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={datos.correo}
                onChange={manejarCambio}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            value={datos.telefono}
            onChange={manejarCambio}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="mensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="mensaje"
            value={datos.mensaje}
            onChange={manejarCambio}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar mensaje
        </Button>
      </Form>
    </Container>
  );
}

export default Contacto;
