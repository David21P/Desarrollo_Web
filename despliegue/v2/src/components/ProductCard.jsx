import { Card, Badge } from "react-bootstrap";

function ProductCard({ nombre, categoria, precio, disponible, imagen }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imagen}
        alt={nombre}
        style={{ height: "160px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{categoria}</Card.Subtitle>
        <Card.Text className="mt-auto">
          <strong>Q{precio}</strong>{" "}
          <Badge bg={disponible ? "success" : "secondary"}>
            {disponible ? "Disponible" : "Agotado"}
          </Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
