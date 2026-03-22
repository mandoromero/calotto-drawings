import "./Home.css";
// import { useEffect, useState } from "react";
// import { getSuperLotto } from "../../services/api.js";
// import LotteryCard from "../../components/LotteryCard/LotteryCard.jsx";

export default function Home() {
    // const [superLotto, setSuperLotto] = useState(null);

    // useEffect(() => {
    //     fetchAll();
    // }, []);

    // const fetchAll = async () =>{
    //     try {
    //         const superRes = await getSuperLotto();

    //        setSuperLotto(superRes.data[0]);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    return (
        <div className="home-container">
            <LotteryCard />
        </div>    
    )
}

