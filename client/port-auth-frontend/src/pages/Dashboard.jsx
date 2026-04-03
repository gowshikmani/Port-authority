import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [ships, setShips] = useState([]);
  const [cargo, setCargo] = useState([]);
  const [docks, setDocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shipsRes, cargoRes, docksRes] = await Promise.all([
          axios.get("http://localhost:5000/api/ships"),
          axios.get("http://localhost:5000/api/cargo"),
          axios.get("http://localhost:5000/api/docks")
        ]);
        setShips(shipsRes.data);
        setCargo(cargoRes.data);
        setDocks(docksRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalWeight = cargo.reduce((acc, item) => acc + (item.weight || 0), 0);
  const availableDocks = docks.filter(d => d.status === "Available").length;
  const pendingCargo = cargo.filter(c => c.status === "Pending").length;

  const stats = [
    { title: "Active Ships", value: ships.length.toString(), change: "Total", color: "primary" },
    { title: "Current Cargo", value: `${totalWeight.toLocaleString()}t`, change: "Weight", color: "success" },
    { title: "Available Docks", value: availableDocks.toString(), change: "Open", color: "warning" },
    { title: "Pending Cargo", value: pendingCargo.toString(), change: "Unprocessed", color: "danger" },
  ];

  // Tailwind requires full class names to be present in the source code for the JIT compiler
  const colorMap = {
    primary: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
            <div className="flex flex-col">
              <small className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-wider">{stat.title}</small>
              <h2 className="text-3xl font-extrabold my-2 text-gray-900 dark:text-white">{stat.value}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${colorMap[stat.color]}`}>
                {stat.change} status
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-700">
          <h5 className="text-lg font-bold text-gray-900 dark:text-white">Terminal Operations</h5>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-bold">Vessel Name</th>
                <th className="px-6 py-3 font-bold">Cargo Type</th>
                <th className="px-6 py-3 font-bold">Arrival</th>
                <th className="px-6 py-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ships.length > 0 ? (
                ships.slice(0, 5).map((ship) => (
                  <tr key={ship._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{ship.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{ship.imoNumber}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{new Date(ship.arrivalTime).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        Details →
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400 italic">
                    No terminal operations currently active.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;