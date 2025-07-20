import dayjs from "dayjs";
import React, { createContext, useEffect, useState } from "react";
import { CitaData } from "./interfaces/CitaData";
import { CitasFormContextProps } from "./interfaces/CitasFormContextProps";
import { ProviderProps } from "./interfaces/CitasFormProviderProps";

export const CitasFormContext = createContext<CitasFormContextProps>({
  currentStep: 1,
  setCurrentStep: () => {},
  citaData: {
    client: { name: "", apellido: "", fecha_nacimiento: "", telefono: "" },
    branchId: 0,
    workerId: 0,
    date: "",
    time: "",
    services: [],
    total: 0,
  },
  updateCitaData: () => {},
  calcularEdad: () => 0,
  clearCitaData: () => {},
  selectedServices: [],
  setSelectedServices: () => {},
  selectedBranch: null,
  setSelectedBranch: () => {},
  totalTemp: 0,
  setTotalTemp: () => {},
});

export const CitasFormProvider: React.FC<ProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    return Number(sessionStorage.getItem("currentStep")) || 1;
  });

  const [citaData, setCitaData] = useState<CitaData>(() => {
    const savedData = sessionStorage.getItem("citaData");
    return savedData
      ? JSON.parse(savedData)
      : {
          client: { name: "", apellido: "", fecha_nacimiento: "" },
          branchId: 0,
          workerId: 0,
          date: "",
          time: "",
          services: [],
          total: 0,
        };
  });

  useEffect(() => {
    sessionStorage.setItem("currentStep", String(currentStep));
  }, [currentStep]);

  useEffect(() => {
    sessionStorage.setItem("citaData", JSON.stringify(citaData));
  }, [citaData]);

  const updateCitaData = (data: Partial<CitaData>) => {
    setCitaData((prev) => ({
      ...prev,
      ...data,
      client: {
        ...prev.client,
        ...(data.client || {}),
      },
    }));
  };

  const clearCitaData = () => {
    setCitaData({
      client: { name: "", apellido: "", fecha_nacimiento: "", telefono: "" },
      branchId: 0,
      workerId: 0,
      date: "",
      time: "",
      services: [],
      total: 0,
    });
    sessionStorage.removeItem("citaData");
    sessionStorage.removeItem("currentStep");
    sessionStorage.removeItem("lastPath");
  };

  const calcularEdad = (fechaNacimiento: string): number => {
    if (!fechaNacimiento) return 0;

    const hoy = dayjs();
    const nacimiento = dayjs(fechaNacimiento);
    const edad = hoy.diff(nacimiento, "year");

    return edad;
  };

  const [selectedServices, setSelectedServices] = useState<number[]>(
    citaData.services
  );
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [totalTemp, setTotalTemp] = useState(citaData.total);

  console.log(citaData)
  return (
    <CitasFormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        citaData,
        updateCitaData,
        calcularEdad,
        clearCitaData,
        selectedServices,
        setSelectedServices,
        totalTemp,
        setTotalTemp,
        selectedBranch,
        setSelectedBranch,
      }}
    >
      {children}
    </CitasFormContext.Provider>
  );
};
