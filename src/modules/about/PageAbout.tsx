import { Col, Container, Row } from "react-bootstrap";
export const PageAbout = () => {
  const sections = [
    {
      title: "Nuestra historia",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod, quia, voluptate quae voluptatem quibusdam voluptatibus quidem doloribus quos dolorum quas.",
    },
    {
      title: "Nuestra misión",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod, quia, voluptate quae voluptatem quibusdam voluptatibus quidem doloribus quos dolorum quas.",
    },
    {
      title: "Nuestra visión",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod, quia, voluptate quae voluptatem quibusdam voluptatibus quidem doloribus quos dolorum quas.",
    },
  ];
  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
        <Row className="w-100">
          <Col lg={8}>
            <h1 className="fw-bolder  text-lg-start mb-4">¿Quiénes somos?</h1>
            <p className="fw-light text-lg-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptates, quod, quia, voluptate quae voluptatem quibusdam
              voluptatibus quidem doloribus quos dolorum quas. Quisquam, quae.
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
