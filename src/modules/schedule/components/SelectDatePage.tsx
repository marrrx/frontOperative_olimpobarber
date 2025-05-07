import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";

export const SelectDatePage = () => {
  const navigate = useNavigate();
  const { setCurrentStep, updateCitaData, citaData } =
    useContext(CitasFormContext);
  const { fetchAvailableTimes, availableTimes, selectedWorker } =
    useContext(DataContext);

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate("/agendar/service");
  };
  const handleNext = () => {
    if (citaData.date && citaData.time) {
      setCurrentStep((prev) => prev + 1);
      navigate("/agendar/confirm");
    } else {
      toast.error("Debes seleccionar la fecha y hora");
    }
  };

  const tomorrow = dayjs().add(1, "day");

  const disableDayOff = (date: dayjs.Dayjs) => {
    return date.day() === selectedWorker.dayOff;
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
                  const formattedDate = newValue.format("YYYY-MM-DD");
                  updateCitaData({
                    date: formattedDate,
                  });
                  fetchAvailableTimes(citaData.workerId, formattedDate);
                }
              }}
              shouldDisableDate={disableDayOff}
            ></DatePicker>
          </div>

          <div className="ms-md-5 mt-5 mt-sm-0 text-center text-sm-start ">
            {availableTimes.length > 0 ? (
              <p>Selecciona la hora</p>
            ) : (
              <p>Selecciona una fecha para ver las horas disponibles</p>
            )}
            <div className="d-flex flex-wrap justify-content-center">
              {availableTimes.map((hora, i) => (
                <>
                  <input
                    key={i}
                    id={`hora-${i}`}
                    type="radio"
                    name="horas"
                    className="btn-check"
                    value={hora}
                    checked={citaData.time === hora}
                    onChange={(e) => {
                      updateCitaData({ time: e.target.value });
                    }}
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
