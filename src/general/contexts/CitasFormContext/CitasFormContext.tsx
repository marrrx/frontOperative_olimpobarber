import React, { createContext, useReducer, useState } from "react";
import { CitasFormContextProps } from "./interfaces/CitasFormContextProps";
import { ProviderProps } from "./interfaces/CitasFormProviderProps";

export const CitasFormContext = createContext<CitasFormContextProps>({
  currentStep: 0,
  setCurrentStep: () => {},
});


export const CitasFormProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <CitasFormContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </CitasFormContext.Provider>
  );
};
