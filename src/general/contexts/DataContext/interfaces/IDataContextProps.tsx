import { Dayjs } from "dayjs";
import { IAppointment } from "./IAppointment";
import { IBranch } from "./IBranch";
import { ICreateAppointmentDTO } from "./ICreateAppointmentDTO";
import { IService } from "./IService";
import { IWorker } from "./IWorker";

export interface IDataContextProps{
    branches:IBranch[]
    services:IService[]
    workers:IWorker[]
    selectedWorker:IWorker,
    setSelectedWorker:React.Dispatch<React.SetStateAction<IWorker>>
    fetchBranches:()=>Promise<void>
    fetchServices:()=>Promise<void>
    fetchWorkersByBranch:(branchId:number)=>Promise<void>
    availableTimes:string[]
    setAvailableTimes:React.Dispatch<React.SetStateAction<string[]>>
    fetchAvailableTimes:(workerId:number,date:Dayjs)=>Promise<void>
    createAppointment:(appointmentData:ICreateAppointmentDTO)=>Promise<void>
    fetchAppointments:()=>Promise<void>,
    fetchAppointmentsByPhone:(phone:string)=>Promise<void>,
    appointments:IAppointment[]
}