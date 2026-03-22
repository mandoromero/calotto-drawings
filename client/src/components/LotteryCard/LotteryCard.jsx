import "../LotteryCard/LotteryCard.css";
import { useState, useEffect } from "react";
import { getSuperLotto } from "../../services/api";

export default function LotteryCard({ title }) {
    const [lotteryData, setLotteryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        const fetchLottery = async () => {
            try {
                setLoading(true);
                const data = await getSuperLotto();
                const latestDraw = data?.DrawResults?.[0];

                if (latestDraw) {
                    setSuperLotto({
                        DrawDate: latestDraw.DrawDate,
                        DrawNumbers: latestDraw.WinningNumbers.joint(", ")
                    });
                } 
            } catch (error) {
                console.error("Error fetching Super Lottoe:", error);
            }
        };
        
        fetchLottery();
    }, []);

    return (
        <div className="lottery-card-container">
            <h2 className="lotto-title" id="super-lotto-title">Super Lotto</h2>
            <p className="latest-draw-date">
                <strong>Date:</strong>{" "}
                {superLotto ? superLotto.DrawDate : "Loading..."}
            </p>
            <p className="home-numbers">
                <strong>Numbers:</strong>{" "}
                {superLotto ? superLotto.DrawNumbers : "Loading..."}
            </p>         
        </div>
    )
}