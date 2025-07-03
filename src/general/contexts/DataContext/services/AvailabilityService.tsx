import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

const API = process.env.REACT_APP_API_URL;
const endPoint = "WorkerSchedule/availability/"

const getHoursAvailable =async <T = any>(workerId: number,date:Dayjs) => {
/*   const fechaISO = dayjs(date)            
  .tz("America/Mexico_City")                   
  .startOf("day")                             
  .utc()                                       
  .toISOString(); */
  return await axios.get(`${API}${endPoint}${workerId}?date=${date}`);
};

export const availabilityService = {
  getHoursAvailable,
};

export default availabilityService;