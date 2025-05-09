import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CitasFormContext } from "../../general/contexts/CitasFormContext/CitasFormContext";
import { StepsBar } from "./components/StepsBar";
import "./styles/styles.css";

const stepMapping: { [key: string]: number } = {
  "/agendar": 1,
  "/agendar/branch": 2,
  "/agendar/barber": 3,
  "/agendar/service": 4,
  "/agendar/date": 5,
  "/agendar/confirm": 6,
};

export const PageSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentStep } = useContext(CitasFormContext);

  useEffect(() => {
    const currentStep = stepMapping[location.pathname] || 1;

    if (currentStep !== stepMapping[location.pathname]) {
      setCurrentStep(currentStep);
    }

    if (location.pathname !== "/agendar") {
      sessionStorage.setItem("lastPath", location.pathname);
    }
  }, [location.pathname, setCurrentStep]);

  useEffect(() => {
    const lastPath = sessionStorage.getItem("lastPath");
    if (lastPath) {
      navigate(lastPath, { replace: true });
    }
  }, [navigate]);


  return (
    <Container
      fluid
    >
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
      <div className="card overflow-hidden bg-white rounded-2 mt-2 p-md-5">
        <div>
          <h2>Agenda tu visita</h2>
          <p>
            Sigue los pasos para agendar tu cita en la sucursal y con tu barbero
            de preferencia.
          </p>
        </div>

        <StepsBar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </Container>
  );
};
