import React, { useContext } from "react";
import { Barber } from "../interfaces/Barber";
import barbers from "../data/barbers.json";
import { CardBarber } from "./CardBarber";
import { StyledButton } from "../../../general/components/StyledButton";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";

export const SelectBarberPage = () => {
  const barbersData: Barber[] = barbers.barbers;
  const navigate = useNavigate();
  const {setCurrentStep} = useContext(CitasFormContext)

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate(-1);
  };

  return (
    <div className="mx-3 mt-4">
      <h5>Seleccionar barbero</h5>
      <div className="d-flex flex-column flex-lg-row">
        <CardBarber barbers={barbersData} />
      </div>
      <StyledButton
        as={Button}
        onClick={() => {
          handleGoBack();
        }}
      >
        Regresar
      </StyledButton>
    </div>
  );
};
