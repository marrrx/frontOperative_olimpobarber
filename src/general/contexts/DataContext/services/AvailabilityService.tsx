import axios from "axios";
import { Dayjs } from "dayjs";

const API = process.env.REACT_APP_API_URL;
const endPoint = "WorkerSchedule/availability/"

const getHoursAvailable =async <T = any>(workerId: number,date:Dayjs) => {
  return await axios.get(`${API}${endPoint}${workerId}?date=${date}`);
};

export const availabilityService = {
  getHoursAvailable,
};

export default availabilityService;