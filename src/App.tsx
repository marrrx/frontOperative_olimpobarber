import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/GeneralStyles.css";
import { RoutesAuth } from "./modules/auth/RoutesAuth";
import { Page404 } from "./views/Page404";
import { PageSchedule } from "./modules/schedule/PageSchedule";
import { RoutesSchedule } from "./modules/schedule/RoutesSchedule";

export const App = () => {
  const basename = process.env.REACT_APP_BASE_NAME;
  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="/home" element={<></>}>
            <Route index element={<></>} />
          </Route>
          <Route path="citas/*" element={<RoutesSchedule/>}/>
          <Route path="login/*" element={<RoutesAuth />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
