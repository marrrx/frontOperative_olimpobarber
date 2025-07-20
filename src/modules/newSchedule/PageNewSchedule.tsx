import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./styles/ScheduleStyles.css";
import { CitasFormContext } from "../../general/contexts/CitasFormContext/CitasFormContext";
import { DataContext } from "../../general/contexts/DataContext/DataContext";

import Schedule from "./components/Schedule";
import { useIsMobile } from "../../hooks/useIsMobile";
import workerService from "../../general/contexts/DataContext/services/WorkerService";
import { IWorker } from "../../general/contexts/DataContext/interfaces/IWorker";
import { SelectBarber } from "./components/SelectBarber";

type FormData = {
  name: string;
  phone: string;
  date: Date;
};

const PageNewSchedule = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);
  const { branches } = useContext(DataContext);
  const { setSelectedBranch, selectedBranch } = useContext(CitasFormContext);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  const onSubmit = (data: FormData) => {
    console.log("Cita agendada:", data);
    setSubmitted(true);
  };

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

  return (
    <Container className="px-3 px-lg-5 py-3 py-lg-5">
      <h3 className="">Agenda tu cita</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div id="selectBranchWorker" className="mb-4">
          <p>Selecciona el barbero de tu preferencia.</p>
          <SelectBarber
            branches={branches}
            activeAccordion={activeAccordion}
            readyBranches={readyBranches}
            workersByBranch={workersByBranch}
            handleAccordionClick={handleAccordionClick}
            isMobile={isMobile}
            loading={loading}
            loadingBranchId={loadingBranchId}
          />
          <div className="d-flex flex-column flex-lg-row"></div>
        </div>
        <div id="datePicker">
          <p>Selecciona el día de tu cita</p>

          <Schedule></Schedule>
        </div>
      </form>
    </Container>
  );
};

export default PageNewSchedule;
