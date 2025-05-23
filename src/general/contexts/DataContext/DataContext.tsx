import { createContext, useEffect, useState } from "react";
import { IDataContextProps } from "./interfaces/IDataContextProps";
import { IBranch } from "./interfaces/IBranch";
import { IService } from "./interfaces/IService";
import { IWorker } from "./interfaces/IWorker";
import branchService from "./services/BranchService";
import workerService from "./services/WorkerService";
import serviceService from "./services/ServiceService";
import availabilityService from "./services/AvailabilityService";
import appointmentService from "./services/AppointmentService";
import { ICreateAppointmentDTO } from "./interfaces/ICreateAppointmentDTO";
import { IAppointment } from "./interfaces/IAppointment";
import { Dayjs } from "dayjs";

export const DataContext = createContext<IDataContextProps>({
  branches: [],
  services: [],
  workers: [],
  appointments: [],
  selectedWorker: {
    id: 0,
    name: "",
    dayOff: 0,
    imageBase64: "",
    timeSlots: [],
  },
  setSelectedWorker: () => {},
  fetchBranches: async () => {},
  fetchServices: async () => {},
  fetchWorkersByBranch: async () => {},
  availableTimes: [],
  setAvailableTimes: () => {},
  fetchAvailableTimes: async () => {},
  createAppointment: async () => {},
  fetchAppointments: async () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<IWorker>({} as IWorker);
  const [appointments, setAppointments]= useState<IAppointment[]>([]);



  const [createdAppointmentId, setCreatedAppointmentId] = useState<number>(0);
  

  const fetchBranches = async () => {
    try {
      const response = await branchService.getAllBranches<IBranch[]>();
      setBranches(response.data);
    } catch (error) {
      setBranches([]);
      console.error("Error al obtener branches:", error);
    }
  };
  const fetchServices = async () => {
    try {
      const response = await serviceService.getAllServices<IService[]>();
      setServices(response.data);
    } catch (error) {
      setServices([]);
      console.error("Error al obtener services:", error);
    }
  };
  const fetchWorkersByBranch = async (branchId: number) => {
    try {
      const response = await workerService.getWorkersByBranch<IWorker[]>(
        branchId
      );
      console.log(response.data);
      setWorkers(response.data);
    } catch (error) {
      setWorkers([]);
      console.error("Error al obtener workers:", error);
    }
  };
  const fetchAvailableTimes = async (workerId: number, date: Dayjs) => {
    try {
      const response = await availabilityService.getHoursAvailable<string[]>(
        workerId,
        date
      );
      setAvailableTimes(response.data);
    } catch (error) {
      console.error("Error al obtener availableTimes:", error);
      setAvailableTimes([]);
    }
  };

  const createAppointment = async (appointmentData: ICreateAppointmentDTO) => {
    try {
      const response = await appointmentService.createAppointment(
        appointmentData
      );
      console.log(response.data);
      setCreatedAppointmentId(response.data.id);
      setAvailableTimes([]);
      setSelectedWorker({
        id: 0,
        name: "",
        dayOff: 0,
        imageBase64: "",
        timeSlots: [],
      });
    } catch (error) {
      console.error("Error al crear la cita:", error);
    }
  };

  const savedAppoinmentsIds = JSON.parse(
    localStorage.getItem("appointments") || "[]"
  );
  if (!savedAppoinmentsIds.includes(createdAppointmentId)) {
    savedAppoinmentsIds.push(createdAppointmentId);
    localStorage.setItem("appointments", JSON.stringify(savedAppoinmentsIds));
  }

  const fetchAppointments = async () => {
    try {
      const response = await appointmentService.getVariousAppointments();
      console.log(response.data);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchServices();
  }, []);

  return (
    <DataContext.Provider
      value={{
        branches,
        services,
        workers,
        fetchBranches,
        fetchServices,
        fetchWorkersByBranch,
        fetchAvailableTimes,
        availableTimes,
        setAvailableTimes,
        selectedWorker,
        setSelectedWorker,
        createAppointment,
        fetchAppointments,
        appointments
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
