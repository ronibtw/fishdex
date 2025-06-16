import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100">
      <img src="/logo.png" alt="Fishdex Logo" className="w-32 mb-4" />
      <h1 className="text-2xl font-bold mb-4">Register for Fishdex</h1>
      <form onSubmit={register} className="flex flex-col gap-4 w-72">
        <input className="p-2 rounded" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input className="p-2 rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-600 text-white p-2 rounded" type="submit">Register</button>
        <p className="text-center text-sm mt-2">
          Already have an account? <span className="text-blue-700 cursor-pointer" onClick={() => navigate("/")}>Login</span>
        </p>
      </form>
    </div>
  );
}
