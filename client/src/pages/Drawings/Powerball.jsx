import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLotteryGame } from "../../store/lotterySlice";
import PastResults from "../../components/PastResults/PastResults";
import "./Drawings.css";

export default function Powerball() {
    const dispatch = useDispatch();
    const gameName = "Powerball";

    const gameState = useSelector(
        (state) => state.lottery?.games?.[gameName]
    );

    const data = gameState?.data;
    const loading = gameState?.loading;
    const error = gameState?.error;

    useEffect(() => {
        if (!data && !loading) {
            dispatch(fetchLotteryGame(gameName));
        }
    }, [dispatch, data, loading, gameName]);

    if (loading) return <p>Loading Power Ball...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No data available yet...</p>;

    const results = data?.DrawResults || data;
    const latest = results?.[0];

    return (
        <div className="drawing-container">
            <h2 className="drawings-title">{gameName}</h2>
            <div className="drawing">
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
        
                <PastResults data={powerballData} />
        </div>
    )
}