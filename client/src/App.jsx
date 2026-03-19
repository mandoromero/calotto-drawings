// import { Routes, Route, Link } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar";


function App() {
  
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />    
            </Routes> 
        </div>
    );
}

export default App;