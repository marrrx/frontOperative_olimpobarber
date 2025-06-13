import { Col, Container, Row } from "react-bootstrap";

export const PagePrivacity = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-4 mb-5">
      <Row className="w-100">
        <Col lg={8}>
          <h1 className="fw-bolder text-lg-start mb-4 ">Aviso de Privacidad</h1>
          <p className="fw-light text-lg-start">
            <strong>Olimpo Barber Shop</strong>, con domicilio en Calle Felipe Ángeles #524, Colonia Cosmos 1, es responsable del uso y
            protección de los datos personales que nos proporcionas, y al
            respecto te informamos lo siguiente:
          </p>
        </Col>
      </Row>

      <Row className="w-100 mt-4">
        <Col lg={8}>
          <h2 className="fw-bold text-lg-start mb-2 ">
            Datos que recolectamos
          </h2>
          <ul className="fw-light text-lg-start">
            <li>Nombre</li>
            <li>Apellido</li>
            <li>Número telefónico</li>
            <li>Edad</li>
          </ul>
        </Col>
      </Row>

      <Row className="w-100 mt-4">
        <Col lg={8}>
          <h2 className="fw-bold text-lg-start mb-2 ">
            Finalidad del uso de datos
          </h2>
          <p className="fw-light text-lg-start">
            Utilizamos tus datos para gestionar y confirmar citas, enviarte
            recordatorios, atender solicitudes y comunicarnos contigo vía
            WhatsApp, Instagram o Facebook, si es necesario.
          </p>
        </Col>
      </Row>

      <Row className="w-100 mt-4">
        <Col lg={8}>
          <h2 className="fw-bold text-lg-start mb-2 ">Uso de redes sociales</h2>
          <p className="fw-light text-lg-start">
            Usamos redes sociales como medios de atención. No solicitamos ni
            almacenamos datos sensibles por estos canales.
          </p>
        </Col>
      </Row>

      <Row className="w-100 mt-4">
        <Col lg={8}>
          <h2 className="fw-bold text-lg-start mb-2 ">
            Confidencialidad y resguardo
          </h2>
          <p className="fw-light text-lg-start">
            Tu información será tratada con estricta confidencialidad y no será
            compartida con terceros bajo ninguna circunstancia.
          </p>
        </Col>
      </Row>

      <Row className="w-100 mt-4">
        <Col lg={8}>
          <h2 className="fw-bold text-lg-start mb-2  ">Cambios al aviso</h2>
          <p className="fw-light text-lg-start">
            Nos reservamos el derecho de modificar este aviso. Cualquier cambio
            será notificado en nuestro sitio web o redes oficiales.
          </p>
        </Col>
      </Row>
    </Container>
  );
};
