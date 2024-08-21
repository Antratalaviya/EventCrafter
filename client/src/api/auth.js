import axios from "axios";
import config from "../config/config";

class AuthService {
  constructor() {
    this.client = axios.create({
      baseURL: `${config.apiUrl}/auth`,
    });
  }

  async register({ email, name, dob, orgType, password, surname }) {
    try {
      let userData = await this.client.post("/sign-up", {
        email,
        name,
        dob,
        orgType,
        password,
        surname,
      });
      if (userData.data.success) {
        await this.login({ email, password });
      }
      return userData.data.success;
    } catch (error) {
      return error;
    }
  }

  async login({ email, password }) {
    try {
      let usertokes = await this.client.post("/sign-in", { email, password });
      let token = usertokes.data.data;
      if (token) {
        localStorage.setItem("token", JSON.stringify(token));
        axios.defaults.headers.common.Authorization = `Bearer ${token?.accessToken}`;
      }

      return; 
    } catch (error) {
      return error;
    }
  }

  async getCurrentUser(){
    try {
        
    } catch (error) {
        
    }
  }
}

let authService = new AuthService();

export default authService;
