import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLotteryGame } from "../../store/lotterySlice";
import PastResults from "../../components/PastResults/PastResults";
import { normalize } from "../../utils";
import "../LotteryPage/LotteryPage.css";

export default function LotteryPage({ gameName }) {
  const dispatch = useDispatch();
  const key = normalize(gameName);

  const gameState = useSelector(
    (state) => state.lottery?.games?.[key]
  );

  const data = gameState?.data;
  const loading = gameState?.loading;
  const error = gameState?.error;

  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchLotteryGame(gameName));
    }
  }, [dispatch, data, loading, gameName]);

  if (loading) return <p>Loading {gameName}...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.length) return <p>No data available...</p>;

  const latest = data[0];

  return (
    <div className="lottery-container">
      <h2 className="lottery-title">{gameName}</h2>

      <div className="lottery">
        <p className="lottery-date-latest">
          <strong>Date: </strong>
          {latest?.drawDate || "N/A"}
        </p>

        <p className="lottery-number-latest">
          <strong>Numbers: </strong>
          {latest?.numbers?.join(", ") || "N/A"}
        </p>

        <p className="lottery-bonus">
          <strong>Bonus: </strong>
          {latest?.bonus || "N/A"}
        </p>

        <p className="lottery-jackpot">
          <strong>Jackpot: </strong>
          {latest?.jackpot || "N/A"}
        </p>
      </div>

      <PastResults data={data} title={gameName} />
    </div>
  );
}