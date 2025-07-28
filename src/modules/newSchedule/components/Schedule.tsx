import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState, useContext, useEffect } from "react";
import {
  Col,
  ToggleButton,
  Row,
  Button,
  Container,
  FormControl,
} from "react-bootstrap";
import "../styles/ScheduleStyles.css";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";
import { to12hCompact } from "../../../general/utils/Dates";
import { FormHelperText } from "@mui/material";
import { AnimatePresence, motion, Variants } from "framer-motion";
dayjs.extend(isSameOrBefore);

interface ScheduleProps {
  goToPersonalData: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ goToPersonalData }) => {
  const [radioValue, setRadioValue] = useState<{
    fecha: string;
    hora: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const isMobile = useIsMobile();

  const { fetchAvailableTimes, availableTimes, selectedWorker } =
    useContext(DataContext);
  const { citaData, updateCitaData } = useContext(CitasFormContext);

  const diasParaMostrar = Array.from({ length: isMobile ? 3 : 5 }, (_, i) =>
    selectedDate.add(i, "day")
  );

  //Suavizar la aparicion de los tiempos disponibles al retroceder o avanzar
  const [direction, setDirection] = useState<"left" | "right">("left");
  const variants: Variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "left" ? 100 : -100,
      opacity: 0,
      position: "absolute",
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
      width: "100%",
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? -100 : 100,
      opacity: 0,
      position: "absolute",
      width: "100%",
    }),
  };

  // Funciones para avanzar y retroceder fechas
  // Avanza 5 días y retrocede 5 días
  const cantidad = isMobile ? 3 : 5;

  const handleAvanzar = () => {
    setSelectedDate(selectedDate.add(cantidad, "day"));
    setDirection("left");
  };

  const handleRetroceder = () => {
    const nuevaFecha = selectedDate.subtract(cantidad, "day");
    const hoy = dayjs().startOf("day");
    setDirection("right");
    if (nuevaFecha.isBefore(hoy)) {
      setSelectedDate(hoy);
    } else {
      setSelectedDate(nuevaFecha);
    }
  };

  //Horarios disponibles
  useEffect(() => {
    const hoy = dayjs().startOf("day");
    const isToday = selectedDate.isSame(hoy, "day");

    const cantidad = isMobile ? 3 : 5; // Total de columnas visibles
    const offset = isToday ? 1 : 0; // Si es hoy, saltar el primero

    const diasParaEnviar = Array.from({ length: cantidad - offset }, (_, i) =>
      selectedDate.add(i + offset, "day")
    );

    if (citaData.workerId) {
      fetchAvailableTimes(citaData.workerId, diasParaEnviar);
    }
  }, [selectedDate, isMobile, citaData.workerId]);

  //useEffect para cargar fecha y hora seleccionada al montar el componente
  useEffect(() => {
    if (citaData.date && citaData.time) {
      setRadioValue({
        fecha: citaData.date,
        hora: citaData.time,
      });
    }
  }, [citaData.date, citaData.time]);

  //seleccinar fecha y hora
  const handleHoraSeleccionada = (fecha: string, hora: string) => {
    updateCitaData({
      date: fecha,
      time: hora,
    });
    setRadioValue({ fecha, hora });

    goToPersonalData();
  };
  //Día de descanso del barbero
  const disableDayOff = (date: dayjs.Dayjs) => {
    return date.day() === selectedWorker.dayOff;
  };

  return (
    <>
      <Container>
        <div className=" mb-1" style={{ height: "50px" }}>
          <Row className="h-100 align-items-center">
            <Col className="d-flex align-items-center gap-2">
              <DatePicker
                views={["year", "month"]}
                value={selectedDate}
                disabled={!citaData.workerId}
                disablePast
                onChange={(newValue) => {
                  if (newValue) setSelectedDate(newValue.startOf("month"));
                }}
                format="MMMM YYYY"
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
              />
              <div
                className="d-flex gap-2"
                style={{
                  opacity: !citaData.workerId ? 0.5 : 1,
                  pointerEvents: !citaData.workerId ? "none" : "auto",
                }}
              >
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleRetroceder}
                  disabled={selectedDate.isSameOrBefore(dayjs(), "day")}
                >
                  <i className="bi bi-chevron-left"></i>
                </Button>

                <Button variant="link" size="sm" onClick={handleAvanzar}>
                  <i className="bi bi-chevron-right"></i>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{ position: "relative", height: "400px", overflow: "hidden" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={selectedDate.format("YYYY-MM-DD")}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Parte superior: días */}
              <Row className="text-center text-secondary mb-3">
                {diasParaMostrar.map((dia, idx) => (
                  <Col key={idx}>
                    <span
                      style={{
                        display: "block",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                      }}
                    >
                      {dia.format("ddd").slice(0, 3).toUpperCase()}
                    </span>
                    <span
                      style={{
                        display: "block",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                      }}
                    >
                      {dia.format("DD")}
                    </span>
                  </Col>
                ))}
              </Row>

              {/* Parte inferior: horarios */}
              <div style={{ position: "relative", height: "400px" }}>
                {!citaData.workerId && (
                  <div
                    className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center bg-opacity-100"
                    style={{ zIndex: 10 }}
                  >
                    <FormHelperText>
                      Selecciona un barbero para ver sus horarios disponibles
                    </FormHelperText>
                  </div>
                )}

                <Row className="h-100">
                  {selectedDate.isSame(dayjs(), "day") && (
                    <Col className="h-100">
                      <div className="h-100 rounded bg-light"></div>
                    </Col>
                  )}

                  {Object.entries(availableTimes).map(([fecha, horas]) => {
                    const dia = dayjs(fecha);
                    const esDiaDeDescanso = disableDayOff(dia);

                    return (
                      <Col key={fecha} className="h-100">
                        {esDiaDeDescanso ? (
                          <div className="h-100 rounded bg-light d-flex justify-content-center align-items-center text-muted">
                          </div>
                        ) : (
                          <div
                            className="d-flex flex-column"
                            style={{
                              maxHeight: "400px",
                              overflowY: "auto",
                            }}
                          >
                            {(horas as unknown as string[]).map((hora: string) => (
                              <ToggleButton
                                key={`${fecha}-${hora}`}
                                id={`radio-${fecha}-${hora}`}
                                type="radio"
                                className="mb-2 custom-toggle"
                                style={{ height: "35px" }}
                                name={`radio-${fecha}`}
                                value={hora}
                                checked={
                                  radioValue?.fecha === fecha &&
                                  radioValue?.hora === hora
                                }
                                onChange={() =>
                                  handleHoraSeleccionada(fecha, hora)
                                }
                              >
                                {to12hCompact(hora)}
                              </ToggleButton>
                            ))}
                          </div>
                        )}
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </>
  );
};

export default Schedule;
