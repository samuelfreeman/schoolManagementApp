import { api } from "@/api/api";

export const adminLogin = async (data: LoginAdmin) => {
  const response = await api.post("/admins/login", data);
  return response.data;
};

export const verifyAdminLogin = async (data: {
  email: string;
  otp: string;
}) => {
  const response = await api.post("/admins/verifyOtp", data);
  return response.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await api.post("/admins/forgotPassword", data);
  return response.data;
};

export const resetPassword = async (data: ResetPassword) => {
  const response = await api.post(`/admins/resetPassword/${data.token}`, data);
  return response.data;
};
