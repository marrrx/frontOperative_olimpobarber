import axios from "axios";
import { ILogin } from "../interfaces/Login.model";

const API = process.env.REACT_APP_API;
const endPoint = 'authenticate/';

const auth = async (data: ILogin) => {
    return await axios.post(API + endPoint + 'login?api-version=1', data);
};

const identity = async () => {
    return await axios.get(API + endPoint + 'identity');
};

const sendPassword = async (email: string) => {
    return await axios.post(API + endPoint + 'recover/' + email +'?api-version=1');
};

export const loginService = {
    auth,
    identity,
    sendPassword
};

export default loginService;
