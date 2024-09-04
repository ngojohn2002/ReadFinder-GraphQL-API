import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";
import "./App.css";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchBooks />} />
        <Route path="/saved" element={<SavedBooks />} />
        {/* Additional routes can be added here */}
      </Routes>
    </>
  );
}

export default App;
