import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";
import Dashboard from "../Dashboard";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Routers;
