import "../Home/Home.css";
import LotteryCard from "../../components/LotteryCard/LotteryCard"

export default function Home() {
    const games = [
        "Super Lotto Plus", 
        "Powerball", 
        "Mega Millions"
    ];

    return (
        <div className="home-container">
            <h1 className="title">California Lottery Winning Numbers</h1>
            <div className="lottery-grid">
                {games.map((game) => (
                    <LotteryCard key={game} gameName={game} />
                ))}
            </div>
        </div>
    )
}

