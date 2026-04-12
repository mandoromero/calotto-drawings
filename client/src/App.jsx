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
                <Route path="/:gameName" element={<LotteryPage />} />
            </Routes> 
        </div>
    );
}

export default App;