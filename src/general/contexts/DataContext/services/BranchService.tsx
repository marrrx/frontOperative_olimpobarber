import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const endPoint = "Branch"

const getAllBranches = async<T=any> () => {
  return await axios.get(`${API}${endPoint}`);
};

export const branchService = {
  getAllBranches,
};

export default branchService;