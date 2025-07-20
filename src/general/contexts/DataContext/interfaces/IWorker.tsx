import { ITimeSlot } from "./ITimeSlot";

export interface IWorker {
    userId: number;
    name: string;
    dayOff:number;
    imageBase64: string;
    timeSlots: ITimeSlot[];
}