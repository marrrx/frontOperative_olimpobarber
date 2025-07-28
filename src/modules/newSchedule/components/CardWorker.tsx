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
  const { updateCitaData, selectedBranch, citaData } =
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
            className={`d-flex flex-row flex-sm-column flex-md-row align-items-center shadow-sm border mb-md-2 ${
              isSelected ? "border-success border-2" : ""
            }`}
            key={index}
            onClick={() => handleSelectBarber({ barber })}
            style={{ cursor: "pointer", minHeight: "80px" }}
          >
            <div className="p-2 d-flex justify-content-center align-items-center">
              <Card.Img
                className="rounded-circle"
                src={barber.imageBase64}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                }}
              />
            </div>

            <Card.Body className="w-100 text-center text-sm-start px-2">
              <Card.Title className="fw-bold fs-6 mb-1">
                {barber.name}
              </Card.Title>
              <div className="d-flex flex-wrap justify-content-center justify-content-sm-start">
                {barber.timeSlots.map((slot, i) => (
                  <Card.Text
                    key={i}
                    className="mb-0 me-2 small text-nowrap"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {slot.startTime} - {slot.endTime}
                  </Card.Text>
                ))}
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};
