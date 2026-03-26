import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">Port Admin</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-green-400">Dashboard</Link>
        <Link to="/ships" className="hover:text-green-400">Ships</Link>
        <Link to="/cargo" className="hover:text-green-400">Cargo</Link>
        <Link to="/docks" className="hover:text-green-400">Dock</Link>
        <Link to="/containers" className="hover:text-green-400">Containers</Link>
      </nav>
    </div>
  );
}

export default Sidebar;