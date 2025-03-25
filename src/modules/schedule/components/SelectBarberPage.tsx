import React, { useContext } from "react";
import { Barber } from "../interfaces/Barber";
import barbers from "../data/barbers.json";
import { CardBarber } from "./CardBarber";
import { StyledButton } from "../../../general/components/StyledButton";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { motion } from "framer-motion";

export const SelectBarberPage = () => {
  const barbersData: Barber[] = barbers.barbers;
  const navigate = useNavigate();
  const { setCurrentStep } = useContext(CitasFormContext);

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate("/citas/branch");
  };

  return (
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
      <h5>Seleccionar barbero</h5>
      <div className="d-flex flex-column flex-lg-row">
        <CardBarber barbers={barbersData} />
      </div>
      <StyledButton
        className="mt-3"
        as={Button}
        onClick={() => {
          handleGoBack();
        }}
      >
        Regresar
      </StyledButton>
    </motion.div>
  );
};
