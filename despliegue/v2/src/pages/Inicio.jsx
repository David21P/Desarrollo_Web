import { Container, Row, Col, Carousel } from "react-bootstrap";
import ProductCard from "../components/ProductCard.jsx";

const productosDestacados = [
  { nombre: "Martillo de uña 16 oz", categoria: "Herramientas manuales", precio: 45, disponible: true, imagen: "/img/martillo.jpg" },
  { nombre: "Taladro eléctrico 1/2\"", categoria: "Herramientas eléctricas", precio: 450, disponible: true, imagen: "/img/taladro.jpg" },
  { nombre: "Tubo PVC 1/2\" (6m)", categoria: "Plomería", precio: 35, disponible: true, imagen: "/img/tubo-pvc.jpg" },
  { nombre: "Pintura de aceite (galón)", categoria: "Pintura", precio: 180, disponible: false, imagen: "/img/pintura.jpg" },
];

function Inicio() {
  return (
    <>
      <div className="hero-inicio">
        <h1>Ferretería El Tornillo</h1>
        <p className="lead mb-0">
          Todo lo que necesitas para construir, reparar y mejorar tu hogar.
        </p>
      </div>

      <Carousel className="mb-4">
        <Carousel.Item>
          <img className="d-block w-100" src="/img/promo-herramientas.jpg" alt="Promoción de herramientas" style={{ maxHeight: "350px", objectFit: "cover" }} />
          <Carousel.Caption>
            <h3>Herramientas con hasta 20% de descuento</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/img/promo-pintura.jpg" alt="Promoción de pintura" style={{ maxHeight: "350px", objectFit: "cover" }} />
          <Carousel.Caption>
            <h3>2x1 en pintura de aceite seleccionada</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/img/promo-jardineria.jpg" alt="Promoción de jardinería" style={{ maxHeight: "350px", objectFit: "cover" }} />
          <Carousel.Caption>
            <h3>Nueva línea de jardinería ya disponible</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="mb-5">
        <h2 className="mb-3">Productos destacados</h2>
        <Row xs={1} sm={2} md={4} className="g-3">
          {productosDestacados.map((producto) => (
            <Col key={producto.nombre}>
              <ProductCard {...producto} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Inicio;
