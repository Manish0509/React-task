import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import TableList from "./components/TableList";
import Form from "./components/Form";
import EditRecord from "./components/EditRecord";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TableList />} />
          <Route path="form" element={<Form />} />
          <Route path="/edit/:id" element={<EditRecord />} />
          <Route path="/view/:id" element={<EditRecord />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
