import { useState } from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <h2 className="main-title">Calif. Lotto Drawings</h2>

      <div className="select">
        <div 
          className="dropdown-header"
          onClick={() => setOpen(!open)}
        >
          Lottery Games ▼
        </div>

        {/* Dropdown menu */}
        {open && (
          <div className="dropdown-menu">
            <Link to="/super-lotto-plus" className="dropdown-item">
              Super Lotto Plus
            </Link>
    
            <Link to="/powerball" className="dropdown-item">
              Power Ball
            </Link>
            <div className="dropdown-item">Mega Millions</div>
          </div>
        )}
      </div>
    </nav>
  );
}