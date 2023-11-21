import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./TableStyle.css";

const TableComponents = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setTableData(storedData);
  }, []);

  const handleDelete = (id) => {
    const updatedTableData = tableData.filter((item) => item.id !== id);
    setTableData(updatedTableData);
    localStorage.setItem("formData", JSON.stringify(updatedTableData));
  };

  const handleEdit = (id) => {
    navigate(`/form/${id}`);
  };

  return (
    <div className="table-body">
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.MobileNumber}</TableCell>
                <TableCell>{item.mail}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.password}</TableCell>
                <TableCell>
                  <div className="actions">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponents;
