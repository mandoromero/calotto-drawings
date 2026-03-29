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

        {open && (
          <div className="dropdown-menu">
            <Link to="/home" className="dropdown-item" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/daily-derby" className="dropdown-item" onClick={() => setOpen(false)}>
             Daily Derby
            </Link>
            <Link to="/daily-3" className="dropdown-item" onClick={() => setOpen(false)}>
              Daily 3
            </Link>
            <Link to="/daily-4" className="dropdown-item" onClick={() => setOpen(false)}>
              Daily 4
            </Link>
            <Link to="/fantasy-5" className="dropdown-item" onClick={() => setOpen(false)}>
              Fantasy 5
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