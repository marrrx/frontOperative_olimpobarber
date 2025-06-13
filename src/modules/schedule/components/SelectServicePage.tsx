import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { CardService } from "./CardService";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";
import { StyledBackButton } from "../../../general/components/StyledBackButton";
import { useIsMobile } from "../../../hooks/useIsMobile";

export const SelectServicePage = () => {
  const navigate = useNavigate();
  const {
    setCurrentStep,
    citaData,
    updateCitaData,
    selectedServices,
    totalTemp,
  } = useContext(CitasFormContext);
  const { services } = useContext(DataContext);
  const isMobile = useIsMobile();

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep);
    navigate("/agendar/barber");
  };
  const handleNext = () => {
    if (selectedServices.length > 0) {
      const updatedCita = {
        ...citaData,
        services: selectedServices,
      };

      sessionStorage.setItem("citaData", JSON.stringify(updatedCita));
      sessionStorage.setItem("lastPath", "/citas/date");

      updateCitaData({
        services: selectedServices,
      });

      setCurrentStep((prev) => prev + 1);
      navigate("/agendar/date");
    } else {
      toast.error("Debes seleccionar al menos un servicio");
    }
  };

  return (
    <>
      <motion.div
        className="mx-3 mt-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <h5>Seleccionar servicios</h5>
        <Row lg={3} className="d-flex justify-content-center">
          <CardService services={services} />
        </Row>
        <Row
          className={`${
            isMobile
              ? "justify-content-center mt-3 gx-2"
              : "justify-content-start mt-3"
          }`}
        >
          <Col xs="auto">
            <p className="fw-bold text-center text-md-start mb-0">
              Total: ${totalTemp}
            </p>
          </Col>
        </Row>
        <Row
          className={`${
            isMobile ? "justify-content-center" : "justify-content-start"
          } mt-3`}
        >
          <Col xs="auto">
            <div className="d-flex gap-2">
              <StyledBackButton as={Button} onClick={handleGoBack} size="sm">
                <i className="bi bi-arrow-left-circle me-2"></i>
                Regresar
              </StyledBackButton>

              <StyledButton as={Button} onClick={handleNext} size="sm">
                <i className="bi bi-arrow-right-circle me-2"></i>
                Siguiente
              </StyledButton>
            </div>
          </Col>
        </Row>
      </motion.div>
    </>
  );
};
