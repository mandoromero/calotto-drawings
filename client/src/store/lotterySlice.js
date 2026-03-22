import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLotteryData } from "../services/api";

// Async thunk to fetch a specific lottery game
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

const initialState = {
  games: {},     // { "Super Lotto Plus": { data, loading, error } }
};

const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLotteryGame.pending, (state, action) => {
        const game = action.meta.arg;
        state.games[game] = { data: null, loading: true, error: null };
      })
      .addCase(fetchLotteryGame.fulfilled, (state, action) => {
        const { gameName, data } = action.payload;
        state.games[gameName] = { data, loading: false, error: null };
      })
      .addCase(fetchLotteryGame.rejected, (state, action) => {
        const { gameName, error } = action.payload;
        state.games[gameName] = { data: null, loading: false, error };
      });
  },
});

export default lotterySlice.reducer;