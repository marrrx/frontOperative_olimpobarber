import React, { use, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { IWorker } from "../../../general/contexts/DataContext/interfaces/IWorker";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";

interface CardBarberProps {
  barbers: IWorker[];
}

export const CardBarber: React.FC<CardBarberProps> = ({ barbers }) => {
  const navigate = useNavigate();
  const { setCurrentStep, updateCitaData } = useContext(CitasFormContext);
  const{setSelectedWorker}=useContext(DataContext);

  const handleSelectBarber = ({ barber }: any) => {
    updateCitaData({ workerId: barber.userId });
    setCurrentStep((prevStep) => prevStep + 1);
    navigate("/agendar/service");
    setSelectedWorker(barber);
  };
  return (
    <>
      {barbers.map((barber, index) => (
        <Card className="d-flex flex-row shadow-sm border m-2" key={index}>
          <div className="d-flex min-h-75 p-3 border-end w-50 align-items-center justify-content-center">
            <Card.Img
              className="rounded-circle w-100"
              style={{ objectFit: "cover", aspectRatio: 1 / 1 }}
              src={`http://localhost:5217/${barber.avatarImagePath}`}
            />
          </div>
          <Card.Body className="w-25 w-lg-100">
            <Card.Title className="fw-bold">{barber.name}</Card.Title>
            <Card.Text className="fw-light lh-1">Horarios:</Card.Text>
            {barber.timeSlots.map((slot, index) => {
              return (
                <Card.Text key={index} className="mb-0">
                  {slot.startTime} - {slot.endTime}
                </Card.Text>
              );
            })}

            <StyledButton
              as={Button}
              className={"btn-sm mt-2"}
              onClick={() => {
                handleSelectBarber({ barber });
              }}
            >
              Seleccionar
            </StyledButton>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
