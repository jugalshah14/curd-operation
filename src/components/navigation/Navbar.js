import React from "react";
import { Link } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TableChartIcon from "@mui/icons-material/TableChart";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/form">
            <InsertDriveFileIcon />
          </Link>
        </li>
        <li>
          <Link to="/">
            <TableChartIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
