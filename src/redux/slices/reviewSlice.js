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
  freelancerList: { result: [], totalRecords: 0, totalFilterRecords: 0 },
  reviewsList: { result: [], totalRecords: 0, totalFilterRecords: 0 },
  allReviewsList: { result: [], totalRecords: 0, totalFilterRecords: 0 },
  freelancerDetails: null,
  avgReview: 0,
  freelancerAvgReview: 0,
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

  if (action.type.startsWith("review/getFreelancerDetails")) {
    state.freelancerDetails = action.payload?.data;
  }

  if (action.type.startsWith("review/listReviewByFreelancer")) {
    state.reviewsList = action.payload?.data;
  }

  if (action.type.startsWith("review/listReviews")) {
    state.allReviewsList = action.payload?.data;
  }

  if (action.type.startsWith("review/getReviewsAvg")) {
    state.avgReview = action.payload;
  }

  if (action.type.startsWith("review/freelancerAvgReview")) {
    state.freelancerAvgReview = action.payload?.data;
  }

  if (action.type.startsWith("review/addFreelancer")) {
    state.freelancerList.result.unshift(action.payload.data);
    state.freelancerList.totalRecords += 1;
    if (state.freelancerList.result.length > 10) {
      state.freelancerList.result.pop();
    }
  }

  if (action.type.startsWith("review/addReview")) {
    state.reviewsList.result.unshift(action.payload.data);
    state.reviewsList.totalRecords += 1;
    if (state.reviewsList.result.length > 10) {
      state.reviewsList.result.pop();
    }
  }
};

export const addFreelancer = createAsyncThunk(
  "review/addFreelancer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ReviewApi.addFreelancer(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addReview = createAsyncThunk(
  "review/addReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ReviewApi.addReview(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getFreelancerDetails = createAsyncThunk(
  "review/getFreelancerDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ReviewApi.getFreelancerDetails(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const freelancerWiseAvgReview = createAsyncThunk(
  "review/freelancerAvgReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ReviewApi.getFreelancerWiseAvgReview(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getReviewsAvg = createAsyncThunk(
  "review/getReviewsAvg",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ReviewApi.getReviewsAvg(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const listFreelancer = createAsyncThunk(
  "review/listFreelancer",
  async (
    { skip = 0, limit = 10, ordering = "-created_at" },
    { rejectWithValue }
  ) => {
    try {
      const response = await ReviewApi.listFreelancer({
        skip,
        limit,
        ordering,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const listReviewByFreelancer = createAsyncThunk(
  "review/listReviewByFreelancer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ReviewApi.listReviewByFreelancer(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const listReviews = createAsyncThunk(
  "review/listReviews",
  async (
    { skip = 0, limit = 10, ordering = "-created_at" },
    { rejectWithValue }
  ) => {
    try {
      const response = await ReviewApi.listReviews({ skip, limit, ordering });
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
