import { CardBranch } from "./CardBranch";
import branches from "../data/branches.json";
import { Branch } from "../interfaces/Branch";

export const SelectBranchPage = () => {
  const branchesData: Branch[] = branches.branches;


  return (
    <div className="mx-3 mt-4">
      <h5>Seleccionar sucursal</h5>
      <div className="d-flex flex-column flex-lg-row">
        <CardBranch branches={branchesData} />
      </div>
    </div>
  );
};
