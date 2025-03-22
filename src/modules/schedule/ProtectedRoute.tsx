import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CitasFormContext } from "../../general/contexts/CitasFormContext/CitasFormContext";
import { CitaData } from "../../general/contexts/CitasFormContext/interfaces/CitaData";

interface ProtectedRouteProps {
  requiredStep: keyof typeof stepsOrder;
}

const stepsOrder = {
  "insert-data": "client",
  "select-branch": "branchId",
  "select-barber": "workerId",
  "select-service": "services",
  "select-date": "date",
  confirm: "confirm",
};

export const ProtectedRoute = ({ requiredStep }: ProtectedRouteProps) => {
  const { citaData } = useContext(CitasFormContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!citaData[stepsOrder[requiredStep] as keyof CitaData]) {
        navigate("/citas");
    }
  }, [citaData, requiredStep, navigate]);

  return <Outlet />;
};
