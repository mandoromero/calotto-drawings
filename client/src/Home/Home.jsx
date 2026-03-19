import "../Home/Home.css";

function Home() {
    return (
        <div className="home-container">
            <div className="lottery-drawings" id="home-super-lotto">
                <h2 className="lotto-title" id="super-lotto-title">Super Lotto</h2>
                <p className="home-date"><strong>Date:</strong> 03/18/2026</p>
                <p className="home-numbers"><strong>Numbers:</strong> 01 02 03 04 05 06</p>
            </div>
            <div className="lottery-drawings" id="home-power-ball">
                <h2 className="lotto-title" id="power-ball-title">Power Ball</h2>
                <p className="home-date"><strong>Date:</strong> 03/08/2026</p>
                <p className="home-numbers"><strong>Numbers:</strong>01 02 03 04 05 06</p>
            </div>
            <div className="lottery-drawings" id="home-mega-millioins">
                <h2 className="lotto-title" id="mega-millions-title">Mega Millions</h2>
                <p className="home-date"><strong>Date:</strong>03/18/2026</p>
                <p className="home-numbers"><strong>Numbers:</strong>01 02 03 04 05 06</p>
            </div>
        </div>
    )
}

export default Home;