import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { Branch } from "../interfaces/Branch";

interface CardBranchesProps {
  branches: Branch[];
}

export const CardBranches: React.FC<CardBranchesProps> = ({ branches }) => {
  const { currentStep, setCurrentStep } = useContext(CitasFormContext);

  console.log(currentStep);
  return (
    <>
      {branches.map((branch, index) => (
        <div key={index} className=" border m-2 shadow-sm">
          <div className="card-body">
            <h6 className="card-title fw-bold">{branch.nombre}</h6>
            <small>{branch.direccion}</small>
            <p className="card-text mt-2 fw-light lh-1">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div className="d-flex flex-row p-2 mx-2 justify-content-between">
            <div>
              <small className="text-success">{branch.horario}</small>
            </div>
            <div className="mb-0">
              <StyledButton
                as={Button}
                variant="filled"
                className="btn-sm shadow-sm"
                onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
              >
                Seleccionar
              </StyledButton>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
