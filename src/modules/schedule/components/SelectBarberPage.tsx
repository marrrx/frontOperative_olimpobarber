import {  useContext, useEffect } from "react";

import { CardBarber } from "./CardBarber";
import { StyledButton } from "../../../general/components/StyledButton";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { motion } from "framer-motion";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";

export const SelectBarberPage = () => {
  const navigate = useNavigate();
  const { setCurrentStep,citaData } = useContext(CitasFormContext);
  const {workers,fetchWorkersByBranch} = useContext(DataContext);

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate("/agendar/branch");
  };
  
  useEffect(() => {
  fetchWorkersByBranch(citaData.branchId);
}, []);

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
        <CardBarber barbers={workers} />
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
