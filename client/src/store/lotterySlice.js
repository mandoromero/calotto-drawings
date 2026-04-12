import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLotteryData } from "../service/lottery/service";
import { normalize } from "../utils";

// ✅ THUNK
export const fetchLotteryGame = createAsyncThunk(
  "lottery/fetchGame",
  async (gameName, { rejectWithValue }) => {
    try {
      const data = await fetchLotteryData(normalize(gameName));

      console.log("API DATA:", data);

      return {
        gameName,
        data,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  games: {},
};

const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🟡 LOADING
      .addCase(fetchLotteryGame.pending, (state, action) => {
        const key = normalize(action.meta.arg);

        state.games[key] = {
          data: null,
          loading: true,
          error: null,
        };
      })

      // 🟢 SUCCESS
      .addCase(fetchLotteryGame.fulfilled, (state, action) => {
        const key = normalize(action.payload.gameName);

        state.games[key] = {
          data: action.payload.data,
          loading: false,
          error: null,
        };
      })

      // 🔴 ERROR
      .addCase(fetchLotteryGame.rejected, (state, action) => {
        const key = normalize(action.meta.arg);

        state.games[key] = {
          data: null,
          loading: false,
          error: action.payload || "Failed to fetch",
        };
      });
  },
});

export default lotterySlice.reducer;