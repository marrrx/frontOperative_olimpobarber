import dayjs from "dayjs";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";

export const ConfirmPage = () => {
  const { setCurrentStep, citaData } = useContext(CitasFormContext);
  const navigate = useNavigate();

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate(-1);
  };

  return (
    <div className="mx-3 mt-4">
      <h5>Confirmar</h5>
      <div className="d-flex flex-column">
        <p>
          {citaData.client.name + ` ` + citaData.client.apellido}, su cita será
          el día {dayjs(citaData.date).format("DD/MM")} a las{" "}
          {dayjs(citaData.time, "HH:mm").format("h:mm A")}; con un precio total de ${citaData.total}.
        </p>
        <p>
          Si los datos son correctos, es necesario pagar el 50% del precio total
          para poder confirmar la cita, una vez depositado al número de cuenta
          mencionado a continuación, favor de enviar el comprobante vía
          whatsapp; si el comprobante no es recibido en media hora la cita será cancelada.
        </p>
        <div className="d-flex flex-column flex-lg-row justify-content-lg-center align-items-lg-center ">
          <div>
            <h6 className="mb-0 fst-italic">CLABE:</h6>
            <strong> 646015206807648902</strong>
            <h6 className="mb-0 fst-italic">Banco:</h6>
            <strong> STP</strong>
            <h6 className="mb-0 fst-italic">Nombre:</h6>
            <strong> Rafael Marquez</strong>
            <h6 className="mb-0 fst-italic">Monto 50%:</h6>
            <strong>${Math.round(citaData.total / 2)}</strong>
          </div>
          <div className="ms-0 ms-lg-5  mt-3 mt-lg-0">
            <Button
              className="btn-success"
              href="https://api.whatsapp.com/send/?phone=4498059894&text"
            >
              Whatsapp
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center mt-5">
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
            }}
          >
            Siguiente
          </StyledButton>
        </div>
    </div>
  );
};
