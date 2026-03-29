import "../Home/Home.css";
import LotteryCard from "../../components/LotteryCard/LotteryCard"

export default function Home() {
    const games = [
        "Daily Derby",
        "Daily 3",
        "Daily 4",
        "Fantasy 5",
        "Super Lotto Plus", 
        "Powerball", 
        "Mega Millions"
    ];

    return (
        <div className="home-container">
            <h1 className="title">Welcome to the Home Page</h1>
            <div className="lottery-grid">
                {games.map((game) => (
                    <LotteryCard key={game} gameName={game} />
                ))}
            </div>
        </div>
    )
}

