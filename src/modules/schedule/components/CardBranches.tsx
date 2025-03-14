import React from "react";
import { Button } from "react-bootstrap";
import { StyledButton } from "../../../general/components/StyledButton";
import { Branch } from "../interfaces/Branch";

interface CardBranchesProps {
  branches: Branch[];
}

export const CardBranches: React.FC<CardBranchesProps> = ({ branches }) => {
  return (
    <>
      {branches.map((branch, index) => (
        <div key={index} className="card border m-2 w-100 shadow-sm">
          <div className="card-body">
            <h6 className="card-title fw-bold">{branch.nombre}</h6>
            <small>{branch.direccion}</small>
            <p className="card-text mt-2 fw-light lh-1">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
          </div>
          <div className="d-flex flex-row p-2 mx-2 justify-content-between">
            <div>
              <small className="text-success">{branch.horario}</small>
            </div>
            <div>
              <StyledButton as={Button} variant="filled" className="btn-sm shadow-sm">Seleccionar</StyledButton>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
