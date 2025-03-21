import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CitasFormContext } from "../../general/contexts/CitasFormContext/CitasFormContext";
import { StepsBar } from "./components/StepsBar";
import "./styles/styles.css";
export const PageSchedule = () => {
  const location = useLocation();
  const { setCurrentStep } = useContext(CitasFormContext);

  useEffect(() => {
    const stepMapping: { [key: string]: number } = {
      "/citas": 1,
      "/citas/branch": 2,
      "/citas/barber": 3,
      "/citas/service": 4,
      "/citas/date": 5,
      "/citas/confirm": 6,
    };

    setCurrentStep(stepMapping[location.pathname] || 0);
  }, [location.pathname, setCurrentStep]);

  return (
    <div className="overflow-hidden customContainer p-md-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="text-center text-white mt-5 d-none d-md-block">
        <h2>Olimpo Barber</h2>
        {/* <p>Somos una empresa con años de experiencia </p> */}
      </div>

      <div className="card overflow-hidden bg-white rounded-2 mt-5 p-md-5">
        <div className="ms-3">
          <h2>Agenda tu visita</h2>
          <p>
            Sigue los pasos para agendar tu cita en la sucursal y con tu barbero
            de preferencia.
          </p>
        </div>

        <StepsBar />
        <Outlet />
      </div>
    </div>
  );
};
