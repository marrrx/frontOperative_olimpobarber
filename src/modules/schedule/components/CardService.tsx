import { Checkbox } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import "../styles/styles.css";
import { IService } from "../../../general/contexts/DataContext/interfaces/IService";
import { useIsMobile } from "../../../hooks/useIsMobile";
interface CardServiceProps {
  services: IService[];
}

export const CardService: React.FC<CardServiceProps> = ({ services }) => {
  const {
    citaData,
    calcularEdad,
    totalTemp,
    setTotalTemp,
    selectedServices,
    setSelectedServices,
  } = useContext(CitasFormContext);

  const isMobile = useIsMobile();

  const edadCliente = calcularEdad(citaData.client.fecha_nacimiento);
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      if (edadCliente < 18) {
        return (
          service.name === "Corte de niño" || !service.name.includes("Corte")
        );
      }
      if (edadCliente >= 60) {
        return (
          service.name === "Corte de adulto mayor" ||
          !service.name.includes("Corte")
        );
      }
      return service.name === "Corte" || !service.name.includes("Corte");
    });
  }, [edadCliente, services]);

  const handleCheckboxChange = (serviceId: number, servicePrice: number) => {
    const isSelected = selectedServices.includes(serviceId);

    let newSelectedServices = [...selectedServices];
    let newTotal = totalTemp;

    if (isSelected) {
      newSelectedServices = newSelectedServices.filter(
        (id) => id !== serviceId
      );
      newTotal -= servicePrice;
    } else {
      newSelectedServices.push(serviceId);
      newTotal += servicePrice;
    }

    setSelectedServices(newSelectedServices);
    setTotalTemp(newTotal);
  };

 return (
  <>
    {filteredServices.map((service) => {
      const isSelected = selectedServices.includes(service.id);

      const handleSelect = () => {
        if (isMobile) {
          handleCheckboxChange(service.id, service.price);
        }
      };

      return (
        <Card
          className={`d-flex flex-column border shadow-sm m-2 cardService ${
            isSelected ? "bg-light border-success" : ""
          }`}
          key={service.id}
          onClick={handleSelect}
          style={{ cursor: isMobile ? "pointer" : "default" }}
        >
          <Card.Body>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <Card.Title className="fw-bold">{service.name}</Card.Title>

              {!isMobile && (
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(service.id, service.price)}
                />
              )}
            </div>

            <Card.Text className="fw-light lh-1">{service.description}</Card.Text>

            <Card.Text className="fw-600 text-success">
              ${service.price}
              {service.id === 5 && (
                <span
                  className="text-muted fst-italic d-block"
                  style={{ fontSize: "0.85rem" }}
                >
                  *Este precio puede aumentar dependiendo el diseño.
                </span>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    })}
  </>
);
};
