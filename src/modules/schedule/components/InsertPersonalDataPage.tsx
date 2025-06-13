import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useIsMobile } from "../../../hooks/useIsMobile";

export const InsertPersonalDataPage = () => {
  const navigate = useNavigate();
  const { setCurrentStep, updateCitaData, citaData } =
    useContext(CitasFormContext);
  const isMobile = useIsMobile();

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
  const [telefonoError, setTelefonoError] = useState(false);

  return (
    <motion.div
      className="mx-3 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
      }}
    >
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
        <TextField
          label="Número de celular"
          className="ms-lg-3 mt-3 mt-lg-0"
          type="tel"
          value={citaData.client.telefono}
          error={telefonoError}
          helperText={telefonoError ? "El número debe tener 10 dígitos" : ""}
          onChange={(e) => {
            const value = e.target.value;

            // Solo permitir números
            if (!/^\d*$/.test(value)) return;

            updateCitaData({
              client: { ...citaData.client, telefono: value },
            });

            // Validar si tiene 10 dígitos
            setTelefonoError(value.length !== 10);
          }}
          inputProps={{ maxLength: 10 }}
        />
        <FormControl
          sx={{
            minWidth: 120,
          }}
          className="ms-lg-3 mt-3 mt-lg-0"
          variant="outlined"
        >
          <InputLabel id="edad-select-label">Edad</InputLabel>
          <Select
            labelId="edad-select-label"
            id="edad-select"
            value={citaData.client.fecha_nacimiento.toString()}
            label="Edad"
            onChange={(event: SelectChangeEvent) => {
              const value = event.target.value;
              updateCitaData({
                client: {
                  ...citaData.client,
                  fecha_nacimiento: value,
                },
              });
            }}
          >
            <MenuItem value="1">Niño</MenuItem>
            <MenuItem value="2">Adulto</MenuItem>
            <MenuItem value="3">Adulto mayor</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div
        className={`d-flex flex-row  ${
          isMobile ? "justify-content-end" : "mt-5"
        }`}
      >
        <StyledButton
          as={Button}
          className="mt-3 d-flex align-items-center justify-content-center"
          size="sm"
          onClick={handleNext}
        >
          <i className="bi bi-arrow-right-circle me-2"></i>
          Siguiente
        </StyledButton>
      </div>
    </motion.div>
  );
};
