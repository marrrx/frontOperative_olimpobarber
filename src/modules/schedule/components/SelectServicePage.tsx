import  { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { CardService } from "./CardService";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";

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

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate("/agendar/barber");
  };
  const handleNext = () => {
    if (selectedServices.length > 0) {
      const updatedCita = {
        ...citaData,
        services: selectedServices,
        total: totalTemp,
      };
  
      // Guarda directamente en sessionStorage
      sessionStorage.setItem("citaData", JSON.stringify(updatedCita));
      sessionStorage.setItem("lastPath", "/citas/date");

      // Luego actualiza el state
      updateCitaData({
        services: selectedServices,
        total: totalTemp,
      });
  
      // Luego navega
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
        <div className="d-flex flex-wrap w-100 justify-content-center ">
          <CardService services={services} />
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <StyledButton
            as={Button}
            className="mt-3"
            onClick={() => {
              handleGoBack();
            }}
          >
            Regresar
          </StyledButton>
          <p className="fw-bold">Total: ${totalTemp}</p>
          <StyledButton
            as={Button}
            className="mt-3"
            onClick={ () => {
              handleNext();
            }}
          >
            Siguiente
          </StyledButton>
        </div>
      </motion.div>
    </>
  );
};
