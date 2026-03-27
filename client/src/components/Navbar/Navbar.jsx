import { useState } from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <h2 className="main-title">Calif. Lotto Drawings</h2>

      <div 
        className="select"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div 
          className="dropdown-header"
        >
          Lottery Games ▼
        </div>

        {/* Dropdown menu */}
        {open && (
          <div className="dropdown-menu">
            <Link to="/home" className="dropdown-item" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/super-lotto-plus" className="dropdown-item" onClick={() => setOpen(false)}>
              Super Lotto Plus
            </Link>
    
            <Link to="/powerball" className="dropdown-item" onClick={() => setOpen(false)}>
              Power Ball
            </Link>
            <Link to="/mega-millions" className="dropdown-item onClick={() => setOpen(false)}">
              Mega Millions
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}