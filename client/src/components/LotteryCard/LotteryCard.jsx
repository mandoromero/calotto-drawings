import "../LotteryCard/LotteryCard.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLotteryGame } from "../../store/lotterySlice";
import { normalize } from "../../utils/index";
import { Link } from "react-router-dom";

export default function LotteryCard({ gameName }) {
  const dispatch = useDispatch();

  const gameState = useSelector(
    (state) => state.lottery?.games?.[normalize(gameName)]
  );

  const data = gameState?.data;
  const loading = gameState?.loading;
  const error = gameState?.error;

  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchLotteryGame(gameName));
    }
  }, [dispatch, gameName, data, loading]);

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

  if (!data || data.length === 0) return null;

  const latest = data[0];

  return (
    <div className="lottery-card-container">

      <Link to={`/${normalize(gameName)}`} className="lotto-title-link">
        <h2 className="lotto-title">{gameName}</h2>
      </Link>

      <p className="latest-draw-date">
        <strong>Date:</strong>{" "}

        <span className="drawDate">
          {latest?.drawDate
            ? new Date(latest.drawDate).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })
            : "N/A"}
        </span>
      </p>

      <p className="latest-draw-numbers">
        <strong>Numbers:</strong>
      </p>

      <div className="balls-row">
        <div className="regular-balls">
          {latest?.numbers?.map((num, i) => (
            <span key={i} className="ball white-ball">
              <strong>{num}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className="latest-bonus">
        <div className="balls-bonus-row">

          <p className="bonus-p">
            <strong>Bonus:</strong>
          </p>

          {latest?.bonus && (
            <span className="ball bonus-ball">
              <strong>{latest.bonus}</strong>
            </span>
          )}

        </div>
      </div>

    </div>
  );
}