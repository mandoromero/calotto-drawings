// import { Routes, Route, Link } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SuperLottoPlus from "../src/pages/Drawings/SuperLottoPlus";
import Powerball from "../src/pages/Drawings/Powerball";


function App() {
  
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />  
                <Route path="/super-lotto-plus" element={<SuperLottoPlus />} />  
                <Route path="/powerball" element={<Powerball />} />
            </Routes> 
        </div>
    );
}

export default App;