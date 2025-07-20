import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PageNewSchedule from "../newSchedule/PageNewSchedule";
import { ConfirmPage } from "./components/ConfirmPage";
import { InsertPersonalDataPage } from "./components/InsertPersonalDataPage";
import { SelectBarberPage } from "./components/SelectBarberPage";
import { SelectBranchPage } from "./components/SelectBranchPage";
import { SelectDatePage } from "./components/SelectDatePage";
import { SelectServicePage } from "./components/SelectServicePage";
import { PageSchedule } from "./PageSchedule";
import { ProtectedRoute } from "./ProtectedRoute";

export const RoutesSchedule = () => {
  const RedirectToLastStep = () => {
    const [redirectPath, setRedirectPath] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
      const lastPath = sessionStorage.getItem("lastPath") || "/citas";
      if (location.pathname === "/citas") {
        setRedirectPath(lastPath);
      }
    }, [location.pathname]);

    if (redirectPath) {
      return <Navigate to={redirectPath} replace />;
    }

    return null; 
  };
  return (
    <Routes>
      <Route path="/citas" element={<RedirectToLastStep />} />
      <Route path="/*" element={<PageNewSchedule />}>
        <Route index element={<InsertPersonalDataPage />} />
        <Route element={<ProtectedRoute requiredStep="insert-data" />}>
          <Route path="branch" element={<SelectBranchPage />} />
        </Route>
        <Route element={<ProtectedRoute requiredStep="select-branch" />}>
          <Route path="barber" element={<SelectBarberPage />} />
        </Route>
        <Route element={<ProtectedRoute requiredStep="select-barber" />}>
          <Route path="service" element={<SelectServicePage />} />
        </Route>
        <Route element={<ProtectedRoute requiredStep="select-service" />}>
          <Route path="date" element={<SelectDatePage />} />
        </Route>
        <Route element={<ProtectedRoute requiredStep="select-date" />}>
          <Route path="confirm" element={<ConfirmPage />} />
        </Route>
      </Route>
      <Route path="/*" element={<Navigate to={"../"} replace />} />
    </Routes>
  );
};
