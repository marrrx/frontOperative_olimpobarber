import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CitasFormContext } from "../../general/contexts/CitasFormContext/CitasFormContext";
import { StepsBar } from "./components/StepsBar";
import "./styles/styles.css";
export const PageSchedule = () => {
  const location = useLocation();
  const { setCurrentStep } = useContext(CitasFormContext);

  useEffect(() => {
    const stepMapping: { [key: string]: number } = {
      "/citas": 1,
      "/citas/barber": 2,
      "/citas/service": 3,
      "/citas/date": 4,
      "/citas/confirm": 5,
    };

    setCurrentStep(stepMapping[location.pathname] || 0);
  }, [location.pathname, setCurrentStep]);

  return (
    <div className="overflow-hidden customContainer p-md-4">
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
