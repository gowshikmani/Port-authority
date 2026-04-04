import { useEffect, useState, useCallback, useEffect as UseEffect2 } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("theme") || null;
  });

  const [systemDark, setSystemDark] = useState(false);

  const [inverted, setInverted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("inverted") === "true";
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(mq.matches);
    const handleChange = (e) => setSystemDark(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

useEffect(() => {
    const isDark = theme === "dark" || (theme === null && systemDark);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("invert-colors", inverted);
    if (theme !== null) {
      localStorage.setItem("theme", theme);
    }
    localStorage.setItem("inverted", String(inverted));
  }, [theme, systemDark, inverted]);

useEffect(() => {
    const keydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        toggleTheme();
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setInverted((prev) => !prev);
      }
    };

    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

const toggleTheme = useCallback(() => {
    if (theme === null) {
      // Switch from system to manual opposite of current system
      setTheme(systemDark ? "light" : "dark");
    } else {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }
  }, [theme, systemDark]);

  const toggleInverted = () => {
    setInverted((prev) => !prev);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Port Authority Dashboard</h1>
        <div className="flex items-center gap-2">
<p className="text-sm">
  {theme === null 
    ? `System (${systemDark ? "Dark" : "Light"})` 
    : `${theme === "dark" ? "Dark" : "Light"}`
  } Mode
</p>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-150"
aria-label="Toggle theme (system/manual, clear localStorage.theme to reset)"
          >
{theme === null 
  ? (systemDark ? "☀️ System Light" : "🌙 System Dark")
  : (theme === "dark" ? "☀️ Light" : "🌙 Dark")
}
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