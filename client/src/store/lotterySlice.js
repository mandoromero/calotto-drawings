import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLotteryData } from "../service/lottery/service";
import { normalize } from "../utils";

// ✅ Proper async thunk
export const fetchLotteryGame = createAsyncThunk(
  "lottery/fetchGame",
  async (gameName, { rejectWithValue }) => {
    try {
      const gameKey = normalize(gameName);

      const data = await fetchLotteryData(gameKey);

      return { gameKey, data };
    } catch (err) {
      return rejectWithValue({
        gameKey: normalize(gameName),
        error: err.message,
      });
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
        state.games[key] = {
          data: null,
          loading: true,
          error: null,
        };
      })

      .addCase(fetchLotteryGame.fulfilled, (state, action) => {
        const { gameKey, data } = action.payload;

        state.games[gameKey] = {
          data,
          loading: false,
          error: null,
        };
      })

      .addCase(fetchLotteryGame.rejected, (state, action) => {
        const key = action.payload?.gameKey || normalize(action.meta.arg);

        state.games[key] = {
          data: null,
          loading: false,
          error: action.payload?.error || "Failed to fetch",
        };
      });
  },
});

export default lotterySlice.reducer;