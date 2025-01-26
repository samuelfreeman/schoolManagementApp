import { api } from "@/api/api";

export const fetchAllTutors = async () => {
  const response = await api.get("/tutors");
  return response.data;
};

export const registerTutor = async (data: CreateTutor) => {
  const response = await api.post("/tutors/admin/signup", data);
  return response.data;
};

export const updateTutor = async (id: string, data: UpdateTutor) => {
  const response = await api.patch(`/tutors/${id}`, data);
  return response.data;
};

export const fetchTutor = async (id: string) => {
  const response = await api.get(`/tutors/${id}`);
  return response.data;
};

export const deleteTutor = async (id: string) => {
  const response = await api.delete(`/tutors/${id}`);
  return response.data;
};
