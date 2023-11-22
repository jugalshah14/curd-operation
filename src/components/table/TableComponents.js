import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import "./TableStyle.css";

const TableComponents = () => {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const updateTableData = () => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setTableData(storedData);
    setFilteredData(storedData);
  };

  useEffect(() => {
    updateTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("formData")]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      filterTableData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, tableData]);

  const filterTableData = () => {
    if (searchTerm === "") {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  };

  const handleDelete = (id) => {
    const updatedTableData = tableData.filter((item) => item.id !== id);
    setTableData(updatedTableData);
    setFilteredData(updatedTableData);
    localStorage.setItem("formData", JSON.stringify(updatedTableData));
  };

  const handleEdit = (id) => {
    navigate(`/form/${id}`);
  };

  return (
    <div className="table-body">
      <div className="search">
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
            {filteredData.map((item) => (
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
