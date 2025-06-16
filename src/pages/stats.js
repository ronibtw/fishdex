import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Stats() {
  const [fresh, setFresh] = useState([]);
  const [salt, setSalt] = useState([]);

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">🎣 My Catch Stats</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Freshwater</h3>
        {fresh.map((c, i) => <div key={i}>{c.species} - {c.weight} lbs</div>)}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Saltwater</h3>
        {salt.map((c, i) => <div key={i}>{c.species} - {c.weight} lbs</div>)}
      </div>
    </div>
  );
}
