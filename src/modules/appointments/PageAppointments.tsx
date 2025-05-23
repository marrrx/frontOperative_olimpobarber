import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { DataContext } from "../../general/contexts/DataContext/DataContext";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const CountdownTimer = ({ expiresAt }: { expiresAt: string }) => {
  const calculateTimeLeft = () => {
    const expiry = new Date(expiresAt).getTime();
    const now = new Date().getTime();
    const difference = expiry - now;

    if (difference <= 0) return null;

    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  if (!timeLeft) return <span className="text-danger">Expirada</span>;

  return (
    <span className="text-success">
      {timeLeft.minutes}m {timeLeft.seconds}s restantes
    </span>
  );
};

export const PageAppointments = () => {
  dayjs.locale("es");
  const { appointments, fetchAppointments } = useContext(DataContext);

  const pendingAppontments = appointments.filter((a) => a.status === 0);
  const confirmedAppointments = appointments.filter((a) => a.status === 1);
  const cancelledAppointments = appointments.filter((a) => a.status === 2);

  const formatDate = (date: string) => {
    return dayjs(date).format("dddd DD [de] MMMM");
  };
 
  const showPaymentInfo = () => {
    Swal.fire({
      title: "Información de pago",
      html: '<span style="font-size: 14px;">CLABE: <strong>646015206807648902</strong></span><br/><span style="font-size: 14px;">Banco: <strong>STP</strong></span></br><span style="font-size: 14px;">Nombre: <strong>Rafael Marquez</strong></span>',
      icon: "info",
      confirmButtonText: "Copiar CLABE",
      customClass: {
        popup: "small-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigator.clipboard.writeText("646015206807648902");
        toast.success("Copiado al portapapeles");
      }
    });
  };

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(() => {
      fetchAppointments();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
      <Row className="w-100">
        <Col lg={8}>
          <h2 className="fw-bolder  text-lg-start ">Citas pendientes</h2>
          <p className="fw-light text-lg-start">
            Se muestran las citas pendientes de pago, haz el pago del 50% y da
            click en el botón para enviar tu comprobante de pago.
          </p>
          {pendingAppontments.map((appointment, index) => (
            <div
              key={index}
              className=" rounded border m-2 mt-3 shadow d-flex flex-column p-2"
            >
              <div className="card-body">
                <h6 className="card-title ">
                  {appointment.clientName} {appointment.clientLastName}
                </h6>
                <small></small>
                <p className="card-text mt-2 fw-light lh-1">
                  <b> Sucursal:</b> {appointment.branchName}
                  <br />
                  <b> Barbero:</b> {appointment.workerName}
                  <br />
                  <b>Fecha:</b> {formatDate(appointment.date)}
                  <br />
                  <b> Hora:</b> {appointment.time}
                  <br />
                  <b> Monto total:</b> ${appointment.total}
                </p>
              </div>
              <div className=" d-flex flex-wrap p-2 mx-2 justify-content-between">
                <div>
                  <b>50% a pagar: </b>
                  <small className="text-success">
                    ${appointment.total / 2}
                  </small>
                </div>
                <div className="mb-0">
                  <Button
                    className="btn-success"
                    href="https://api.whatsapp.com/send/?phone=4498059894&text"
                  >
                    Whatsapp
                  </Button>
                </div>
              </div>
              <Link onClick={() => showPaymentInfo()} to={""}>
                Ver información de pago
              </Link>
              <CountdownTimer expiresAt={appointment.expiresAt} />
            </div>
          ))}
        </Col>
        <Col lg={8} className="mt-4">
          <h2 className="fw-bolder  text-lg-start ">Citas confirmadas</h2>
          {confirmedAppointments.map((appointment, index) => (
            <div
              key={index}
              className=" rounded border m-2 mt-3 shadow d-flex flex-column p-2"
            >
              <div className="card-body">
                <h6 className="card-title ">
                  {appointment.clientName} {appointment.clientLastName}
                </h6>
                <small></small>
                <p className="card-text mt-2 fw-light lh-1">
                  <b> Sucursal:</b> {appointment.branchName}
                  <br />
                  <b> Barbero:</b> {appointment.workerName}
                  <br />
                  <b>Fecha:</b> {formatDate(appointment.date)}
                  <br />
                  <b> Hora:</b> {appointment.time}
                  <br />
                  <b> Monto total:</b> ${appointment.total}
                </p>
              </div>
              <div className=" d-flex flex-wrap p-2 mx-2 justify-content-between">
                <div>
                  <b className="text-success">Confirmada</b>
                </div>
                <div className="mb-0"></div>
              </div>
            </div>
          ))}
        </Col>
        <Col lg={8}>
          <h2 className="fw-bolder  text-lg-start mt-4">Citas canceladas</h2>
          {cancelledAppointments.map((appointment, index) => (
            <div
              key={index}
              className=" rounded border m-2 mt-3 shadow d-flex flex-column p-2"
            >
              <div className="card-body">
                <h6 className="card-title ">
                  {appointment.clientName} {appointment.clientLastName}
                </h6>
                <small></small>
                <p className="card-text mt-2 fw-light lh-1">
                  <b> Sucursal:</b> {appointment.branchName}
                  <br />
                  <b> Barbero:</b> {appointment.workerName}
                  <br />
                  <b>Fecha:</b> {formatDate(appointment.date)}
                  <br />
                  <b> Hora:</b> {appointment.time}
                  <br />
                  <b> Monto total:</b> ${appointment.total}
                </p>
              </div>
              <div className=" d-flex flex-wrap p-2 mx-2 justify-content-between">
                <div>
                  <b className="text-danger">Cancelada </b>
                </div>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};
