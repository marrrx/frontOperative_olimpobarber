import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StyledButton } from "../../general/components/StyledButton";
import { DataContext } from "../../general/contexts/DataContext/DataContext";

export const PageHome = () => {
  const AnimatedCard = motion(Card as any);
  const [showMore, setShowMore] = useState(false);
  const { services } = useContext(DataContext);
  const prosCard = [
    {
      service: "Ambiente y estilo único",
      description:
        "Un espacio con diseño moderno y música agradable para una experiencia relajante.",
      icon: "bi bi-fire fs-2",
    },
    {
      service: "Experiencia profesional",
      description:
        "Barberos expertos que dominan cortes clásicos y tendencias actuales.",
      icon: "bi bi-scissors fs-2",
    },
    {
      service: "Atención personalizada",
      description:
        "Cada cliente recibe recomendaciones según su estilo y preferencias.",
      icon: "bi bi-people-fill fs-2",
    },
    {
      service: "Productos profesionales",
      description:
        "Uso de ceras, aceites y lociones de alta calidad para el mejor acabado.",
      icon: "bi bi-eyedropper fs-2",
    },
  ];


  return (
    <>
      <div className="">
        <div className="d-flex bannerBackground text-center justify-content-center flex-column align-items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.7,
            }}
            className="fw-bold display-4 "
          >
            Agenda tu cita en linea
            <small className="text-body-secondary">
              {" "}
              donde quiera que estes.
            </small>
          </motion.h1>
          <Link to={"/agendar"}>
            <StyledButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.7,
              }}
              className="rounded btn mt-3 bg-black text-white"
            >
              Ir ahora
            </StyledButton>
          </Link>
        </div>
        <Container
          fluid
          className="Grid4Home align-items-center d-flex mt-5 mt-lg-0 "
        >
          <div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-0">
            {prosCard.map((service, index) => (
              <div className="col" key={index}>
                <AnimatedCard
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                  className="h-100 d-flex flex-column flex-md-row  "
                >
                  <div className="d-flex align-items-center ms-3 ">
                    <i className={`${service.icon}`}></i>
                  </div>
                  <Card.Body className="d-flex flex-column ">
                    <Card.Title className="fw-bold">
                      {service.service}
                    </Card.Title>
                    <Card.Text className="fw-light">
                      {service.description}
                    </Card.Text>
                  </Card.Body>
                </AnimatedCard>
              </div>
            ))}
          </div>
        </Container>

        <Container className=" h-100 align-items-center d-flex flex-column justify-content-center mt-5 ">
          <h2 className="mb-5 fw-bold">Nuestros servicios </h2>

          <Row
            sm={1}
            md={2}
            lg={2}
            className="g-5 justify-content-center mb-5 w-100"
          >
            {services
              .filter((service) => ![2, 3, 8].includes(service.id)) // excluir ID 3 y 5
              .slice(0, showMore ? 4 : 2)
              .map((service, index) => (
                <Col
                  sm={12}
                  md={6}
                  lg={6}
                  className="d-flex justify-content-center"
                  key={index}
                >
                  <Card
                    className="h-100 w-75  position-relative overflow-hidden"
                    as={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card.Img
                      src={service.imageBase64}
                      variant="fluid"
                      className="card-img-home w-100 h-100"
                    />
                    <Card.Body className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white text-center py-2">
                      <h5 className="fw-bold">{service.name}</h5>
                      <p className="fw-light d-none d-md-block">
                        {service.description}
                      </p>
                      <small className="fw-light d-block d-md-none">
                        {service.description}
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
              ))}

            <StyledButton
              className="w-50"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Ver menos" : "Ver más"}
            </StyledButton>
          </Row>
        </Container>
      </div>
    </>
  );
};
