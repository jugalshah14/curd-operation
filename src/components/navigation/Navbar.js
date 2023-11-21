import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/form">Form</Link>
        </li>
        <li>
          <Link to="/table">Table</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
