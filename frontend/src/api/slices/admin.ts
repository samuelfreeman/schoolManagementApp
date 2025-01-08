import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Admin, otp as otpfields } from '@/types/admin'
import { login, signUp, otp } from './adminthunk'


interface AdminState {
    admin: Admin | null
    loading: boolean
    error: string | null
}

interface OtpState {
    otp: otpfields | null
    loading: boolean
    error: string | null
}

const otpInitialState: OtpState = {
    otp: {},
    loading: false,
    error: null
}
const initialState: AdminState = {
    admin: {},
    loading: false,
    error: null

}

export const otpSlice = createSlice({
    name: "otp",
    initialState: otpInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(otp.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(otp.fulfilled, (state, action: PayloadAction<{ otp: otpfields }>) => {
            state.loading = false;
            state.otp = action.payload.otp
        }).addCase(otp.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.error || "Failed to verify OTP";
        })
    }
})

const adminSlice = createSlice({

    name: "admin",
    initialState,
    reducers: {
        logout: (state) => {
            state.admin = null
        },
    },
    extraReducers: (builder) => {
        // Login actions
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<{ admin: Admin }>) => {
                    state.loading = false;
                    state.admin = action.payload.admin
                    state.error = null
                    
                }
            )
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            });

        // Signup actions
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                signUp.fulfilled,
                (state, action: PayloadAction<{ admin: Admin }>) => {
                    state.loading = false;
                    state.admin = action.payload.admin;

                }
            )
            .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Signup failed";
            });


    },
})

export const { logout } = adminSlice.actions

export default adminSlice.reducer
