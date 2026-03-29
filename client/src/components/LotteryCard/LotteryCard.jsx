import "../LotteryCard/LotteryCard.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLotteryGame } from "../../store/lotterySlice";
import { normalize } from "../../utils/index";
import { Link } from "react-router-dom";

export default function LotteryCard({ gameName }) {
  const dispatch = useDispatch();

  const gameState = useSelector((state) => state.lottery.games[normalize(gameName)]);

  const data = gameState?.data;
  const loading = gameState?.loading;
  const error = gameState?.error;

  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchLotteryGame(gameName));
    }
  }, [dispatch, gameName]);

  if (loading) {
    return (
      <div className="lottery-card-container">
        <h2 className="lotto-title">{gameName}</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lottery-card-container">
        <h2 className="lotto-title">{gameName}</h2>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }
  if (!data) return null;

  const latest = data?.DrawResults?.[0];

  return (
    <div className="lottery-card-container">
      <Link to={`$/{normalize(gameName)}`} className="lotto-title-link">
        <h2 className="lotto-title">{gameName}</h2>
      </Link>
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