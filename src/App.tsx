import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/GeneralStyles.css";
import { Page404 } from "./views/Page404";
import { RoutesSchedule } from "./modules/schedule/RoutesSchedule";
import { Layout } from "./views/Layout";
import { PageHome } from "./modules/home/PageHome";
import { PageAbout } from "./modules/about/PageAbout";
import { PageAppointments } from "./modules/appointments/PageAppointments";
import { PageTerms } from "./modules/legal/PageTerms";
import { PagePrivacity } from "./modules/legal/PagePrivacity";

export const App = () => {
  const basename = process.env.REACT_APP_BASE_NAME;
  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PageHome />} />
            <Route path="agendar/*" element={<RoutesSchedule />} />
            <Route path="servicios/*" element={<PageAbout />} />
            <Route path="citas/*" element={<PageAppointments />} />
            <Route path="terms" element={<PageTerms />} />
            <Route path="privacity" element={<PagePrivacity />} />

          </Route>

          {/* <Route path="login/*" element={<RoutesAuth />} /> */}

          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
