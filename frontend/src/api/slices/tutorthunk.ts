// api/student/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTutor, getTutor, getAnalytics } from "../services/tutor.service";
import { Tutor } from "@/types/tutor";

export const tutorSignUp = createAsyncThunk(
    "tutor/signUp",
    async (credentials: Tutor, { rejectWithValue }) => {
        try {
            const response = await addTutor(credentials);

            return response
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.response?.data?.error || "Adding Tutor failed");
        }
    }
);
export const loadTutors = createAsyncThunk(
    "tutor/loadTutors",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getTutor();
            console.log(response)
            return response
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.response?.data?.error || "Loading tutors failed")
        }
    }
)

export const getTutorAnalytics = createAsyncThunk(
    "tutor/getAnalytics",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAnalytics();
            console.log(response)
            return response
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.response?.data?.error || "Loading tutors failed")
        }
    }
)
