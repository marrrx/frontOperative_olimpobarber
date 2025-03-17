import React, { SetStateAction } from "react";
import { CitaData } from "./CitaData";

export interface CitasFormContextProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  citaData: CitaData;
  updateCitaData: (data: Partial<CitaData>) => void;
}
