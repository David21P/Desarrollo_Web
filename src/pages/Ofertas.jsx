import { Container, Table, Badge } from "react-bootstrap";

const ofertas = [
  { producto: "Juego de desarmadores (6 pz)", regular: 90, oferta: 65, vigencia: "31/08/2026" },
  { producto: "Esmeril angular 4 1/2\"", regular: 380, oferta: 299, vigencia: "15/08/2026" },
  { producto: "Pintura de aceite (galón)", regular: 180, oferta: 150, vigencia: "20/08/2026" },
  { producto: "Kit de llaves de paso", regular: 60, oferta: 45, vigencia: "10/08/2026" },
];

function Ofertas() {
  return (
    <Container className="my-4">
      <h2 className="mb-3">Ofertas y promociones</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio regular</th>
            <th>Precio de oferta</th>
            <th>Descuento</th>
            <th>Vigencia</th>
          </tr>
        </thead>
        <tbody>
          {ofertas.map((oferta) => {
            const descuento = Math.round(
              ((oferta.regular - oferta.oferta) / oferta.regular) * 100
            );
            return (
              <tr key={oferta.producto}>
                <td>{oferta.producto}</td>
                <td>
                  <span className="text-decoration-line-through">Q{oferta.regular}</span>
                </td>
                <td>Q{oferta.oferta}</td>
                <td>
                  <Badge className="badge-oferta">-{descuento}%</Badge>
                </td>
                <td>{oferta.vigencia}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Ofertas;
