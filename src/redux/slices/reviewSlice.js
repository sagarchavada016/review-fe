import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
  createAction,
} from "@reduxjs/toolkit";
import { ReviewApi } from "../../services/apis/ReviewApis";

export const initialState = {
  loading: false,
  freelancerList: null,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || action.error.message;
};

const handleFulfilled = (state, action) => {
  state.loading = false;

  if (action.type.startsWith("review/listFreelancer")) {
    state.freelancerList = action.payload?.data;
  }
};

export const listFreelancer = createAsyncThunk(
  "review/listFreelancer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ReviewApi.listFreelancer(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const listReviews = createAsyncThunk(
  "review/listFreelancer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ReviewApi.listReviews(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    resetApp: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, handlePending)
      .addMatcher(isRejected, handleRejected)
      .addMatcher(isFulfilled, handleFulfilled);
  },
});

export const resetApp = createAction("resetApp");
export const { clearError } = reviewSlice.actions;
export default reviewSlice.reducer;
