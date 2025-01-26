import { api } from "../interceptor";


export const countStudentByGender = async () => {
    const response = await api.get("/analytics/studentsByGender/")
    return response.data
}

export const totalStudents = async () => {
    const response = await api.get("/analytics/totalStudents")
    return response.data
}


export const totalPopulationAnalytics = async()=>{
    const response = await api.get("/analytics/population")
    return response.data
}