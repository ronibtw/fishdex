import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="p-6 text-center">
      <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-4">Welcome to Fishdex 🐟</h1>
      <div className="flex flex-col gap-4">
        <button className="bg-green-500 text-white p-2 rounded" onClick={() => navigate("/log")}>Log a Catch</button>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={() => navigate("/leaderboard")}>Leaderboard</button>
        <button className="bg-purple-500 text-white p-2 rounded" onClick={() => navigate("/stats")}>My Stats</button>
        <button className="bg-red-500 text-white p-2 rounded" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
