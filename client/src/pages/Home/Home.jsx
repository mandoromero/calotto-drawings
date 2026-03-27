import "../Home/Home.css";
import LotteryCard from "../../components/LotteryCard/LotteryCard"

export default function Home() {
    const games = ["Super Lotto Plus", "Powerball", "Mega Millions"];

    return (
        <div className="home-container">
            <h1 className="title">Welcome to the Home Page</h1>
            {games.map((game) => (
                <LotteryCard key={game} gameName={game} />
            ))}
        </div>
    )
}

