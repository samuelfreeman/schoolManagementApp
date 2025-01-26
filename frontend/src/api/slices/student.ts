import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Student } from "@/types/student";
import { loadStudentAnalytics, loadTotalStudents, totalPopulation } from "./studentThunk";


interface StudentAnalytics {
  [key: string]: number;
}

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  analytics: StudentAnalytics | null;
  count: number // For storing analytics data
  population: number
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
  analytics: null,
  count: 0,
  population: 0
};

const setLoading = (state: StudentState) => {
  state.loading = true;
  state.error = null;
};

const setError = (
  state: StudentState,
  action: PayloadAction<unknown>
) => {
  state.loading = false;

  if (typeof action.payload === "string") {
    state.error = action.payload;
  } else if (
    action.payload &&
    typeof action.payload === "object" &&
    "message" in action.payload
  ) {
    state.error = (action.payload as { message?: string }).message || "An unknown error occurred";
  } else {
    state.error = "An unknown error occurred";
  }
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    logout: (state) => {
      state.students = [];
      state.analytics = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStudentAnalytics.pending, setLoading)
      .addCase(
        loadStudentAnalytics.fulfilled,
        (state, action: PayloadAction<StudentAnalytics>) => {
          state.loading = false;
          state.analytics = action.payload; // Store analytics object
          state.error = null;
        }
      )
      .addCase(loadStudentAnalytics.rejected, setError)
      // ladTotalStudents
      .addCase(loadTotalStudents.pending, setLoading)
      .addCase(
        loadTotalStudents.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.error = null;
          state.count = action.payload;
        }
      )
      .addCase(loadTotalStudents.rejected, setError)
      .addCase(totalPopulation.pending, setLoading)
      .addCase(
        totalPopulation.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.error = null;
          state.population = action.payload;
        }
      )
      .addCase(totalPopulation.rejected, setError)

  },
});

export default studentSlice.reducer;
