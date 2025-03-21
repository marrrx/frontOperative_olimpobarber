import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { Service } from "../interfaces/service";
import { CardService } from "./CardService";
import services from "../data/services.json";

export const SelectServicePage = () => {
  const servicesData: Service[] = services.services;

  const navigate = useNavigate();
  const { setCurrentStep, citaData } =
    useContext(CitasFormContext);

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate(-1);
  };
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    navigate("/citas/date");
  };


  return (
    <>
      <div className="mx-3 mt-4">
        <h5>Seleccionar servicios</h5>
        <div className="d-flex flex-wrap w-100 justify-content-center ">
          <CardService services={servicesData} />
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
          <p className="fw-bold">Total: ${citaData.total}</p>
          <StyledButton
            as={Button}
            className="mt-3"
            onClick={() => {
              handleNext();
            }}
          >
            Siguiente
          </StyledButton>
        </div>
      </div>
    </>
  );
};
