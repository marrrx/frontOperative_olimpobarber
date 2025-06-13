import { CardBranch } from "./CardBranch";
import { useContext } from "react";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";
import { StyledBackButton } from "../../../general/components/StyledBackButton";

export const SelectBranchPage = () => {
  const { setCurrentStep } = useContext(CitasFormContext);
  const { branches } = useContext(DataContext);
  const navigate = useNavigate();

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate("/agendar/");
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
      <h5>Seleccionar sucursal</h5>
      <div className="d-flex flex-column flex-lg-row">
        <CardBranch branches={branches} />
      </div>
      <StyledBackButton
      size="sm"
        className="mt-3"
        as={Button}
        onClick={() => {
          handleGoBack();
        }}
      >
        <i className="bi bi-arrow-left-circle me-2"></i>
        Regresar
      </StyledBackButton>
    </motion.div>
  );
};
