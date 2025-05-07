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
    fetchAvailableTimes:(workerId:number,date:string)=>Promise<void>
    createAppointment:(appointmentData:ICreateAppointmentDTO)=>Promise<void>
}