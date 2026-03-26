import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLotteryData } from "../services/api";
import { normalize } from "../utils";

export const fetchLotteryGame = createAsyncThunk(
  "lottery/fetchGame",
  async (gameName, { rejectWithValue }) => {
    try {
      const data = await getLotteryData(gameName);
      return { gameName, data };
    } catch (err) {
      return rejectWithValue({ gameName, error: err.message });
    }
  }
);

const initialState = { games: {} };

const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLotteryGame.pending, (state, action) => {
        const key = normalize(action.meta.arg);
        state.games[key] = { data: null, loading: true, error: null };
      })
      .addCase(fetchLotteryGame.fulfilled, (state, action) => {
        const key = normalize(action.payload.gameName);
        state.games[key] = { data: action.payload.data, loading: false, error: null };
      })
      .addCase(fetchLotteryGame.rejected, (state, action) => {
        const key = normalize(action.payload?.gameName || action.meta.arg);
        const error = action.payload?.error || "Unknown error";
        state.games[key] = { data: null, loading: false, error };
      });
  },
});

export default lotterySlice.reducer;