import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);

      nav("/dashboard");
    } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);

  alert(err.response?.data?.msg || err.message);
}
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Join Skill Swap 🚀
        </h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-4 rounded-lg bg-white/30 placeholder-white outline-none"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-white/30 placeholder-white outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-white/30 placeholder-white outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="w-full bg-green-500 hover:bg-green-700 py-3 rounded-lg transition duration-300">
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="underline hover:text-gray-200">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}