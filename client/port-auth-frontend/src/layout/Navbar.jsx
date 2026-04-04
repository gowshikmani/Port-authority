import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Port Authority Dashboard</h1>
        <div className="flex items-center gap-2">
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