import React, { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function LogCatch() {
  const [form, setForm] = useState({ species: "", weight: "", length: "", type: "fresh", photo: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "catches"), {
        ...form,
        uid: auth.currentUser.uid,
        created: Timestamp.now()
      });
      alert("Catch logged!");
      setForm({ species: "", weight: "", length: "", type: "fresh", photo: "" });
    } catch (err) {
      alert("Error logging catch: " + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Log a Catch</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
        <input value={form.species} onChange={e => setForm({...form, species: e.target.value})} placeholder="Species" className="p-2 rounded" required />
        <input value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} placeholder="Weight (lbs)" className="p-2 rounded" />
        <input value={form.length} onChange={e => setForm({...form, length: e.target.value})} placeholder="Length (in)" className="p-2 rounded" />
        <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="p-2 rounded">
          <option value="fresh">Freshwater</option>
          <option value="salt">Saltwater</option>
        </select>
        <input value={form.photo} onChange={e => setForm({...form, photo: e.target.value})} placeholder="Photo URL (optional)" className="p-2 rounded" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Save Catch</button>
      </form>
    </div>
  );
}
