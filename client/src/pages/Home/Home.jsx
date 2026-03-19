import "./Home.css";
import { useEffect, useState } from "react";
import { supperLotto } from "../../services/api";

function Home() {
    const [superLotto, setSuperLotto] = useState(null);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () =>{
        try {
            const superRes = await getSuperLotto();

            setSuperLotto(superRes.date[0]);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="home-container">

            {superLotto &&  (
                <div className="lottery-drawings" id="home-super-lotto">
                    <h2 className="lotto-title" id="super-lotto-title">Super Lotto</h2>
                    <p className="home-date"><strong>Date:</strong> {superLotto.DrawDate}</p>
                    <p className="home-numbers"><strong>Numbers:</strong> {superLotto.DrawNumbers}</p>
                </div>
            )}

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