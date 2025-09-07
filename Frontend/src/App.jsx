import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Employee from "./Components/Employee.jsx";

function App() {
  return (
    <>
      <div>
          <Navbar></Navbar>
          <Employee></Employee>
      </div>
    </>
  );
}

export default App;
