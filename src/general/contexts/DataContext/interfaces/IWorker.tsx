import { ITimeSlot } from "./ITimeSlot";

export interface IWorker {
    id: number;
    name: string;
    dayOff:number;
    avatarImagePath: string;
    timeSlots: ITimeSlot[];
}