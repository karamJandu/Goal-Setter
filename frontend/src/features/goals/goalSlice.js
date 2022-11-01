import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Get Goals
export const getGoals = createAsyncThunk("goals/getGoals", async (thunkApi) => {
  try {
    return await goalService.getGoals();
  } catch (error) {
    return errorMessage(error, thunkApi);
  }
});

// Add Goals
export const addGoals = createAsyncThunk(
  "goals/addGoals",
  async (goalData, thunkApi) => {
    try {
      return await goalService.addGoals(goalData);
    } catch (error) {
      return errorMessage(error, thunkApi);
    }
  }
);

export const deleteGoals = createAsyncThunk(
  "goals/deleteGoals",
  async (goalData, thunkApi) => {
    try {
      return await goalService.deleteGoals(goalData);
    } catch (error) {
      return errorMessage(error, thunkApi);
    }
  }
);

export const updateGoals = createAsyncThunk(
  "goals/updateGoals",
  async (goalData, thunkApi) => {
    try {
      return await goalService.updateGoals(goalData);
    } catch (error) {
      return errorMessage(error, thunkApi);
    }
  }
);

// Error messages
const errorMessage = (error, thunkAPI) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return thunkAPI.rejectWithValue(message);
};

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.goals = [];
        state.message = action.payload;
      })
      .addCase(addGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.goals = [];
        state.message = action.payload;
      })
      .addCase(addGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(deleteGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.goals = action.payload;
      })
      .addCase(deleteGoals.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.goals = [];
        state.message = action.payload;
      })
      .addCase(updateGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.goals = action.payload;
      })
      .addCase(updateGoals.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.goals = [];
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
