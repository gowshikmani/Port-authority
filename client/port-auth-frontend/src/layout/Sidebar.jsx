import { NavLink } from "react-router-dom";

const linkStyles = ({ isActive }) =>
  `transition text-lg font-medium ${isActive ? "text-green-300" : "text-gray-200 hover:text-green-400"}`;

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 dark:bg-gray-800 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">Port Admin</h1>

      <nav className="flex flex-col gap-4">
        <NavLink to="/" className={linkStyles}>Dashboard</NavLink>
        <NavLink to="/ships" className={linkStyles}>Ships</NavLink>
        <NavLink to="/cargo" className={linkStyles}>Cargo</NavLink>
        <NavLink to="/docks" className={linkStyles}>Dock</NavLink>
        <NavLink to="/containers" className={linkStyles}>Containers</NavLink>
        <NavLink to="/timeline" className={linkStyles}>Timeline</NavLink>
        <NavLink to="/maps" className={linkStyles}>Maps</NavLink>
      </nav>

      <p className="mt-10 text-xs text-gray-400">
        Tip: press <kbd className="bg-gray-700 px-1 rounded">Ctrl</kbd>+<kbd className="bg-gray-700 px-1 rounded">J</kbd> to toggle theme.
      </p>
    </div>
  );
}

export default Sidebar;