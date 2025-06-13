import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export const PageTerms = () => {
  return (
     <Container className="d-flex flex-column justify-content-center align-items-center mt-4 mb-5">
    <Row className="w-100">
      <Col lg={8}>
        <h1 className="fw-bolder text-lg-start mb-4 ">Términos y Condiciones</h1>
      </Col>
    </Row>

    <Row className="w-100 mt-2">
      <Col lg={8}>
        <h2 className="fw-bold text-lg-start mb-2 ">Servicios</h2>
        <p className="fw-light text-lg-start">
          Ofrecemos servicios de barbería mediante cita previa en nuestras tres sucursales. Las citas pueden agendarse en línea o por mensaje.
        </p>
      </Col>
    </Row>

    <Row className="w-100 mt-4">
      <Col lg={8}>
        <h2 className="fw-bold text-lg-start mb-2 ">Agendamiento y cancelaciones</h2>
        <p className="fw-light text-lg-start">
          Puedes agendar tu cita en línea 24/7. Si necesitas cancelar, por favor avísanos vía whatsapp; teniendo en cuenta que no hay reembolso del anticipo determinado.
        </p>
      </Col>
    </Row>

    <Row className="w-100 mt-4">
      <Col lg={8}>
        <h2 className="fw-bold text-lg-start mb-2 ">Contacto y comunicación</h2>
        <p className="fw-light text-lg-start">
          Nos comunicamos contigo únicamente para temas relacionados con tus citas o atención, usando WhatsApp, Instagram, Facebook o teléfono.
        </p>
      </Col>
    </Row>

    <Row className="w-100 mt-4">
      <Col lg={8}>
        <h2 className="fw-bold text-lg-start mb-2 ">Uso responsable</h2>
        <p className="fw-light text-lg-start">
          Te comprometes a proporcionar información real y precisa. Olimpo Barber Shop se reserva el derecho de negar servicio ante conducta inapropiada o falsedad.
        </p>
      </Col>
    </Row>

    <Row className="w-100 mt-4">
      <Col lg={8}>
        <h2 className="fw-bold text-lg-start mb-2 ">Limitación de responsabilidad</h2>
        <p className="fw-light text-lg-start">
          No nos hacemos responsables por fallas fuera de nuestro control, como interrupciones eléctricas o técnicas.
        </p>
      </Col>
    </Row>

    <Row className="w-100 mt-4">
      <Col lg={8}>
        <h2 className="fw-bold text-lg-start mb-2 ">Jurisdicción</h2>
        <p className="fw-light text-lg-start">
          Este documento se rige por las leyes de México, y cualquier conflicto será resuelto por los tribunales competentes.
        </p>
      </Col>
    </Row>
  </Container>
  );
};
