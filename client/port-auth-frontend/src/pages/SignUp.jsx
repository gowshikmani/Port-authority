import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to register.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="w-[360px] p-6 bg-white dark:bg-gray-800 shadow rounded">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Sign Up</h1>
        {error && <div className="mb-3 text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
