// Productos.jsx
import { useState, useEffect } from "react";
import { Container, Table, Badge, Button, Modal, Form, Alert, Spinner } from "react-bootstrap";

const API_URL = "http://localhost:5000/api/recursos";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEdicion, setIdEdicion] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    disponible: true,
  });

  const cargarProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) throw new Error("No se pudieron cargar los productos.");
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const abrirDetalle = (producto) => setProductoSeleccionado(producto);
  const cerrarDetalle = () => setProductoSeleccionado(null);

  const abrirFormularioNuevo = () => {
    setModoEdicion(false);
    setIdEdicion(null);
    setFormulario({ nombre: "", categoria: "", precio: "", disponible: true });
    setMostrarFormulario(true);
  };

  const abrirFormularioEdicion = (producto) => {
    setModoEdicion(true);
    setIdEdicion(producto._id);
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      disponible: producto.disponible,
    });
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => setMostrarFormulario(false);

  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;
    setFormulario((anterior) => ({
      ...anterior,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const guardarProducto = async (evento) => {
    evento.preventDefault();
    setError(null);

    const cuerpo = {
      nombre: formulario.nombre,
      categoria: formulario.categoria,
      precio: Number(formulario.precio),
      disponible: formulario.disponible,
    };

    try {
      const respuesta = await fetch(
        modoEdicion ? `${API_URL}/${idEdicion}` : API_URL,
        {
          method: modoEdicion ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cuerpo),
        }
      );

      if (!respuesta.ok) throw new Error("No se pudo guardar el producto.");

      setMostrarFormulario(false);
      cargarProductos();
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Eliminar este producto?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!respuesta.ok) throw new Error("No se pudo eliminar el producto.");
      cargarProductos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Catálogo de productos</h2>
        <Button variant="success" onClick={abrirFormularioNuevo}>
          Agregar producto
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {cargando ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Disponibilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>Q{producto.precio}</td>
                <td>
                  <Badge bg={producto.disponible ? "success" : "secondary"}>
                    {producto.disponible ? "Disponible" : "Agotado"}
                  </Badge>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    className="me-2"
                    onClick={() => abrirDetalle(producto)}
                  >
                    Ver
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    className="me-2"
                    onClick={() => abrirFormularioEdicion(producto)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => eliminarProducto(producto._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal de detalle */}
      <Modal show={productoSeleccionado !== null} onHide={cerrarDetalle} centered>
        {productoSeleccionado && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{productoSeleccionado.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Categoría:</strong> {productoSeleccionado.categoria}</p>
              <p><strong>Precio:</strong> Q{productoSeleccionado.precio}</p>
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

      {/* Modal de formulario (crear / editar) */}
      <Modal show={mostrarFormulario} onHide={cerrarFormulario} centered>
        <Form onSubmit={guardarProducto}>
          <Modal.Header closeButton>
            <Modal.Title>{modoEdicion ? "Editar producto" : "Nuevo producto"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={formulario.categoria}
                onChange={manejarCambio}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio (Q)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="precio"
                value={formulario.precio}
                onChange={manejarCambio}
                required
              />
            </Form.Group>
            <Form.Check
              type="checkbox"
              label="Disponible"
              name="disponible"
              checked={formulario.disponible}
              onChange={manejarCambio}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarFormulario}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default Productos;