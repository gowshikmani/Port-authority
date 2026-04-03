import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in with:", form);
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      console.log("Login response:", res.data);
      localStorage.setItem("auth", JSON.stringify(res.data));
      console.log("Auth stored:", localStorage.getItem("auth"));
      setError("");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.response?.data?.error || "Invalid login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="w-[360px] p-6 bg-white dark:bg-gray-800 shadow rounded text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <div className="mb-3 text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-500 underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
