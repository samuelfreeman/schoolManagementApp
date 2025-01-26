import { Admin, otp } from "@/archive/types/admin";
import { api } from "../interceptor";

export const signUpService = async (credentials: Admin) => {
  const response = await api.post("/admins/signup", credentials);
  localStorage.setItem("token", response.data.addAdmin.token);
  console.log(response.data.addAdmin.token);
  return response.data;
};
export const loginService = async (credentials: Admin) => {
  const response = await api.post("/admins/login", credentials);
  localStorage.setItem("adminEmail", credentials.email || "undefined");
  console.log(response);
  return response.data;
};

export const verifyOtpService = async (credentials: otp) => {
  const data = {
    email: localStorage.getItem("adminEmail"),
    otp: credentials.otp,
  };
  const response = await api.post(`/admins/verifyOtp`, data);
  localStorage.setItem("token", response.data.token);
  console.log(response);
  return response.data;
};
