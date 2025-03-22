import dayjs from "dayjs";
import React, { createContext, useState } from "react";
import { CitaData } from "./interfaces/CitaData";
import { CitasFormContextProps } from "./interfaces/CitasFormContextProps";
import { ProviderProps } from "./interfaces/CitasFormProviderProps";

export const CitasFormContext = createContext<CitasFormContextProps>({
  currentStep: 1,
  setCurrentStep: () => {},
  citaData: {
    client: { name: "", apellido: "", fecha_nacimiento: "" },
    branchId: 0,
    workerId: 0,
    date: "",
    time: "",
    services: [],
    total: 0,
  },
  updateCitaData: () => {},
  calcularEdad: () => 0
});

export const CitasFormProvider: React.FC<ProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [citaData, setCitaData] = useState<CitaData>({
    client: { name: "", apellido: "", fecha_nacimiento: "" },
    branchId: 0,
    workerId: 0,
    date: "",
    time: "",
    services: [],
    total: 0,
  });

  const updateCitaData = (data: Partial<CitaData>) => {
    setCitaData((prevData) => ({
      ...prevData,
      ...data,
      client: data.client
        ? { ...prevData.client, ...data.client }
        : prevData.client,
    }));
  };

  const calcularEdad = (fechaNacimiento: string): number => {
    if (!fechaNacimiento) return 0;

    const hoy = dayjs();
    const nacimiento = dayjs(fechaNacimiento);
    const edad = hoy.diff(nacimiento, "year");

    return edad;
  };

  console.log(citaData);
  return (
    <CitasFormContext.Provider
      value={{ currentStep, setCurrentStep, citaData, updateCitaData,calcularEdad }}
    >
      {children}
    </CitasFormContext.Provider>
  );
};
