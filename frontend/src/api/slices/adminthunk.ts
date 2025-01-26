// api/student/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, signUpService ,verifyOtpService
 } from "../services/admin.service";
import { Admin ,otp as otpfields} from "../../types/admin";


export const login = createAsyncThunk(
    "auth/login",
    async (credentials: Admin, { rejectWithValue }) => {
        try {
            const data = await loginService(credentials);

           
            return data
        } catch (error: any) {

            return rejectWithValue(error.response?.data?.error || "Login failed");
        }
    }
);

export const signUp = createAsyncThunk(
    "auth/signUp",
    async (credentials: Admin, { rejectWithValue }) => {
        try {
            const response = await signUpService(credentials);
            
            
            return response
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.response?.data?.error || "Sign up failed");
        }
    }
);

export const otp = createAsyncThunk(
    "auth/otp",
    async (credentials: otpfields, { rejectWithValue }) => {
        try {
            const data = await verifyOtpService(credentials);
            
            return data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Otp verification failed");
        }
    }
)
