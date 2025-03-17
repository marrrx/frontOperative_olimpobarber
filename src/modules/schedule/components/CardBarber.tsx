import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { Barber } from "../interfaces/Barber";

interface CardBarberProps {
  barbers: Barber[];
}

export const CardBarber: React.FC<CardBarberProps> = ({ barbers }) => {
  const navigate = useNavigate();
  const {setCurrentStep} = useContext(CitasFormContext)

 const handleSelectBarber = () => {
  setCurrentStep((prevStep) => prevStep + 1);
  navigate("/citas/service");
  };
  return (
    <>
      {barbers.map((barber) => (
        <Card className="d-flex flex-row shadow-sm border m-2" key={barber.id}>
          <div className="d-flex min-h-75 p-3 border-end w-50 align-items-center justify-content-center">
            <Card.Img
              className="rounded-circle w-100"
              style={{ objectFit: "cover", aspectRatio: 1 / 1 }}
              src={barber.avatar}
            />
          </div>
          <Card.Body className="w-25 w-lg-100">
            <Card.Title className="fw-bold">{barber.nombre}</Card.Title>
            <Card.Text className="fw-light lh-1">{barber.direccion}</Card.Text>
            <Card.Text>{barber.horario}</Card.Text>
            <StyledButton as={Button} className={"btn-sm "} onClick={()=>{handleSelectBarber()}}>
              Seleccionar
            </StyledButton>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
