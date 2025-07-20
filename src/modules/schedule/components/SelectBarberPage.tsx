import { useContext, useEffect, useState } from "react";
import { CardBarber } from "./CardBarber";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { motion } from "framer-motion";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";
import { StyledBackButton } from "../../../general/components/StyledBackButton";

export const SelectBarberPage = () => {
  const navigate = useNavigate();
  const { setCurrentStep, citaData } = useContext(CitasFormContext);
  const { workers, fetchWorkersByBranch } = useContext(DataContext);

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep);
    navigate("/agendar/branch");
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchWorkersByBranch(citaData.branchId);
      } catch (error) {
        console.error("Error al obtener barberos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      className="mx-3 mt-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <h5>Seleccionar barbero</h5>
      <div className="d-flex flex-column flex-lg-row">
        {loading ? (
          <div className="d-flex justify-content-center mt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : workers.length > 0 ? (
          <CardBarber barbers={workers} />
        ) : (
          <div className="alert alert-info mt-3" role="alert">
            No hay barberos disponibles
          </div>
        )}
      </div>
      <StyledBackButton
        className="mt-3"
        as={Button}
        size="sm"
        onClick={() => {
          handleGoBack();
        }}
      >
        <i className="bi bi-arrow-left-circle me-2"></i>
        Regresar
      </StyledBackButton>
    </motion.div>
  );
};
