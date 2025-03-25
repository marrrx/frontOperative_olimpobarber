import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CitasFormContext } from "../../general/contexts/CitasFormContext/CitasFormContext";
import { StepsBar } from "./components/StepsBar";
import "./styles/styles.css";

const stepMapping: { [key: string]: number } = {
  "/citas": 1,
  "/citas/branch": 2,
  "/citas/barber": 3,
  "/citas/service": 4,
  "/citas/date": 5,
  "/citas/confirm": 6,
};

export const PageSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentStep } = useContext(CitasFormContext);

  useEffect(() => {
    const currentStep = stepMapping[location.pathname] || 1;
    setCurrentStep(currentStep);

    if (location.pathname !== "/citas") {
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
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
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
        <Outlet/>
      </div>
    </Container>
  );
};
