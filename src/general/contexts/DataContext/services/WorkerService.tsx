import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const endPoint = "WorkerSchedule/bybranch/"

const getWorkersByBranch = async <T = any>(branchId: number) => {
  return await axios.get<T>(`${API}${endPoint}${branchId}`);
};


export const workerService = {
  getWorkersByBranch,
};

export default workerService;