import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  const [inverted, setInverted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("inverted") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("invert-colors", inverted);
    localStorage.setItem("theme", theme);
    localStorage.setItem("inverted", String(inverted));
  }, [theme, inverted]);

  useEffect(() => {
    const keydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setInverted((prev) => !prev);
      }
    };

    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleInverted = () => {
    setInverted((prev) => !prev);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Port Authority Dashboard</h1>
        <div className="flex items-center gap-2">
          <p className="text-sm">{theme === "dark" ? "Dark" : "Light"} Mode</p>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-150"
            aria-label="Toggle light or dark mode"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            onClick={toggleInverted}
            className={`px-3 py-1 rounded transition-all duration-150 ${inverted ? "bg-yellow-400 text-black" : "bg-blue-200 text-black dark:bg-blue-700 dark:text-white"}`}
            aria-label="Toggle color inversion"
          >
            {inverted ? "Invert On" : "Invert Off"}
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;