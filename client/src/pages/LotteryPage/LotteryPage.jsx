import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchLotteryGame } from "../../store/lotterySlice";
import { normalize } from "../../utils";

import PastResults from "../../components/PastResults/PastResults";
import Calculations from "../../components/Calculations/Calculations";

import "../LotteryPage/LotteryPage.css";

export default function LotteryPage() {
  const dispatch = useDispatch();
  const { gameName } = useParams();

  if (!gameName) return <p>Invalid game route</p>;

  const key = normalize(gameName);

  const gameState = useSelector(
    (state) => state.lottery?.games?.[key]
  );

  const data = gameState?.data;
  const loading = gameState?.loading;
  const error = gameState?.error;

  useEffect(() => {
    if (gameName) {
      dispatch(fetchLotteryGame(gameName));
    }
  }, [dispatch, gameName]);

  if (loading) return <p>Loading {gameName}...</p>;
  if (error) return <p>Error: {error}</p>;

  const results = Array.isArray(data) ? data : [];

  if (!results.length) return <p>No data available...</p>;

  const latest = results[0];

  const displayName = gameName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="lottery-container">
      <h2 className="lottery-title">{displayName}</h2>

      <div className="lottery">
        <p>
          <strong>Date:</strong> {latest.drawDate}
        </p>

        <div className="balls-row">
          <div className="regular-balls">
            {latest.numbers?.map((num, i) => (
              <span key={i} className="ball white-ball">
                {num}
              </span>
            ))}
          </div>

          <span className="label"><strong>Bonus:</strong></span>

          {latest.bonus && (
            <span className="ball bonus-ball">
              {latest.bonus}
            </span>
          )}
        </div>

        <p>
          <strong>Jackpot:</strong> {latest.jackpot}
        </p>
      </div>

      {/* 🔥 SINGLE SOURCE OF TRUTH */}
      <Calculations data={results} />

      <PastResults data={results} title={displayName} />
    </div>
  );
}