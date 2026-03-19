import "../Navbar/Navbar.css";
// import { useState } from "react";

export default function Navbar() {
    // const [open, setOpen] = useState(false);

    return (
        <nav>
            <h1>Calif. Lotto Drawings</h1>
            <div className="select">
                <select dropdown>
                    <option className="option">Lottery Games</option>
                    <option className="option">Super Lotto</option>
                    <option className="option">Power Ball</option>
                    <option className="option">Mega Million</option>
                </select>
            </div>    
        </nav>        
    )
}