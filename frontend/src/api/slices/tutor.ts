import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Tutor } from '@/types/tutor';
import { tutorSignUp, loadTutors, getTutorAnalytics, removeTutor } from './tutorthunk';

interface TutorState {
  tutors: Tutor[]; // Removed `null` option for simplicity
  loading: boolean;
  error: string | null;
  analytics: number | null; // New property for storing analytics data

}

const initialState: TutorState = {
  tutors: [], // Ensure tutors is an empty array by default
  loading: false,
  error: null,
  analytics: null, // Initialize as null

};

// Helper functions to update state
const setLoading = (state: TutorState) => {
  state.loading = true;
  state.error = null;
};

const setError = (state: TutorState, action: PayloadAction<unknown>) => {
  state.loading = false;

  // Dynamically handle different error payloads
  if (typeof action.payload === 'string') {
    state.error = action.payload;
  } else if (action.payload instanceof Object && 'message' in action.payload) {
    state.error = (action.payload as any).message || 'An unknown error occurred';
  } else {
    state.error = 'An unknown error occurred';
  }
};

const tutorSlice = createSlice({
  name: 'tutor',
  initialState,
  reducers: {
    logout: (state) => {
      state.tutors = [];
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Tutor Sign-Up
      .addCase(tutorSignUp.pending, setLoading)
      .addCase(
        tutorSignUp.fulfilled,
        (state, action: PayloadAction<{ tutor: Tutor }>) => {
          state.loading = false;
          state.tutors = [...state.tutors, action.payload.tutor]; // Append new tutor
          state.error = null;
        }
      )
      .addCase(tutorSignUp.rejected, setError)

      // Load Tutors
      .addCase(loadTutors.pending, setLoading)
      .addCase(
        loadTutors.fulfilled,
        (state, action: PayloadAction<Tutor[]>) => {
          state.loading = false;
          state.tutors = action.payload; // Directly set tutors as the payload
          state.error = null;
        }
      )
      .addCase(loadTutors.rejected, setError)


      // analytics returns a number how can i acsess it to use it in my dashboard
      .addCase(getTutorAnalytics.pending, setLoading)
      .addCase(
        getTutorAnalytics.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.analytics = action.payload; // Store the analytics value here
          state.error = null;
        }
      )

      .addCase(getTutorAnalytics.rejected, setError)
      //  delete tutor
      .addCase(removeTutor.pending, setLoading)
      .addCase(
        removeTutor.fulfilled,
        (state, action: PayloadAction<{ tutor: Tutor }>) => {
          state.loading = false;
          state.tutors = state.tutors.filter((tutor: Tutor) => tutor.id !== action.payload.tutor.id);
          state.error = null;
        })
      .addCase(removeTutor.rejected, setError)
  },
});


export default tutorSlice.reducer;
