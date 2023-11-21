import React from "react";
import Navbar from "./components/navigation/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormComponents from "./components/form/FormComponents";
import TableComponents from "./components/table/TableComponents";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/form/:id?" element={<FormComponents />} />
        <Route index element={<TableComponents />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
