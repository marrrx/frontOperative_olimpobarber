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

export const appointmentService = {
  createAppointment,
  getVariousAppointments
};

export default appointmentService;
