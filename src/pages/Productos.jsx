import { useState } from "react";
import { Container, Table, Badge, Button, Modal } from "react-bootstrap";

const productos = [
  {
    nombre: "Martillo de uña 16 oz",
    categoria: "Herramientas manuales",
    precio: 45,
    disponible: true,
    especificaciones: "Cabeza de acero forjado, mango de fibra de vidrio, peso 450g.",
  },
  {
    nombre: "Taladro eléctrico 1/2\"",
    categoria: "Herramientas eléctricas",
    precio: 450,
    disponible: true,
    especificaciones: "Potencia 650W, velocidad variable, incluye maletín y broca.",
  },
  {
    nombre: "Tubo PVC 1/2\" (6m)",
    categoria: "Plomería",
    precio: 35,
    disponible: true,
    especificaciones: "Tubo cédula 40 para agua potable, resistente a la presión.",
  },
  {
    nombre: "Cable eléctrico #12 (metro)",
    categoria: "Electricidad",
    precio: 8.5,
    disponible: true,
    especificaciones: "Cable THHN calibre 12, uso residencial e industrial.",
  },
  {
    nombre: "Pintura de aceite (galón)",
    categoria: "Pintura",
    precio: 180,
    disponible: false,
    especificaciones: "Acabado satinado, cobertura aproximada de 30 m².",
  },
  {
    nombre: "Manguera de jardín 15m",
    categoria: "Jardinería",
    precio: 120,
    disponible: true,
    especificaciones: "Manguera reforzada anti-torceduras, incluye conectores.",
  },
];

function Productos() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const abrirDetalle = (producto) => setProductoSeleccionado(producto);
  const cerrarDetalle = () => setProductoSeleccionado(null);

  return (
    <Container className="my-4">
      <h2 className="mb-3">Catálogo de productos</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Disponibilidad</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.nombre}>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>Q{producto.precio}</td>
              <td>
                <Badge bg={producto.disponible ? "success" : "secondary"}>
                  {producto.disponible ? "Disponible" : "Agotado"}
                </Badge>
              </td>
              <td>
                <Button size="sm" variant="outline-primary" onClick={() => abrirDetalle(producto)}>
                  Ver ficha
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={productoSeleccionado !== null} onHide={cerrarDetalle} centered>
        {productoSeleccionado && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{productoSeleccionado.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Categoría:</strong> {productoSeleccionado.categoria}</p>
              <p><strong>Precio:</strong> Q{productoSeleccionado.precio}</p>
              <p><strong>Especificaciones:</strong> {productoSeleccionado.especificaciones}</p>
              <Badge bg={productoSeleccionado.disponible ? "success" : "secondary"}>
                {productoSeleccionado.disponible ? "Disponible" : "Agotado"}
              </Badge>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrarDetalle}>
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}

export default Productos;
