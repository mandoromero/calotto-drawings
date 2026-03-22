import "../Home/Home.css";
import LotteryCard from "../../components/LotteryCard/LotteryCard"

export default function Home() {
    const games = ["Super Lotto Plus", "Power Ball", "Mega Millions"];

    return (
        <div className="home-container">
            <h1 className="title">Welcome to the Home Page</h1>
                <LotteryCard gameName="Super Lotto Plus" />
                <LotteryCard gameName="Power Ball" />
                <LotteryCard gameName="Mega Million" />
        </div>
    )
}

