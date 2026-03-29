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

  if (loading) {
    return <p>Loading {gameName}...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>No data available yet...</p>;
  }

  const results = data?.DrawResults || data;
  const latest = results?.[0];

  return (
    <div className="lottery-container">

      <h2 className="lottery-title">{gameName}</h2>

      <div className="lottery">
        <p className="lottery-date-latest">
          <strong>Date: </strong>
          {latest?.DrawDate || "N/A"}
        </p>

        <p className="lottery-number-latest">
          <strong>Numbers: </strong>{" "}
          {Array.isArray(latest?.WinningNumbers)
            ? latest.WinningNumbers.join(", ")
            : latest?.WinningNumbers || "N/A"}
        </p>
      </div>

      <PastResults data={data} title={gameName} />
    </div>
  );
}