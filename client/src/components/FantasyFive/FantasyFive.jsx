import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFantasyFive } from "../../store/lotterySlice";
import { Link } from "react-router-dom";
import "../FantasyFive/FantasyFive.css";

export default function FantasyFive() {
    const dispatch = useDispatch();

    const gameState = useSelector((state) => state.lottery?.fantasyFive);

    const data = gameState?.data;
    const loading = gameState?.loading;
    const error = gameState?.error;

    useEffect(() => {
        if (!data && !loading) {
            dispatch(fetchFantasyFive());
        }
    }, [dispatch, data, loading]);

    if (loading) {
        return (
            <div className="fantasy-five-container">
                <h2 className="lotto-title">Fantasy 5</h2>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fantasy-five-container">
                <h2 className="lotto-title">Fantasy 5</h2>
                <p style={{ color: "red"}}>Error: {error}</p>
            </div>
        );
    }

    if (!data || data.length == 0) {
        return null;
    }

    const latest = data[0];

    console.log("Fantasy 5", latest);

    return (
        <div className="fantasy-five-container">

            <Link to="/fantasy-five" className="lotto-title-link">
                <h2 className="lotto-title">Fantasy 5</h2>
            </Link>

            <p className="draw-number">
                <strong>Draw Number:</strong>{" "}
                <span>
                    {latest?.drawNumber ?? "N/A"}
                </span>
            </p>

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

        </div>
    )
}