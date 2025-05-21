import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../general/components/StyledButton";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";
import { ICreateAppointmentDTO } from "../../../general/contexts/DataContext/interfaces/ICreateAppointmentDTO";
import Swal from "sweetalert2";

export const ConfirmPage = () => {
  const { setCurrentStep, citaData, clearCitaData, setSelectedServices,totalTemp } =
    useContext(CitasFormContext);
  const { createAppointment } =
    useContext(DataContext);
  const navigate = useNavigate();
  dayjs.locale("es");

  const handleGoBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    navigate(-1);
  };

  const createAppoinmentDTO: ICreateAppointmentDTO = {
    clientName: citaData.client.name,
    clientLastName: citaData.client.apellido,
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
      navigate("/citas");
      Swal.fire("¡Cita creada!", "Recuerda enviar tu comprobante de pago.", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo crear la cita. Intenta nuevamente.", "error");
    }
  }
};

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
          {dayjs(citaData.time, "HH:mm").format("h:mm A")}; con un precio total
          de ${totalTemp}.
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
            confirm();
          }}
        >
          Finalizar
        </StyledButton>
      </div>
    </motion.div>
  );
};
