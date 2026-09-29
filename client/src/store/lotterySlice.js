import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchLotteryData,
  fetchFantasyFiveData,
} from "../service/lottery/service";
import { normalize } from "../utils";

// ============================================
// LOTTERY GAME THUNK
// ============================================

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

// ============================================
// FANTASY FIVE THUNK
// ============================================

export const fetchFantasyFive = createAsyncThunk(
  "lottery/fetchFantasyFive",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchFantasyFiveData();

      console.log("FANTASY FIVE API DATA:", data);

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  games: {},

  fantasyFive: {
    data: null,
    loading: false,
    error: null,
  },
};

// ============================================
// SLICE
// ============================================

const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ========================================
      // EXISTING LOTTERY GAMES
      // ========================================

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
      })

      // ========================================
      // FANTASY FIVE
      // ========================================

      // 🟡 LOADING
      .addCase(fetchFantasyFive.pending, (state) => {
        state.fantasyFive.loading = true;
        state.fantasyFive.error = null;
      })

      // 🟢 SUCCESS
      .addCase(fetchFantasyFive.fulfilled, (state, action) => {
        state.fantasyFive.data = action.payload;
        state.fantasyFive.loading = false;
        state.fantasyFive.error = null;
      })

      // 🔴 ERROR
      .addCase(fetchFantasyFive.rejected, (state, action) => {
        state.fantasyFive.data = null;
        state.fantasyFive.loading = false;
        state.fantasyFive.error =
          action.payload || "Failed to fetch Fantasy 5";
      });
  },
});

export default lotterySlice.reducer;