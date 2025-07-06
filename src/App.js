import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Dashboard from "./pages/dashboard.js";
import LogCatch from "./pages/logcatch.js";
import Leaderboard from "./pages/leaderboard.js";
import Stats from "./pages/stats.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/log" element={<LogCatch />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter> 
  );
}
