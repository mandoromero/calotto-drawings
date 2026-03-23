// import { Routes, Route, Link } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SuperLottoPlus from "../src/pages/SuperLottoPlus/SuperLottoPlus";


function App() {
  
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />  
                <Route path="/super-lotto-plus" element={<SuperLottoPlus />} />  
            </Routes> 
        </div>
    );
}

export default App;