import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);

      nav("/dashboard");
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome Back 💜
        </h2>

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

        <button className="w-full bg-purple-600 hover:bg-purple-800 py-3 rounded-lg transition duration-300">
          Login
        </button>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="underline hover:text-gray-200">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}