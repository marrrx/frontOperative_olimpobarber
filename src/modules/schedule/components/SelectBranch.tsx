import React from "react";
import { CardBranches } from "./CardBranches";
import branches from "../data/branches.json";
import { Branch } from "../interfaces/Branch";


export const SelectBranch = () => {
  const branchesData: Branch[] = branches.branches; 

  return (
    <div className="mx-3 mt-4">
      <h5>Selecciona sucursal</h5>
      <div className="d-flex flex-column flex-lg-row">
        <CardBranches branches={branchesData} />
      </div>
    </div>
  );
};
