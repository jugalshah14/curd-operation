/* eslint-disable react-hooks/exhaustive-deps */
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
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import TableSortLabel from "@mui/material/TableSortLabel";
import "./TableStyle.css";

const TableComponents = () => {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const updateTableData = () => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setTableData(storedData);
    setFilteredData(storedData);
  };

  useEffect(() => {
    updateTableData();
  }, [localStorage.getItem("formData")]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      filterTableData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
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

  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
    setSelectedRows((prevSelectedRows) =>
      !selectAll ? filteredData.map((item) => item.id) : []
    );
  };

  const handleDelete = (id) => {
    const updatedTableData = tableData.filter((item) => item.id !== id);
    setTableData(updatedTableData);
    setFilteredData(updatedTableData);
    localStorage.setItem("formData", JSON.stringify(updatedTableData));
  };

  const handleDeleteSelected = () => {
    const updatedTableData = tableData.filter(
      (item) => !selectedRows.includes(item.id)
    );
    setTableData(updatedTableData);
    setFilteredData(updatedTableData);
    setSelectedRows([]);
    setSelectAll(false);
    localStorage.setItem("formData", JSON.stringify(updatedTableData));
  };

  const handleEdit = (id) => {
    navigate(`/form/${id}`);
  };

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((rowId) => rowId !== id)
      );
      setSelectAll(false);
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
    }
  };

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });

  const handleSort = (field) => {
    const direction =
      sortConfig.key === field && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key: field, direction });
    setFilteredData(sortedData);
  };

  // useEffect(() => {
  //   if (sortConfig.key !== "" && sortConfig.key !== filteredData) {
  //     handleSort(sortConfig.key);
  //   }
  // }, [sortConfig, filteredData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-body">
      <div className="search">
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="actions">
          <Button
            startIcon={<DeleteOutlineIcon />}
            variant="contained"
            color="secondary"
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
          >
            Delete
          </Button>
        </div>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "firstName"}
                  direction={
                    sortConfig.key === "firstName"
                      ? sortConfig.direction
                      : "asc"
                  }
                  onClick={() => handleSort("firstName")}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "lastName"}
                  direction={
                    sortConfig.key === "lastName" ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSort("lastName")}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "gender"}
                  direction={
                    sortConfig.key === "gender" ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSort("gender")}
                >
                  Gender
                </TableSortLabel>
              </TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredData
            ).map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </TableCell>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default TableComponents;
