import React, { useContext } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { IWorker } from "../../../general/contexts/DataContext/interfaces/IWorker";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";
import { useIsMobile } from "../../../hooks/useIsMobile";

interface CardBarberProps {
  barbers: IWorker[];
  loading?: boolean;
}

export const CardBarber: React.FC<CardBarberProps> = ({ barbers, loading }) => {
  const navigate = useNavigate();
  const { setCurrentStep, updateCitaData, selectedBranch } = useContext(CitasFormContext);
  const { setSelectedWorker, selectedWorker } = useContext(DataContext);
  const isMobile = useIsMobile();

  const handleSelectBarber = ({ barber }: any) => {
    updateCitaData({ workerId: barber.userId, branchId: selectedBranch ?? 0 });
    setCurrentStep((prevStep) => prevStep); 
    navigate("/agendar/service");
    setSelectedWorker(barber);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "170px" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (barbers.length === 0) {
    return (
      <div className="alert alert-info mt-3" role="alert" >
        No hay barberos disponibles
      </div>
    );
  }

  return (
    <>
      {barbers.map((barber, index) => {
        const isSelected = selectedWorker.userId === barber.userId;

        return (
          <Card
            className={`d-flex flex-row shadow-sm border w-100 ${
              isSelected ? "border-success border-1" : ""
            }`}
            key={index}
            onClick={isMobile ? () => handleSelectBarber({ barber }) : undefined}
            style={{ cursor: "pointer", height: "auto" }}
          >
            <div className="d-flex min-h-75 p-3 border-end w-50 align-items-center justify-content-center">
              <Card.Img
                className="rounded-circle img-fluid"
                style={{
                  objectFit: "cover",
                  aspectRatio: "1 / 1",
                  maxWidth: "200px",
                }}
                src={barber.imageBase64}
              />
            </div>
            <Card.Body className="w-25 w-lg-100">
              <Card.Title className="fw-bold">{barber.name}</Card.Title>
              <Card.Text className="fw-light lh-1">Horarios:</Card.Text>
              {barber.timeSlots.map((slot, index) => {
                return (
                  <Card.Text key={index} className="mb-0 w-100 responsive-text">
                    {slot.startTime} - {slot.endTime}
                  </Card.Text>
                );
              })}
              {!isMobile && (
                <StyledButton
                  as={Button}
                  size="sm"
                  className={"btn-sm mt-2"}
                  onClick={() => handleSelectBarber({ barber })}
                >
                  {isSelected ? "Seleccionado" : "Seleccionar"}
                </StyledButton>
              )}
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};
