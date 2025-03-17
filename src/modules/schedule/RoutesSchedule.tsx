import { Navigate, Route, Routes } from "react-router-dom";
import { SelectBarberPage } from "./components/SelectBarberPage";
import { SelectBranchPage } from "./components/SelectBranchPage";
import { SelectDatePage } from "./components/SelectDatePage";
import { SelectServicePage } from "./components/SelectServicePage";
import { PageSchedule } from "./PageSchedule";

export const RoutesSchedule = () => {
  return (
    <Routes>
      <Route path="/*" element={<PageSchedule />}>
        <Route path="" element={<SelectBranchPage />} />
        <Route path="barber" element={<SelectBarberPage />} />
        <Route path="service" element={<SelectServicePage />} />
        <Route path="date" element={<SelectDatePage />} />


      </Route>
      <Route path="/*" element={<Navigate to={"../"} replace />} />
    </Routes>
  );
};
