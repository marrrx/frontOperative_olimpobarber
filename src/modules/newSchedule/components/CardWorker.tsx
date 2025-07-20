import React, { useContext } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { IWorker } from "../../../general/contexts/DataContext/interfaces/IWorker";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";
import { useIsMobile } from "../../../hooks/useIsMobile";

interface CardWorkerProps {
  barbers: IWorker[];
  loading?: boolean;
}

export const CardWorker: React.FC<CardWorkerProps> = ({ barbers, loading }) => {
  const navigate = useNavigate();
  const {    updateCitaData, selectedBranch, citaData } =
    useContext(CitasFormContext);
  const { setSelectedWorker, selectedWorker } = useContext(DataContext);
  const isMobile = useIsMobile();

  const handleSelectBarber = ({ barber }: any) => {
    updateCitaData({ workerId: barber.userId, branchId: selectedBranch ?? 0 });
    navigate("/agendar/service");
    setSelectedWorker(barber);
  };

  if (loading) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: 150 }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  );
}


  if (barbers.length === 0) {
    return (
      <div className="alert alert-info mt-3" role="alert">
        No hay barberos disponibles
      </div>
    );
  }

  return (
    <>
      {barbers.map((barber, index) => {
        const isSelected = selectedWorker?.userId === barber.userId;
        return (
          <Card
            className={`d-flex flex-row shadow-sm border  ${
              isSelected ? "border-success border-1" : ""
            }`}
            key={index}
            onClick={
              isMobile ? () => handleSelectBarber({ barber }) : undefined
            }
            style={{ cursor: "pointer", height: "80px" }}
          >
            <div className="d-flexalign-items-center justify-content-center p-1">
              <Card.Img
                className="fir-image-figure fir-clickcircle"
                src={barber.imageBase64}
              />
            </div>
            <Card.Body className="w-100 ">
              <Card.Title className="fw-bold fs-6">{barber.name}</Card.Title>
              {barber.timeSlots.map((slot, index) => {
                return (
                  <Card.Text key={index} className="mb-0 w-100 responsive-text">
                    {slot.startTime} - {slot.endTime}
                  </Card.Text>
                );
              })}
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};
