import React, { createContext, useState } from "react";
import { CitaData } from "./interfaces/CitaData";
import { CitasFormContextProps } from "./interfaces/CitasFormContextProps";
import { ProviderProps } from "./interfaces/CitasFormProviderProps";

export const CitasFormContext = createContext<CitasFormContextProps>({
  currentStep: 0,
  setCurrentStep: () => {},
  citaData: { branchId: undefined },
  updateCitaData: () => {},
});

export const CitasFormProvider: React.FC<ProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [citaData, setCitaData] = useState<CitaData>({});

  const updateCitaData = (data: Partial<CitaData>) => {
    setCitaData((prevData) => ({ ...prevData, ...data }));
  };

  console.log(citaData);
  return (
    <CitasFormContext.Provider
      value={{ currentStep, setCurrentStep, citaData, updateCitaData }}
    >
      {children}
    </CitasFormContext.Provider>
  );
};
