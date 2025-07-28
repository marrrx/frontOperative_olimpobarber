import { useContext, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./styles/ScheduleStyles.css";
import { CitasFormContext } from "../../general/contexts/CitasFormContext/CitasFormContext";
import { DataContext } from "../../general/contexts/DataContext/DataContext";
import Schedule from "./components/Schedule";
import workerService from "../../general/contexts/DataContext/services/WorkerService";
import { IWorker } from "../../general/contexts/DataContext/interfaces/IWorker";
import { SelectBarber } from "./components/SelectBarber";
import { SelectServices } from "./components/SelectServices";
import { InsertData } from "./components/InsertData";
import { StyledButton } from "../../general/components/StyledButton";
import Swal from "sweetalert2";
import { ICreateAppointmentDTO } from "../../general/contexts/DataContext/interfaces/ICreateAppointmentDTO";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  phone: string;
  date: Date;
};

const PageNewSchedule = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { branches, services, setSelectedWorker, createAppointment } =
    useContext(DataContext);
  const {
    setSelectedBranch,
    citaData,
    updateCitaData,
    clearCitaData,
    setSelectedServices,
    setTotalTemp,
  } = useContext(CitasFormContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  const validarFormulario = (): string[] => {
    const errores: string[] = [];

    if (!citaData.client.name.trim()) errores.push("Nombre es requerido.");
    if (!citaData.client.apellido.trim())
      errores.push("Apellido es requerido.");
    if (!citaData.client.fecha_nacimiento)
      errores.push("Fecha de nacimiento es requerida.");
    if (!citaData.branchId) errores.push("Sucursal no seleccionada.");
    if (!citaData.workerId) errores.push("Barbero no seleccionado.");
    if (!citaData.time) errores.push("Hora de cita no seleccionada.");
    if (!citaData.services.length)
      errores.push("Debe seleccionar al menos un servicio.");

    return errores;
  };

  const onSubmit = async () => {
    const errores = validarFormulario();

    if (errores.length > 0) {
      Swal.fire({
        title: "Faltan campos por completar",
        html: errores.map((e) => `<p>${e}</p>`).join(""),
        icon: "warning",
      });
      return;
    }

    const result = await Swal.fire({
      title: "¿Crear cita?",
      text: "¿Estás seguro de que los datos son correctos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await createAppointment(createAppoinmentDTO);
        clearCitaData();
        setSelectedServices([]);
        setTotalTemp(0);
        navigate("/citas");
        Swal.fire(
          "¡Cita creada!",
          "Recuerda enviar tu comprobante de pago.",
          "success"
        );
      } catch (error) {
        Swal.fire(
          "Error",
          "No se pudo crear la cita. Intenta nuevamente.",
          "error"
        );
      }
    }
  };

  //Acordeon de sucursal con barberos
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [loadingBranchId, setLoadingBranchId] = useState<number | null>(null);
  const [readyBranches, setReadyBranches] = useState<Record<number, boolean>>(
    {}
  );
  const [workersByBranch, setWorkersByBranch] = useState<
    Record<number, IWorker[]>
  >({});

  const handleAccordionClick = async (branchId: number) => {
    const idStr = branchId.toString();
    if (activeAccordion === idStr) {
      setActiveAccordion(null);
      return;
    }
    setActiveAccordion(idStr);
    setLoading(true);
    setLoadingBranchId(branchId);
    setReadyBranches((prev) => ({ ...prev, [branchId]: false }));

    try {
      const response = await workerService.getWorkersByBranch<IWorker[]>(
        branchId
      );
      setWorkersByBranch((prev) => ({ ...prev, [branchId]: response.data }));
      setSelectedBranch(branchId);
      setReadyBranches((prev) => ({ ...prev, [branchId]: true }));
    } catch (error) {
      setReadyBranches((prev) => ({ ...prev, [branchId]: true }));
    } finally {
      setLoading(false);
    }
  };

  //Scroll hacia la sección de datos personales al seleccionar hora
  const personalData = useRef<HTMLDivElement>(null);
  const goToPersonalData = () => {
    personalData.current?.scrollIntoView({ behavior: "smooth" });
  };

  //useEffect para cargar barbero seleccionado al montar el componente
  useEffect(() => {
    if (citaData.workerId && Object.keys(workersByBranch).length > 0) {
      let matchedWorker: IWorker | undefined;
      for (const branchId in workersByBranch) {
        matchedWorker = workersByBranch[Number(branchId)].find(
          (b) => b.userId === citaData.workerId
        );
        if (matchedWorker) break;
      }
      if (matchedWorker) {
        setSelectedWorker(matchedWorker);
      }
    }
  }, [citaData.workerId, workersByBranch]);


  
  return (
    <Container fluid className="px-3 px-lg-5 py-3 py-lg-5">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 grid-parent">
        <div id="selectBranchWorker" className="mb-4 div1">
          <h2 className="fs-5 fw-semibold mb-2">Elige tu barbero</h2>
          <p className="text-muted mb-3">
            Selecciona el barbero de tu preferencia.
          </p>
          <SelectBarber
            branches={branches}
            activeAccordion={activeAccordion}
            readyBranches={readyBranches}
            workersByBranch={workersByBranch}
            handleAccordionClick={handleAccordionClick}
            loading={loading}
            loadingBranchId={loadingBranchId}
          />
        </div>

        <div id="datePicker" className="mb-4 div2">
          <h2 className="fs-5 fw-semibold mb-2">Fecha y hora</h2>
          <p className="text-muted mb-3">Selecciona el día de tu cita.</p>
          <Schedule goToPersonalData={goToPersonalData} />
        </div>

        <div id="insertPersonalData" ref={personalData} className="mb-4 div3">
          <h2 className="fs-5 fw-semibold mb-2">Tus datos</h2>
          <p className="text-muted">
            La información proporcionada será utilizada con la finalidad de
            agendar tu cita.
          </p>
          <InsertData updateCitaData={updateCitaData} citaData={citaData} />
        </div>

        <div id="selectServices" className="mb-4 div4">
          <h2 className="fs-5 fw-semibold mb-2">Servicios</h2>
          <p className="text-muted mb-3">
            Selecciona los servicios que deseas.
          </p>
          <SelectServices services={services} />
        </div>

        <div className="div5 d-flex me-2">
          <div className="d-flex div6">
            <div className="d-flex flex-column w-50 justify-content-center align-items-center">
              <strong>
                <p>Total: ${citaData.total}</p>
              </strong>
            </div>
            <div className="d-flex flex-column w-50">
              <StyledButton type="submit" className="btn  px-4 py-2">
                Crear cita
              </StyledButton>
            </div>
          </div>
        </div>
        <div className="d-flex div7">
          <small
            className="text-muted text-end "
            style={{ fontSize: "0.8rem" }}
          >
            *Es necesario pagar el 50% del precio total para poder confirmar la
            cita, al crear la cita se mostrarán los datos de la cuenta para
            realizar el pago.
          </small>
        </div>
      </form>
    </Container>
  );
};

export default PageNewSchedule;
