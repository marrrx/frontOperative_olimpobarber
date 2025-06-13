export interface ICreateAppointmentDTO {
    clientName:string,
    clientLastName:string,
    clientPhoneNumber:string,
    date:string,
    time:string,
    branchId:number,
    workerId:number,
    servicesId:number[],
}