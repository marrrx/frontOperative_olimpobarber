import { CardBranch } from "./CardBranch";
import branches from "../data/branches.json";
import { Branch } from "../interfaces/Branch";
import { useContext } from "react";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { Button } from "react-bootstrap";

export const SelectBranchPage = () => {
  const branchesData: Branch[] = branches.branches;
  const { setCurrentStep } = useContext(CitasFormContext);
  const navigate = useNavigate();

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate(-1);
  };

  return (
    <div className="mx-3 mt-4">
      <h5>Seleccionar sucursal</h5>
      <div className="d-flex flex-column flex-lg-row">
        <CardBranch branches={branchesData} />
      </div>
      <StyledButton
        className="mt-3"
        as={Button}
        onClick={() => {
          handleGoBack();
        }}
      >
        Regresar
      </StyledButton>
    </div>
  );
};
