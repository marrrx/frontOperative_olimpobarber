import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";

export const SelectDatePage = () => {
  const navigate = useNavigate();
  const { setCurrentStep, updateCitaData, citaData } =
    useContext(CitasFormContext);

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate("/citas/service");
  };
  const handleNext = () => {
    if (citaData.date && citaData.time) {
      setCurrentStep((prev) => prev + 1);
      navigate("/citas/confirm");
    } else {
      toast.error("Debes seleccionar la fecha y hora");
    }
  };

  const horas = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];
  const tomorrow = dayjs().add(1, "day");
  const disableSundays = (date: dayjs.Dayjs) => {
    return date.day() === 0;
  };

  return (
    <>
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
        <h5>Seleccionar fecha y hora</h5>
        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center">
          <div className="mt-5">
            <DatePicker
              label="Seleccionar"
              disablePast
              minDate={tomorrow}
              value={citaData.date ? dayjs(citaData.date) : null}
              onChange={(newValue) => {
                if (newValue) {
                  updateCitaData({
                    date: newValue.format("YYYY-MM-DD"),
                  });
                }
              }}
              shouldDisableDate={disableSundays}
            ></DatePicker>
          </div>

          <div className="ms-md-5 mt-5 mt-sm-0 text-center text-sm-start ">
            <p>Selecciona la hora</p>
            <div className="d-flex flex-wrap justify-content-center">
              {horas.map((hora, i) => (
                <>
                  <input
                    id={`hora-${i}`}
                    type="radio"
                    name="horas"
                    className="btn-check"
                    value={hora}
                    checked={citaData.time === hora}
                    onChange={(e) => {
                      updateCitaData({ time: e.target.value });
                    }}
                    disabled={i === 3}
                  />

                  <label
                    className="btn btn-outline-primary m-3"
                    htmlFor={`hora-${i}`}
                  >
                    {hora}
                  </label>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center ">
          <StyledButton
            as={Button}
            className="mt-3"
            onClick={() => {
              handleGoBack();
            }}
          >
            Regresar
          </StyledButton>

          <p className="fw-bold">Total: ${citaData.total}</p>

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
    </>
  );
};
