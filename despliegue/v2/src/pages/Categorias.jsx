import { Container, Accordion, ListGroup, Badge } from "react-bootstrap";

const categorias = [
  {
    nombre: "Herramientas manuales",
    subcategorias: ["Martillos", "Desarmadores", "Llaves", "Alicates"],
  },
  {
    nombre: "Herramientas eléctricas",
    subcategorias: ["Taladros", "Sierras", "Esmeriles"],
  },
  {
    nombre: "Plomería",
    subcategorias: ["Tubería", "Llaves de paso", "Accesorios sanitarios"],
  },
  {
    nombre: "Electricidad",
    subcategorias: ["Cables", "Tomacorrientes", "Interruptores", "Lámparas"],
  },
  {
    nombre: "Pintura",
    subcategorias: ["Pinturas", "Brochas", "Rodillos", "Selladores"],
  },
  {
    nombre: "Jardinería",
    subcategorias: ["Herramientas de jardín", "Mangueras", "Fertilizantes"],
  },
];

function Categorias() {
  return (
    <Container className="my-4">
      <h2 className="mb-3">Categorías de productos</h2>
      <Accordion defaultActiveKey="0">
        {categorias.map((categoria, indice) => (
          <Accordion.Item eventKey={String(indice)} key={categoria.nombre}>
            <Accordion.Header>
              {categoria.nombre}{" "}
              <Badge bg="secondary" className="ms-2">
                {categoria.subcategorias.length}
              </Badge>
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {categoria.subcategorias.map((sub) => (
                  <ListGroup.Item key={sub}>{sub}</ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default Categorias;
