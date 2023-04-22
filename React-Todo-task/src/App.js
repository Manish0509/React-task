import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddTask } from "./components/AddTask";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="newTask" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
