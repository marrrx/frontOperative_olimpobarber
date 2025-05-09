export interface IAppointment{
    id: string;
    clientName:string;
    clientLastName:string;
    date: string;
    time: string;
    status: number;
    workerName: string;
    branchName: string;
    total: number;
    expiresAt: string;
}