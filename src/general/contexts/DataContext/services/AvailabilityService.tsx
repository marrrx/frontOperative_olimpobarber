import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

const API = process.env.REACT_APP_API_URL;
const endPoint = "WorkerSchedule/availability/"

const getHoursAvailable = async <T = any>(workerId: number, dates: Dayjs[]) => {
  const params = new URLSearchParams();
  dates.forEach((d) => params.append("dateParams", d.format("YYYY-MM-DD")));

  const url = `${API}${endPoint}${workerId}?${params.toString()}`;
  return await axios.get<T>(url);
};

export const availabilityService = {
  getHoursAvailable,
};

export default availabilityService;