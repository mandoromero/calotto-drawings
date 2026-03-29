// import { Routes, Route, Link } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar";
import LotteryPage from "../src/pages/LotteryPage/LotteryPage";


function App() {
  
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/super-lotto-plus" element={<LotteryPage gameName="Super Lotto Plus" />} />
                <Route path="/powerball" element={<LotteryPage gameName="Powerball" />} />
                <Route path="/mega-millions" element={<LotteryPage gameName="Mega Millions" />} />
            </Routes> 
        </div>
    );
}

export default App;