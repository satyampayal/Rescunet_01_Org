
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axiosInstance from "../../config/axiosIns";
const initialState = {
  notifications: [],
};
