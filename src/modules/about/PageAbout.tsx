import { Col, Container, Row } from "react-bootstrap";
export const PageAbout = () => {
  const sections = [
    {
      title: "Nuestra historia",
      text: "Todo comenzó con la visión de Rafael Márquez, un barbero con pasión por el detalle y el trato cercano. Lo que inició como un pequeño local en Pabellón de Arteaga, hoy se ha transformado en una barbería con tres sucursales, donde cada integrante del equipo comparte el compromiso de calidad y dedicación que nos caracteriza. Nuestra historia está escrita con tijeras, máquinas, sonrisas y la confianza de quienes han creído en nosotros desde el primer día.",
    },
    {
      title: "Nuestra misión",
      text: "Brindar un servicio de barbería de alta calidad, cuidando cada detalle para que cada cliente se vea y se sienta mejor. Nos enfocamos en la atención personalizada, el estilo único de cada persona y en mantener un ambiente profesional, cálido y accesible para todos.",
    },
    {
      title: "Nuestra visión",
      text: "Ser reconocidos como una de las mejores barberías de la región, expandiendo nuestro alcance sin perder la esencia que nos define: la pasión por el trabajo bien hecho, el compromiso con nuestros clientes y el orgullo de nuestras raíces en Pabellón de Arteaga.",
    },
  ];
  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
        <Row className="w-100">
          <Col lg={8}>
            <h1 className="fw-bolder  text-lg-start mb-4">¿Quiénes somos?</h1>
            <p className="fw-light text-lg-start">
              Somos una barbería con raíces firmes en Pabellón de Arteaga,
              Aguascalientes, nacida del deseo de ofrecer mucho más que un
              simple corte de cabello: buscamos brindar una experiencia
              auténtica, profesional y personalizada. Con tres sucursales y un
              equipo de barberos apasionados por su oficio, nos esforzamos día a
              día por mantener un ambiente en el que cada cliente se sienta en
              casa, bien atendido y renovado.
            </p>
          </Col>
        </Row>

        {sections.map((section, index) => (
          <Row className="w-100 mt-4" key={index}>
            <Col lg={8}>
              <h2 className="fw-bold  text-lg-start mb-2">{section.title}</h2>
              <p className="fw-light  text-lg-start">{section.text}</p>
            </Col>
          </Row>
        ))}
        <Row className="w-100 mt-4 mb-4">
          <Col lg={8}>
            <h2 className="fw-bold  text-lg-start mb-2">Contactos</h2>
            <Row className="d-flex justify-content-center gap-0">
              <Col xs="auto" className="p-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100092189182252&locale=es_LA"
                  className="text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className=" bi bi-facebook fs-1"></i>
                </a>
              </Col>
              <Col xs="auto" className="p-3">
                <a
                  href="https://api.whatsapp.com/send/?phone=4498059894&text"
                  className="text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-whatsapp fs-1"></i>
                </a>
              </Col>
              <Col xs="auto" className="p-3">
                <a
                  href="https://www.instagram.com/olimpo.barbershop1?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  className="text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram fs-1"></i>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
