import { Navigate, Route, Routes } from "react-router-dom";
import { SelectBranch } from "./components/SelectBranch";
import { PageSchedule } from "./PageSchedule";

export const RoutesSchedule = () => {
  return (
    <Routes>
      <Route path="/*" element={<PageSchedule />}>
        <Route path="" element={<SelectBranch />} />
      </Route>
      <Route path="/*" element={<Navigate to={"../"} replace />} />
    </Routes>
  );
};
