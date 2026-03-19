import { useState } from "react";
import "../Navbar/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <h1>Calif. Lotto Drawings</h1>

      <div className="select">
        {/* Selected value */}
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