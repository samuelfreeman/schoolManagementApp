import { createAsyncThunk } from "@reduxjs/toolkit";
import { countStudentByGender, totalPopulationAnalytics, totalStudents } from "../services/student.service";

export const loadStudentAnalytics = createAsyncThunk(
  "student/loadAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      // Call the service to fetch analytics data
      const response = await countStudentByGender();

      // Transform the response into a more usable format
      const analytics = response.countByGender.reduce((acc: Record<string, number>, item: any) => {
        acc[item.gender] = item._count._all;
        return acc;
      }, {});

      // Return the transformed data
      return analytics;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data?.error || "Failed to load student analytics");
    }
  }
);

export const loadTotalStudents = createAsyncThunk(
  "student/totalStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await totalStudents()
      console.log("Total Students:",response)
      return response.totalStudents
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response?.data?.error || "Failed to load student analytics")
    }
  }
)

export const totalPopulation = createAsyncThunk(
  "student/totalPopulationAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await totalPopulationAnalytics()
      
      return response
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response?.data?.message || "Failed to load total population  analytics")
    }
  }
)