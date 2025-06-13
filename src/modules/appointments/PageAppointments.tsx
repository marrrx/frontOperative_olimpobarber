import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { DataContext } from "../../general/contexts/DataContext/DataContext";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { CardAppointment } from "./components/CardAppointment";
import { Expand } from "./components/Expand";
import TextField from "@mui/material/TextField";

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
  const { appointments, fetchAppointments, fetchAppointmentsByPhone } =
    useContext(DataContext);

  const pendingAppontments = appointments.filter((a) => a.status === 0);
  const confirmedAppointments = appointments.filter((a) => a.status === 1);
  const cancelledAppointments = appointments.filter((a) => a.status === 2);
  const expiredAppointments = appointments.filter((a) => a.status === 3);

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

  const [expandedSections, setExpandedSections] = useState<any>({
    pendientes: true,
    canceladas: false,
    completadas: false,
    expiradas: false,
    recuperar: false,
  });
  const [phone, setPhone] = useState<string>("");

  const toggleSection = (key: string) => {
    setExpandedSections((prev: any) => {
      const newState: any = {};

      Object.keys(prev).forEach((sectionKey) => {
        newState[sectionKey] = sectionKey === key ? !prev[key] : false;
      });

      return newState;
    });
  };

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(() => {
      fetchAppointments();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const recoverAppointments = async (phone: string) => {
    try {
      await fetchAppointmentsByPhone(phone);
      setPhone("");
      toast.success("Citas recuperadas");
    } catch (error) {
      console.error("Error al recuperar citas:", error);
      toast.error("Error al recuperar citas");
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-4">
      <Row className="w-100">
        <Col lg={5}>
          <Expand
            title="Citas pendientes"
            isExpanded={expandedSections.pendientes}
            onToggle={() => toggleSection("pendientes")}
          >
            <p className="fw-light text-lg-start">
              Se muestran las citas pendientes de pago, haz el pago del 50% y da
              click en el botón para enviar tu comprobante de pago.
            </p>
            {pendingAppontments.length === 0 ? (
              <div className="alert alert-info mt-3" role="alert">
                No hay citas pendientes
              </div>
            ) : (
              pendingAppontments.map((appointment, index) => (
                <CardAppointment
                  key={index}
                  appointment={appointment}
                  index={index}
                  showPaymentInfo={showPaymentInfo}
                />
              ))
            )}
          </Expand>
        </Col>
        <Col lg={{ span: 5, offset: 1 }}>
          <Expand
            title="Citas confirmadas"
            isExpanded={expandedSections.confirmadas}
            onToggle={() => toggleSection("confirmadas")}
          >
            {confirmedAppointments.length === 0 ? (
              <div className="alert alert-info mt-3" role="alert">
                No hay citas confirmadas
              </div>
            ) : (
              confirmedAppointments.map((appointment, index) => (
                <CardAppointment
                  key={index}
                  appointment={appointment}
                  index={index}
                  showPaymentInfo={showPaymentInfo}
                />
              ))
            )}
          </Expand>
        </Col>
      </Row>

      <Row className="w-100">
        <Col lg={5} sm={12}>
          <Expand
            title="Citas canceladas"
            isExpanded={expandedSections.canceladas}
            onToggle={() => toggleSection("canceladas")}
          >
            {cancelledAppointments.length === 0 ? (
              <div className="alert alert-info mt-3" role="alert">
                No hay citas canceladas
              </div>
            ) : (
              cancelledAppointments.map((appointment, index) => (
                <CardAppointment
                  key={index}
                  appointment={appointment}
                  index={index}
                  showPaymentInfo={showPaymentInfo}
                />
              ))
            )}
          </Expand>
        </Col>
        <Col lg={{ span: 5, offset: 1 }} sm={12}>
          <Expand
            title="Citas expiradas"
            isExpanded={expandedSections.expiradas}
            onToggle={() => toggleSection("expiradas")}
          >
            {expiredAppointments.length === 0 ? (
              <div className="alert alert-info mt-3" role="alert">
                No hay citas canceladas
              </div>
            ) : (
              expiredAppointments.map((appointment, index) => (
                <CardAppointment
                  key={index}
                  appointment={appointment}
                  index={index}
                  showPaymentInfo={showPaymentInfo}
                />
              ))
            )}
          </Expand>
        </Col>
      </Row>
      <Row className="w-100">
        <Col lg={5} sm={12}>
          <Expand
            title="Recuperar citas"
            isExpanded={expandedSections.recuperar}
            onToggle={() => toggleSection("recuperar")}
          >
            <p className="fw-light text-lg-start">
              Ingresa tu número telefónico para recuperar tus citas.
            </p>
            <div className="d-flex justify-content-center">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Numero de celular"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                size="small"
              />
              <Button
                size="sm"
                className="ms-2"
                variant="warning"
                onClick={() => recoverAppointments(phone)}
              >
                Recuperar
              </Button>
            </div>
          </Expand>
        </Col>
      </Row>
    </Container>
  );
};
