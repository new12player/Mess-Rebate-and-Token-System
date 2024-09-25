import React from "react";
import './App.css'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import AuthComponent from "./components/AuthComponent";
import Home from "./components/Home";
export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AuthComponent />} />
      <Route path="/home" element={<Home />} />
      {/* <div>Hello</div> */}
    </Routes>
    </Router>
  )
}