import { Checkbox } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { Service } from "../interfaces/service";
import "../styles/styles.css";
interface CardServiceProps {
  services: Service[];
}

export const CardService: React.FC<CardServiceProps> = ({ services }) => {
  const { updateCitaData, citaData, calcularEdad } =
    useContext(CitasFormContext);

  const edadCliente = calcularEdad(citaData.client.fecha_nacimiento);
  console.log(edadCliente);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      if (edadCliente < 18) {
        return service.nombre === "Corte niño" || !service.nombre.includes("Corte");
      }
      if (edadCliente >= 60) {
        return service.nombre === "Corte adulto mayor" || !service.nombre.includes("Corte");
      }
      return service.nombre === "Corte adulto" || !service.nombre.includes("Corte");
    });
  }, [edadCliente, services]);
  
  

  return (
    <>
      {filteredServices.map((service) => (
        <Card
          className="d-flex flex-column border shadow-sm m-2 cardService"
          key={service.id}
        >
          <Card.Body>
            <div className="d-flex flex-row align-items-center justify-content-between ">
              <Card.Title className="fw-bold">{service.nombre}</Card.Title>
              <Checkbox
                checked={citaData.services.includes(service.id)}
                onChange={() => {
                  const isSelected = citaData.services.includes(service.id);
                  updateCitaData({
                    services: isSelected
                      ? citaData.services.filter((id) => id !== service.id)
                      : [...citaData.services, service.id],
                    total: isSelected
                      ? citaData.total - service.price
                      : citaData.total + service.price,
                  });
                }}
              ></Checkbox>
            </div>
            <Card.Text className="fw-light lh-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            </Card.Text>
            <Card.Text className="fw-600 text-success">
              ${service.price}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
