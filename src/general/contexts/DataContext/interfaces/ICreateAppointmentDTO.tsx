export interface ICreateAppointmentDTO {
    clientName:string,
    clientLastName:string,
    date:string,
    time:string,
    total:number,
    branchId:number,
    workerId:number,
    servicesId:number[],
}