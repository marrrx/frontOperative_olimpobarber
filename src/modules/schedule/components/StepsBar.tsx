import React, { useContext } from "react";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import "../styles/styles.css";

export const StepsBar = () => {
  const steps: string[] = [
    "Insertar datos",
    "Seleccionar sucursal",
    "Seleccionar barbero",
    "Seleccionar servicios",
    "Seleccionar fecha",
    "Confirmar",
  ];

  const { currentStep } = useContext(CitasFormContext);

  return (
    <>
      <div className="d-flex justify-content-center my-3 align-items-center ">
        {steps?.map((step, i) => (
          <React.Fragment key={i}>
            <div
              className="text-center w-25 mt-lg-4 me-3 ms-3 d-flex flex-column justify-content-center align-items-center"
              key={i}
            >
              <div
                className={`d-flex justify-content-center align-items-center cirlceStep ${
                  currentStep >= i + 1 ? "active" : "inactive"
                }`}
              >
                {i + 1}
              </div>
              <div>
                <p className="d-none d-md-block label_step">{step}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`spacer d-none d-lg-block ${
                  currentStep >= i + 2 ? "active" : "inactive"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
