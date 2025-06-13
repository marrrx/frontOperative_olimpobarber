import React, { useState } from "react";
import { formatDate } from "../../../general/utils/Dates";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CountdownTimer } from "../PageAppointments";

interface props {
  appointment: any;
  index: number;
  showPaymentInfo: () => void;
}

const status = [
  {
    id: 0,
    text: "Pendiente",
  },
  {
    id: 1,
    text: "Confirmada",
    className: "text-bg-success",
  },
  {
    id: 2,
    text: "Cancelada",
    className: "text-bg-danger",
  },
    {
    id: 3,
    text: "Expirada",
    className: "text-bg-warning",
  },
];

export const CardAppointment: React.FC<props> = ({
  appointment,
  index,
  showPaymentInfo,
}) => {
  const currentStatus = status.find((s) => s.id === appointment.status);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      key={index}
      className="rounded border m-2 mt-3 mb-4 shadow-sm d-flex flex-column p-2"
      onClick={() => setExpanded(!expanded)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h6 className="card-title mb-0">
            {appointment.clientName} {appointment.clientLastName}
          </h6>
          {currentStatus && (
            <span className={`badge ${currentStatus.className}`}>
              {currentStatus.text}
            </span>
          )}
        </div>

        <div className="card-text mt-2 fw-light lh-1">
          <b className="fw-bold">Fecha:</b> {formatDate(appointment.date)}
          <br />
          <b className="fw-bold">Hora:</b> {appointment.time}
          <br />
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                style={{ overflow: "hidden" }}
              >
                <b className="fw-bold">Sucursal:</b> {appointment.branchName}
                <br />
                <b className="fw-bold">Barbero:</b> {appointment.workerName}
                <br />
                <b className="fw-bold">Monto total:</b> ${appointment.total}
                {appointment.status === 0 && (
                  <>
                    <div className=" d-flex flex-wrap p-2 mx-2 justify-content-between">
                      <div>
                        <b>50% a pagar: </b>
                        <small className="text-success">
                          <strong>${appointment.total / 2}</strong>
                        </small>
                      </div>
                      <div className="mb-0">
                        <Button
                          className="btn-success"
                          href="https://api.whatsapp.com/send/?phone=4498059894&text"
                        >
                          <i className="bi bi-whatsapp"></i>{" "}
                        </Button>
                      </div>
                    </div>
                    <Link onClick={() => showPaymentInfo()} to={""}>
                      Ver información de pago
                    </Link>
                    <br />
                    <CountdownTimer expiresAt={appointment.expiresAt} />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
