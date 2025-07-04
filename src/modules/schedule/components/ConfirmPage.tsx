import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";
import { ICreateAppointmentDTO } from "../../../general/contexts/DataContext/interfaces/ICreateAppointmentDTO";
import Swal from "sweetalert2";
import { StyledBackButton } from "../../../general/components/StyledBackButton";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { to12hCompact } from "../../../general/utils/Dates";

export const ConfirmPage = () => {
  const {
    setCurrentStep,
    citaData,
    clearCitaData,
    setSelectedServices,
    totalTemp,
    setTotalTemp
  } = useContext(CitasFormContext);
  const { createAppointment } = useContext(DataContext);
  const navigate = useNavigate();
  dayjs.locale("es");

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate(-1);
  };

  const createAppoinmentDTO: ICreateAppointmentDTO = {
    clientName: citaData.client.name,
    clientLastName: citaData.client.apellido,
    clientPhoneNumber: citaData.client.telefono,
    branchId: citaData.branchId,
    workerId: citaData.workerId,
    date: citaData.date,
    time: citaData.time,
    servicesId: citaData.services,
  };

  const confirm = async () => {
    const result = await Swal.fire({
      title: "¿Confirmar cita?",
      text: "¿Estás seguro de que los datos con correctos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await createAppointment(createAppoinmentDTO);
        clearCitaData();
        setSelectedServices([]);
        setCurrentStep(1);
        setTotalTemp(0);
        navigate("/citas");
        Swal.fire(
          "¡Cita creada!",
          "Recuerda enviar tu comprobante de pago.",
          "success"
        )
      } catch (error) {
        Swal.fire(
          "Error",
          "No se pudo crear la cita. Intenta nuevamente.",
          "error"
        );
      }
    }
  };

  const isMobile = useIsMobile();
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
      <h5>Confirmar</h5>
      <div className="d-flex flex-column">
        <p>
          {citaData.client.name + ` ` + citaData.client.apellido}, su cita será
          el día {dayjs(citaData.date).format("dddd DD [de] MMMM")} a las{" "}
          {to12hCompact(citaData.time)}, con un precio total de <strong>${totalTemp}</strong>.
        </p>
        <p>
          Si los datos son correctos, es necesario pagar el 50% del precio total
          para poder confirmar la cita, una vez depositado al número de cuenta
          mencionado a continuación, favor de enviar el comprobante vía
          whatsapp; si el comprobante no es recibido en media hora la cita será
          cancelada.
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
            <strong>${Math.round(totalTemp / 2)}</strong>
          </div>
        </div>
      </div>

      <Row
        className={`${
          isMobile ? "justify-content-center" : "justify-content-start"
        } mt-3`}
      >
        <Col xs="auto">
          <div className="d-flex gap-2">
            <StyledBackButton as={Button} onClick={handleGoBack} size="sm">
              <i className="bi bi-arrow-left-circle me-2"></i>
              Regresar
            </StyledBackButton>

            <StyledButton
              as={Button}
              onClick={() => {
                confirm();
              }}
              size="sm"
            >
              <i className="bi bi-arrow-right-circle me-2"></i>
              Finalizar
            </StyledButton>
          </div>
        </Col>
      </Row>
    </motion.div>
  );
};
