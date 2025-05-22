import { ITimeSlot } from "./ITimeSlot";

export interface IWorker {
    id: number;
    name: string;
    dayOff:number;
    imageBase64: string;
    timeSlots: ITimeSlot[];
}