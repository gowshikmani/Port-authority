import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    ships: 0,
    docks: 0,
    occupiedDocks: 0,
    cargo: 0,
    containers: 0
  });

  const [containers, setContainers] = useState([]);

  async function fetchData() {
    const ships = await axios.get("http://localhost:5000/api/ships");
    const docks = await axios.get("http://localhost:5000/api/docks");
    const cargo = await axios.get("http://localhost:5000/api/cargo");
    const containersRes = await axios.get("http://localhost:5000/api/containers");

    const occupied = docks.data.filter((d) => d.status === "Occupied").length;

    setStats({
      ships: ships.data.length,
      docks: docks.data.length,
      occupiedDocks: occupied,
      cargo: cargo.data.length,
      containers: containersRes.data.length
    });

    setContainers(containersRes.data);
  }

  useEffect(() => {
    const load = async () => {
      await fetchData();
    };

    load();
  }, []);


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2>Total Ships</h2>
          <p className="text-xl font-bold">{stats.ships}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2>Total Docks</h2>
          <p className="text-xl font-bold">{stats.docks}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2>Occupied Docks</h2>
          <p className="text-xl font-bold text-red-500">
            {stats.occupiedDocks}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2>Total Cargo</h2>
          <p className="text-xl font-bold">{stats.cargo}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2>Containers</h2>
          <p className="text-xl font-bold">{stats.containers}</p>
        </div>
      </div>

      {/* Container Movement Overview */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">
          Container Locations
        </h2>

        <table className="w-full text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Container</th>
              <th className="p-2">Cargo</th>
              <th className="p-2">Location</th>
            </tr>
          </thead>

          <tbody>
            {containers.slice(0, 5).map((c) => (
              <tr key={c._id} className="border-t">
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