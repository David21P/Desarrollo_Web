import { Container, ListGroup, Badge, Row, Col } from "react-bootstrap";

const sucursales = [
  {
    nombre: "Sucursal Central",
    direccion: "5ta Avenida 10-25, Zona 1, Ciudad de Guatemala",
    horario: "Lun-Sáb 8:00 am - 6:00 pm",
    telefono: "2255-1010",
  },
  {
    nombre: "Sucursal Norte",
    direccion: "Calzada Roosevelt 15-40, Zona 7",
    horario: "Lun-Sáb 8:00 am - 6:00 pm",
    telefono: "2255-1020",
  },
  {
    nombre: "Sucursal Antigua Guatemala",
    direccion: "6ta Calle Poniente 12, Antigua Guatemala",
    horario: "Lun-Dom 8:00 am - 5:00 pm",
    telefono: "7832-1030",
  },
];

function Ubicaciones() {
  return (
    <Container className="my-4">
      <h2 className="mb-3">Nuestras sucursales</h2>
      <Row xs={1} md={3} className="g-3">
        {sucursales.map((sucursal) => (
          <Col key={sucursal.nombre}>
            <ListGroup>
              <ListGroup.Item variant="dark">
                <strong>{sucursal.nombre}</strong>
              </ListGroup.Item>
              <ListGroup.Item>{sucursal.direccion}</ListGroup.Item>
              <ListGroup.Item>
                <Badge bg="info" text="dark">Horario</Badge> {sucursal.horario}
              </ListGroup.Item>
              <ListGroup.Item>Tel: {sucursal.telefono}</ListGroup.Item>
            </ListGroup>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Ubicaciones;
