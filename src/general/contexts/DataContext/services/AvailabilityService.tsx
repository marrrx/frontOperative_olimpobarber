import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const endPoint = "WorkerSchedule/availability/"

const getHoursAvailable =async <T = any>(workerId: number,date:string) => {
  return await axios.get(`${API}${endPoint}${workerId}?date=${date}`);
};

export const availabilityService = {
  getHoursAvailable,
};

export default availabilityService;