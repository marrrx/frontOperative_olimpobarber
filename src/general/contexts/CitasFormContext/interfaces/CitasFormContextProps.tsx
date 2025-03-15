import React, { SetStateAction } from "react";

export interface CitasFormContextProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
