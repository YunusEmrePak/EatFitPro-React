import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Navbar from "./components/Navbar/Navbar";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
