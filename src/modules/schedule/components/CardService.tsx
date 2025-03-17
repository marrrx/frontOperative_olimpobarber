import { Checkbox } from "@mui/material";
import React from "react";
import { Card } from "react-bootstrap";
import { Service } from "../interfaces/service";
import "../styles/styles.css"
interface CardServiceProps {
  services: Service[];
}

export const CardService: React.FC<CardServiceProps> = ({services}) => {

  return (
    <>
    {services.map((service) => (
        <Card className="d-flex flex-column border shadow-sm m-2 cardService" key={service.id}>
          <Card.Body>
            <div className="d-flex flex-row align-items-center justify-content-between ">
            <Card.Title className="fw-bold">{service.nombre}</Card.Title>
            <Checkbox></Checkbox>
            </div>
            <Card.Text className="fw-light lh-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. </Card.Text>
            <Card.Text className="fw-600 text-success">${service.price}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
