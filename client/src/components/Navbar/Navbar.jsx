import { useState } from "react";
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
            <div className="dropdown-item">Super Lotto</div>
            <div className="dropdown-item">Power Ball</div>
            <div className="dropdown-item">Mega Millions</div>
          </div>
        )}
      </div>
    </nav>
  );
}