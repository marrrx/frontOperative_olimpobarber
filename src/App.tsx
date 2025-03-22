import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/GeneralStyles.css";
import { Page404 } from "./views/Page404";
import { RoutesSchedule } from "./modules/schedule/RoutesSchedule";
import { Layout } from "./views/Layout";
import { PageHome } from "./modules/home/PageHome";

export const App = () => {
  const basename = process.env.REACT_APP_BASE_NAME;
  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PageHome />} />
            <Route path="citas/*" element={<RoutesSchedule />} />
          </Route>

          {/* <Route path="login/*" element={<RoutesAuth />} /> */}

          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
