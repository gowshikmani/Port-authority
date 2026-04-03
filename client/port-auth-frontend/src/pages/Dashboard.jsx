import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState({
    ships: 0,
    docks: 0,
    occupiedDocks: 0,
    cargo: 0,
    containers: 0
  });

  const [containers, setContainers] = useState([]);
  const [docks, setDocks] = useState([]);

  async function fetchData() {
    const ships = await axios.get("http://localhost:5000/api/ships");
    const docksRes = await axios.get("http://localhost:5000/api/docks");
    const cargo = await axios.get("http://localhost:5000/api/cargo");
    const containersRes = await axios.get("http://localhost:5000/api/containers");

    const occupied = docksRes.data.filter((d) => d.status === "Occupied").length;

    setStats({
      ships: ships.data.length,
      docks: docksRes.data.length,
      occupiedDocks: occupied,
      cargo: cargo.data.length,
      containers: containersRes.data.length
    });

    setContainers(containersRes.data);
    setDocks(docksRes.data);
  }

  useEffect(() => {
    const load = async () => {
      await fetchData();
    };

    load();
  }, []);

  // Prepare chart data
  const barData = [
    { name: 'Ships', value: stats.ships },
    { name: 'Docks', value: stats.docks },
    { name: 'Cargo', value: stats.cargo },
    { name: 'Containers', value: stats.containers }
  ];

  const pieData = [
    { name: 'Occupied', value: stats.occupiedDocks },
    { name: 'Available', value: stats.docks - stats.occupiedDocks }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-white">
          <h2>Total Ships</h2>
          <p className="text-xl font-bold">{stats.ships}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-white">
          <h2>Total Docks</h2>
          <p className="text-xl font-bold">{stats.docks}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-white">
          <h2>Occupied Docks</h2>
          <p className="text-xl font-bold text-red-500">
            {stats.occupiedDocks}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-white">
          <h2>Total Cargo</h2>
          <p className="text-xl font-bold">{stats.cargo}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-white">
          <h2>Containers</h2>
          <p className="text-xl font-bold">{stats.containers}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Overview</h2>
          <BarChart width={400} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Dock Status</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx={200}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Container Movement Overview */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-white">
        <h2 className="text-lg font-bold mb-4">
          Container Locations
        </h2>

        <table className="w-full text-center">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2">Container</th>
              <th className="p-2">Cargo</th>
              <th className="p-2">Location</th>
            </tr>
          </thead>

          <tbody>
            {containers.slice(0, 5).map((c) => (
              <tr key={c._id} className="border-t dark:border-gray-700">
                <td className="p-2">{c.containerId}</td>
                <td className="p-2">{c.cargo?.type}</td>
                <td className="p-2">{c.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;