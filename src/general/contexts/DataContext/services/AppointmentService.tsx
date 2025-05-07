import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const endPoint = "Appointment/"

const createAppointment = async <T = any>(appointmentData: T) => {
  return await axios.post(`${API}${endPoint}`, appointmentData);
};

export const appointmentService = {
  createAppointment,
};

export default appointmentService;