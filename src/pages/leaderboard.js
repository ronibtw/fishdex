import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const [catches, setCatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const snapshot = await getDocs(collection(db, "catches"));
      const data = snapshot.docs.map(doc => doc.data());
      setCatches(data);
    };
    load();
  }, []);

  // Sort by biggest weight
  const sorted = catches.sort((a, b) => parseFloat(b.weight || 0) - parseFloat(a.weight || 0));

  return (
    <div className="pb-20 p-4">
      <h2 className="text-xl font-bold text-center mb-4">🏆 Leaderboard</h2>

      {sorted.length > 0 ? (
        sorted.map((c, i) => (
          <div key={i} className="bg-white p-4 rounded shadow mb-3">
            <p className="font-semibold">
              {i + 1}. {c.species} – {c.weight} lbs
            </p>
            {c.length && <p className="text-sm text-gray-500">Length: {c.length} in</p>}
            {c.photo && (
              <img src={c.photo} alt="fish" className="mt-2 w-full max-w-xs mx-auto rounded" />
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No catches yet.</p>
      )}

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
