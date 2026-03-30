import { useState } from "react";
import API from "../api/api";

export default function Profile() {
  const [form, setForm] = useState({
    skillsOffered: "",
    skillsWanted: "",
    teachingMode: "",
    pricePerHour: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put("/users/profile", {
        skillsOffered: form.skillsOffered.split(","),
        skillsWanted: form.skillsWanted.split(","),
        teachingMode: form.teachingMode.split(","),
        pricePerHour: Number(form.pricePerHour),
      });

      alert("Profile updated successfully 🚀");
    } catch {
      alert("Error updating profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-2xl mb-4 text-center">My Profile 👤</h2>

        <input
          placeholder="Skills Offered (React, Python)"
          className="w-full p-3 mb-3 rounded bg-white/30"
          onChange={(e) =>
            setForm({ ...form, skillsOffered: e.target.value })
          }
        />

        <input
          placeholder="Skills Wanted (UI/UX, DSA)"
          className="w-full p-3 mb-3 rounded bg-white/30"
          onChange={(e) =>
            setForm({ ...form, skillsWanted: e.target.value })
          }
        />

        <input
          placeholder="Teaching Mode (swap, paid, free)"
          className="w-full p-3 mb-3 rounded bg-white/30"
          onChange={(e) =>
            setForm({ ...form, teachingMode: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price per hour"
          className="w-full p-3 mb-3 rounded bg-white/30"
          onChange={(e) =>
            setForm({ ...form, pricePerHour: e.target.value })
          }
        />

        <button className="w-full bg-blue-500 py-3 rounded">
          Update Profile 💾
        </button>
      </form>
    </div>
  );
}