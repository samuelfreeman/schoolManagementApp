
import { Admin, otp } from "@/types/admin";
import { api } from "../interceptor";


export const signUpService = async (credentials: Admin) => {
    const response = await api.post('/admin/signup', credentials)
    localStorage.setItem("adminId", response.data.id)
    console.log(response.data.id)
    return response.data
}
export const loginService = async (credentials: Admin) => {
    const response = await api.post('/admin/login', credentials)
    localStorage.setItem("adminEmail",credentials.email || "undefined")
    console.log(response)
    return response.data
}

export const verifyOtpService = async (credentials: otp) => {
 
    const data = {
        email: localStorage.getItem("adminEmail"),
        otp: credentials.otp
    }
    const response = await api.post(`/admin/verifyOtp`, data)
    localStorage.setItem("token", response.data.token)
    console.log(response)
    return response.data
}