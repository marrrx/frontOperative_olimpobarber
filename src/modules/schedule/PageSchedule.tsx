import { Outlet } from "react-router-dom";
import { StepsBar } from "./components/StepsBar";
import "./styles/styles.css";
export const PageSchedule = () => {

  
  return (
    <div className="overflow-hidden customContainer">
      <div className="text-center text-white mt-5 d-none d-md-block">
        <h2>Olimpo Barber</h2>
        <p>Somos una empresa con años de experiencia </p>
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
