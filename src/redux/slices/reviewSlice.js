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
  reviewsList: null,
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

  if (action.type.startsWith("review/addFreelancer")) {
    state.freelancerList.result.push(action.payload.data);
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

export const listFreelancer = createAsyncThunk(
  "review/listFreelancer",
  async ({ skip = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await ReviewApi.listFreelancer({ skip, limit });
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
