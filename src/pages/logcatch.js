import React, { useState } from "react";
import { db, auth, storage } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // For unique filenames

export default function LogCatch() {
  const [form, setForm] = useState({
    species: "",
    weight: "",
    length: "",
    type: "fresh"
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setUploading(true);

  try {
    let photoURL = "";

    if (imageFile) {
      const imageRef = ref(storage, `catches/${auth.currentUser.uid}/${uuidv4()}`);
      console.log("Uploading image...");
      const snapshot = await uploadBytes(imageRef, imageFile);
      console.log("Upload complete");
      photoURL = await getDownloadURL(snapshot.ref);
      console.log("Image URL:", photoURL);
    }

    await addDoc(collection(db, "catches"), {
      ...form,
      photo: photoURL,
      uid: auth.currentUser.uid,
      created: Timestamp.now()
    });

    alert("🎣 Catch logged!");
    setForm({ species: "", weight: "", length: "", type: "fresh" });
    setImageFile(null);
  } catch (err) {
    console.error("Upload error:", err);
    alert("❌ Failed to upload image or save catch.");
  }

  setUploading(false);
};


  return (
    <div className="pb-20 p-4">
      <h2 className="text-xl font-bold mb-4 text-center">📸 Log a Catch</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
        <input
          value={form.species}
          onChange={(e) => setForm({ ...form, species: e.target.value })}
          placeholder="Fish species (e.g., Largemouth Bass)"
          className="p-2 rounded border"
          required
        />
        <input
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
          placeholder="Weight (lbs)"
          className="p-2 rounded border"
        />
        <input
          value={form.length}
          onChange={(e) => setForm({ ...form, length: e.target.value })}
          placeholder="Length (inches)"
          className="p-2 rounded border"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="p-2 rounded border"
        >
          <option value="fresh">Freshwater</option>
          <option value="salt">Saltwater</option>
        </select>

        {/* 📷 File Upload Input */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          disabled={uploading}
          className={`${
            uploading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white py-2 rounded transition`}
        >
          {uploading ? "Uploading..." : "Save Catch"}
        </button>
      </form>

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
