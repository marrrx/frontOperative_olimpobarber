import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export const InsertPersonalDataPage = () => {
  const navigate = useNavigate();
  const { setCurrentStep, updateCitaData, citaData } =
    useContext(CitasFormContext);

  const handleNext = () => {
    if (
      citaData.client.name &&
      citaData.client.apellido &&
      citaData.client.fecha_nacimiento
    ) {
      setCurrentStep((prev) => prev + 1);
      navigate("/agendar/branch");
    } else {
      toast.error("Debes completar todos los campos primero");
    }
  };

  return (
    <motion.div className="mx-3 mt-4"    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      duration: 1,
    }}>
      <h5>Insertar datos</h5>
      <p>
        Los datos ingresados serán utilizados con la finalidad de agendar tu
        cita.
      </p>
      <div className="d-flex flex-column flex-lg-row p-3">
        <TextField
          label="Nombre"
          value={citaData.client.name}
          onChange={(e) =>
            updateCitaData({
              client: { ...citaData.client, name: e.target.value },
            })
          }
        />
        <TextField
          label="Apellido"
          className="ms-lg-3 mt-3 mt-lg-0"
          value={citaData.client.apellido}
          onChange={(e) =>
            updateCitaData({
              client: { ...citaData.client, apellido: e.target.value },
            })
          }
        />
        <DatePicker
          label="Fecha de nacimiento"
          className="ms-lg-3 mt-3 mt-lg-0"
          disableFuture
          minDate = {dayjs().subtract(90, "year")}
          maxDate={dayjs().subtract(2, "year")}
          value={
            citaData.client.fecha_nacimiento
              ? dayjs(citaData.client.fecha_nacimiento)
              : null
          }
          onChange={(newValue) => {
            if (newValue) {
              updateCitaData({
                client: {
                  ...citaData.client,
                  fecha_nacimiento: newValue.format("YYYY-MM-DD"),
                },
              });
            }
          }}
        />
      </div>

      <div className="d-flex flex-row justify-content-end">
        <StyledButton
          as={Button}
          className="mt-3"
          onClick={() => {
            handleNext();
          }}
        >
          Siguiente
        </StyledButton>
      </div>
    </motion.div>
  );
};
