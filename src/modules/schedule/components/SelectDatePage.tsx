import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";

export const SelectDatePage = () => {
  const navigate = useNavigate();
  const { setCurrentStep } = useContext(CitasFormContext);

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate(-1);
  };
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    navigate("/citas/date");
  };
  const [selected, setSelected] = useState<string | null>(null);

  const horas = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const tomorrow = dayjs().add(1, "day"); 
  const disableSundays = (date: dayjs.Dayjs) => {
    return date.day() === 0;
  };

  return (
    <>
      <div className="mx-3 mt-4">
        <h5>Seleccionar fecha y hora</h5>
        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center">
          <div className="mt-5">
            <DatePicker
              label="Seleccionar"
              disablePast
              minDate={tomorrow}
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
                    checked={selected === hora}
                    onChange={(e) => setSelected(e.target.value)}
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
        <div className="d-flex flex-row justify-content-between">
          <StyledButton
            as={Button}
            className="mt-3"
            onClick={() => {
              handleGoBack();
            }}
          >
            Regresar
          </StyledButton>
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
      </div>
    </>
  );
};
