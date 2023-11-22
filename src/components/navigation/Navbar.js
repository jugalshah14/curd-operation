import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/form">ADD</Link>
        </li>
        <li>
          <Link to="/">LIST</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
