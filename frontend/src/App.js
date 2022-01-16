import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Homepage from "./components/homepage";
import Navbar from "./components/navbar";
import AddExperience from "./components/add-experiece";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <Navbar>
              <Homepage />
            </Navbar>
          }
        />
        <Route
          path="/add-experience"
          element={
            <Navbar>
              <AddExperience />
            </Navbar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
