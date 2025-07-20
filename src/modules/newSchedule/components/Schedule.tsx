import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState, useContext, useEffect } from "react";
import { Col, ToggleButton, Row, Button } from "react-bootstrap";
import "../styles/ScheduleStyles.css";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { DataContext } from "../../../general/contexts/DataContext/DataContext";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { CitasFormContext } from "../../../general/contexts/CitasFormContext/CitasFormContext";

dayjs.extend(isSameOrBefore);

export default function Schedule() {
  const [radioValue, setRadioValue] = useState<any>("1");
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const isMobile = useIsMobile();

  const { fetchAvailableTimes, availableTimes } = useContext(DataContext);
  const { citaData, updateCitaData } = useContext(CitasFormContext);

  const diasParaMostrar = Array.from({ length: isMobile ? 3 : 5 }, (_, i) =>
    selectedDate.add(i, "day")
  );

  // Funciones para avanzar y retroceder fechas
  // Avanza 5 días y retrocede 5 días
  const cantidad = isMobile ? 3 : 5;

  const handleAvanzar = () => {
    setSelectedDate(selectedDate.add(cantidad, "day"));
  };

  const handleRetroceder = () => {
    const nuevaFecha = selectedDate.subtract(cantidad, "day");
    const hoy = dayjs().startOf("day");
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

    fetchAvailableTimes(citaData.workerId, diasParaEnviar);
  }, [selectedDate, isMobile, citaData.workerId]);

  //seleccinar fecha y hora
  const handleHoraSeleccionada = (fecha: string, hora: string) => {
    updateCitaData({
      date: fecha,
      time: hora,
    });
    setRadioValue((prev: any) => ({
      ...prev,
      [fecha]: hora,
    }));
  };

  return (
    <>
      <div className=" mb-1" style={{ height: "50px" }}>
        <Row className="h-100 align-items-center">
          <Col className="d-flex align-items-center gap-2">
            <DatePicker
              views={["year", "month"]}
              value={selectedDate}
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
          </Col>
        </Row>
      </div>
      <div className="border-bottom mb-2">
        <Row className="text-center text-secondary">
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
      </div>
      <div>
        <Row style={{ height: "400px" }}>
          {selectedDate.isSame(dayjs(), "day") && (
            <Col className="h-100 ">
              <div className="h-100  rounded bg-light"></div>
            </Col>
          )}

          {availableTimes &&
            typeof availableTimes === "object" &&
            !Array.isArray(availableTimes) &&
            Object.entries(availableTimes).map(([fecha, horas]) => (
              <Col key={fecha} className="h-100">
                <div
                  className="d-flex flex-column"
                  style={{
                    maxHeight: "400px", // ajusta esto según lo alto que sean los botones
                    overflowY: "auto",
                  }}
                >
                  {(horas as string[]).map((hora: string) => (
                    <ToggleButton
                      key={`${fecha}-${hora}`}
                      id={`radio-${fecha}-${hora}`}
                      type="radio"
                      className="mb-2 custom-toggle"
                      style={{ height: "35px" }}
                      name={`radio-${fecha}`}
                      value={hora}
                      checked={radioValue[fecha] === hora}
                      onChange={() => handleHoraSeleccionada(fecha, hora)}
                    >
                      {hora}
                    </ToggleButton>
                  ))}
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
}
