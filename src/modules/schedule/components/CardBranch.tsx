import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { Branch } from "../interfaces/Branch";

interface CardBranchProps {
  branches: Branch[];
}

export const CardBranch: React.FC<CardBranchProps> = ({ branches }) => {
  const {setCurrentStep, updateCitaData } =
    useContext(CitasFormContext);
    const navigate = useNavigate();

  const handleSelectBranch = (branch: number) => {
    updateCitaData({ branchId: branch });
    setCurrentStep((prevStep) => prevStep + 1);
    navigate("/citas/barber");
  };

  
  return (
    <>
      {branches.map((branch, index) => (
        <div key={index} className=" border m-2 shadow-sm d-flex flex-column">
          <div className="card-body">
            <h6 className="card-title fw-bold">{branch.nombre}</h6>
            <small>{branch.direccion}</small>
            <p className="card-text mt-2 fw-light lh-1">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div className=" d-flex flex-wrap p-2 mx-2 justify-content-between">
            <div>
              <small className="text-success">{branch.horario}</small>
            </div>
            <div className="mb-0">
              <StyledButton
                as={Button}
                variant="filled"
                className="btn shadow-sm px-3 py-2 btn-sm btn-md btn-lg"
                onClick={() => handleSelectBranch(branch.id)}
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
