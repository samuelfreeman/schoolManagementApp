
import { Tutor } from "@/types/tutor";
import { api } from "../interceptor";

export const addTutor = async(credentials:Tutor)=>{
    const response = await api.post('/tutors/admin/signup', credentials)
    
    console.log(response)
    return response.data
}


export const getTutor = async()=>{
    const response = await api.get('/tutors' )
    console.log(response.data)
    return response.data
}

export const getAnalytics = async()=>{
    const response = await api.get("/analytics/totalTutors")
    console.log(response)
    return response.data
}
export const deleteTutor = async(id:string)=>{
    const response = await api.delete(`/tutors/delete/${id}`)
    console.log(response)
}


// export const signUpService = async (credentials: Tutor) => {
//     const response = await api.post('/admin/signup', credentials)
//     localStorage.setItem("token", response.data.addAdmin.token)
//     console.log(response.data.addAdmin.token)
//     return response.data
// }
// export const loginService = async (credentials: Tutor) => {
//     const response = await api.post('/admin/login', credentials)
//     localStorage.setItem("adminEmail",credentials.email || "undefined")
//     console.log(response)
//     return response.data
// }

// export const verifyOtpService = async (credentials: Tutor) => {
 
//     const data = {
//         email: localStorage.getItem("adminEmail"),
        
//     }
//     const response = await api.post(`/admin/verifyOtp`, data)
//     localStorage.setItem("token", response.data.token)
//     console.log(response)
//     return response.data
// }