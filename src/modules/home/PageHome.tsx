import { motion } from "framer-motion";
import { StyledButton } from "../../general/components/StyledButton";

export const PageHome = () => {
  return (
    <>
      <div className="vh-100">
        <div className="d-flex bg-secondary h-50 text-center justify-content-center flex-column align-items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fw-bold display-5 "
          >
            Agenda tu cita en linea
            <small className="text-body-secondary">
              {" "}
              donde quiera que estes.
            </small>
          </motion.h1>
          <StyledButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.5,
            }}
            className="rounded mt-3"
          >
            Ir ahora
          </StyledButton>
        </div>
      </div>
    </>
  );
};
