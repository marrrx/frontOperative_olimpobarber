import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const endPoint = "Service"



const getAllServices = async<T=any> () => {
  return await axios.get(`${API}${endPoint}`);
};

export const serviceService = {
  getAllServices,
};

export default serviceService;