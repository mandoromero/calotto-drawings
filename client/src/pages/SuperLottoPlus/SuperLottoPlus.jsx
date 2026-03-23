import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLotteryGame } from "../../store/lotterySlice";
import PastResults from "../../components/PastResults/PastResults";
import "./SuperLottoPlus.css";

export default function SuperLottoPlus() {
    const dispatch = useDispatch();
    const gameName = "Super Lotto Plus";

    // Grab the game state from Redux
    const gameState = useSelector(
        (state) => state.lottery?.games?.[gameName]
    );

    const data = gameState?.data;
    const loading = gameState?.loading;
    const error = gameState?.error;

    // Fetch data if not already loaded
    useEffect(() => {
        if (!data && !loading) {
            dispatch(fetchLotteryGame(gameName));
        }
    }, [dispatch, data, loading, gameName]);

    // Handle loading and errors
    if (loading) return <p>Loading Super Lotto Plus...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No data available yet...</p>;

    // Latest draw (first item in the array)
    const latest = data?.DrawResults?.[0] || data?.[0];

    return (
        <div className="super-lotto-plus-container">
            <h2 className="super-lotto-plus-title">{gameName}</h2>

            {/* Latest draw */}
            <div className="super-lotto-plus">
                <p className="draw-date-latest">
                    <strong>Date: </strong>
                    {latest?.DrawDate || "N/A"}
                </p>

                <p className="draw-number-latest">
                    <strong>Numbers: </strong>
                    {Array.isArray(latest?.WinningNumbers)
                        ? latest.WinningNumbers.join(", ")
                        : latest?.WinningNumbers || "N/A"}
                </p>
            </div>

            {/* Past results for last 3 months */}
            <PastResults data={data} title="Past 3 Months" />
        </div>
    );
}