import "../LotteryCard/LotteryCard.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLotteryGame } from "../../store/lotterySlice";

export default function LotteryCard({ gameName }) {
  const dispatch = useDispatch();

  // Get this specific game's state from Redux
  const gameState = useSelector((state) => state.lottery.games[gameName]);

  const data = gameState?.data;
  const loading = gameState?.loading;
  const error = gameState?.error;

  // Fetch only if we don't already have data
  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchLotteryGame(gameName));
    }
  }, [dispatch, gameName]);

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="lottery-card-container">
        <h2 className="lotto-title">{gameName}</h2>
        <p>Loading...</p>
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="lottery-card-container">
        <h2 className="lotto-title">{gameName}</h2>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  // ⛔ No data yet
  if (!data) return null;

  // 🎯 Get latest draw
  const latest = data?.DrawResults?.[0];

  return (
    <div className="lottery-card-container">
      <h2 className="lotto-title">{gameName}</h2>

      <p className="latest-draw-date">
        <strong>Date:</strong>{" "}
        {latest?.DrawDate || "N/A"}
      </p>

      <p className="latest-draw-numbers">
        <strong>Numbers:</strong>{" "}
        {Array.isArray(latest?.WinningNumbers)
          ? latest.WinningNumbers.join(", ")
          : latest?.WinningNumbers || "N/A"}
      </p>
    </div>
  );
}