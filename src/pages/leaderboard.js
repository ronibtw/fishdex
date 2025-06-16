import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Leaderboard() {
  const [catches, setCatches] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snapshot = await getDocs(collection(db, "catches"));
      const data = snapshot.docs.map(doc => doc.data());
      setCatches(data);
    };
    load();
  }, []);

  const sorted = catches.sort((a, b) => parseFloat(b.weight || 0) - parseFloat(a.weight || 0));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">🏆 Leaderboard</h2>
      {sorted.map((c, i) => (
        <div key={i} className="bg-white p-3 rounded shadow mb-2">
          <p><strong>{c.species}</strong> - {c.weight} lbs</p>
          {c.photo && <img src={c.photo} alt="fish" className="mt-2 w-full max-w-xs mx-auto" />}
        </div>
      ))}
    </div>
  );
}
