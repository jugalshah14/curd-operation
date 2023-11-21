import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormComponents from "./components/form/FormComponents";
import TableComponents from "./components/table/TableComponents";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<FormComponents />} />
        <Route path="TableComponents" element={<TableComponents />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
