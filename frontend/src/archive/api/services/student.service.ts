import { api } from "../interceptor";


export const countStudentByGender = async () => {
    const response = await api.get("/analytics/studentsByGender/")
    return response.data
}