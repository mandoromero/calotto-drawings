import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLotteryGame } from "../../store/lotterySlice";
import PastResults from "../../components/PastResults/PastResults";
import { normalize } from "../../utils";
import "../LotteryPage/LotteryPage.css";

export default function LotteryPage() {
  const dispatch = useDispatch();
  const { gameName } = useParams();

  // safety check (prevents crashes on refresh / bad routes)
  if (!gameName) return <p>Invalid game route</p>;

  const key = normalize(gameName);

  const gameState = useSelector((state) => state.lottery?.games?.[key]);

  const data = gameState?.data;
  const loading = gameState?.loading;
  const error = gameState?.error;

  // 🔥 Always fetch on route change
  useEffect(() => {
    dispatch(fetchLotteryGame(gameName));
  }, [dispatch, gameName]);

  // ----------------------------
  // LOADING / ERROR STATES
  // ----------------------------
  if (loading) return <p>Loading {gameName}...</p>;
  if (error) return <p>Error: {error}</p>;

  // ----------------------------
  // SAFE DATA HANDLING
  // backend returns ARRAY
  // ----------------------------
  const results = Array.isArray(data) ? data : [];

  if (!results.length) return <p>No data available...</p>;

  const latest = results[0];

  // ----------------------------
  // FORMAT DISPLAY NAME
  // ----------------------------
  const displayName = gameName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // ----------------------------
  // RENDER
  // ----------------------------
  return (
    <div className="lottery-container">
      <h2 className="lottery-title">{displayName}</h2>

      <div className="lottery">
        {/* DATE */}
        <p className="lottery-date-latest">
          <strong>Date:</strong> {latest?.drawDate || "N/A"}
        </p>

        {/* NUMBERS */}
        <div className="lottery-number-latest">
          <span className="label">
            <strong>Numbers:</strong>
          </span>

          <div className="balls-row">
            <div className="regular-balls">
              {latest?.numbers?.map((num, i) => (
                <span key={i} className="ball white-ball">
                  {num}
                </span>
              ))}
            </div>
            {/* BONUS */}
            <span className="label"><strong>Bonus: </strong></span>
            {latest?.bonus && (
              <span className="ball bonus-ball">
                {latest.bonus}
              </span>
            )}
          </div>
        </div>

        {/* JACKPOT */}
        <p className="lottery-jackpot">
          <strong>Jackpot:</strong> {latest?.jackpot || "N/A"}
        </p>
      </div>

      {/* PAST RESULTS */}
      <PastResults data={results} title={displayName} />
    </div>
  );
}