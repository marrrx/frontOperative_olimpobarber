import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const endPoint = "Appointment/";

const getVariousAppointments = async () => {
  const ids = JSON.parse(localStorage.getItem("appointments") || "[]");
  const query = ids.map((id: number)=> `ids=${id}`).join("&");
  return await axios.get(`${API}${endPoint}manyids?${query}`);
};

const createAppointment = async <T = any,>(appointmentData: T) => {
  return await axios.post(`${API}${endPoint}`, appointmentData);
};

const getAppointmentsByPhoneNumber = async <T = any,>(phone: string) => {
  return await axios.get(`${API}${endPoint}byPhone/${phone}`);
};

export const appointmentService = {
  createAppointment,
  getVariousAppointments,
  getAppointmentsByPhoneNumber
};

export default appointmentService;
