import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Stats() {
  const [fresh, setFresh] = useState([]);
  const [salt, setSalt] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const q = query(collection(db, "catches"), where("uid", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      const all = snapshot.docs.map(doc => doc.data());
      setFresh(all.filter(f => f.type === "fresh"));
      setSalt(all.filter(f => f.type === "salt"));
    };
    load();
  }, []);

  return (
    <div className="pb-20 p-4">
      <h2 className="text-xl font-bold mb-4 text-center">🎣 My Catch Stats</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-lg">Freshwater Catches</h3>
        {fresh.length > 0 ? (
          fresh.map((c, i) => (
            <div key={i} className="bg-white rounded p-2 mb-2 shadow">
              {c.species} - {c.weight} lbs
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No freshwater catches yet.</p>
        )}
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-lg">Saltwater Catches</h3>
        {salt.length > 0 ? (
          salt.map((c, i) => (
            <div key={i} className="bg-white rounded p-2 mb-2 shadow">
              {c.species} - {c.weight} lbs
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No saltwater catches yet.</p>
        )}
      </div>

      {/* 🔘 Floating Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around items-center py-2 shadow-md z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex flex-col items-center text-gray-700 hover:text-black transition"
        >
          <span className="text-2xl">🔙</span>
          <span className="text-xs">Back</span>
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition"
        >
          <span className="text-2xl">🐟</span>
          <span className="text-xs">Home</span>
        </button>
      </div>
    </div>
  );
}
