import { useEffect, useState } from "react";
import axios from "axios";

function Dock() {
  const [docks, setDocks] = useState([]);
  const [ships, setShips] = useState([]);
  const [selectedDock, setSelectedDock] = useState("");
  const [selectedShip, setSelectedShip] = useState("");

  // Fetch docks
  const fetchDocks = async () => {
    const res = await axios.get("http://localhost:5000/api/docks");
    setDocks(res.data);
  };

  // Fetch ships
  const fetchShips = async () => {
    const res = await axios.get("http://localhost:5000/api/ships");
    setShips(res.data);
  };

  useEffect(() => {
    const load = async () => {
      await Promise.all([fetchDocks(), fetchShips()]);
    };

    load();
  }, []);

  // Assign ship to dock
  const assignShip = async () => {
    await axios.post("http://localhost:5000/api/docks/assign", {
      dockId: selectedDock,
      shipId: selectedShip
    });

    fetchDocks();
    fetchShips();
  };

  // Remove ship
  const removeShip = async (dockId, shipId) => {
    await axios.post("http://localhost:5000/api/docks/remove", {
      dockId,
      shipId
    });

    fetchDocks();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dock Management</h1>

      {/* Assignment Section */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow rounded mb-6 flex gap-4 text-gray-900 dark:text-white">
        <select
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          onChange={(e) => setSelectedDock(e.target.value)}
        >
          <option>Select Dock</option>
          {docks.map((dock) => (
            <option key={dock._id} value={dock._id}>
              {dock.dockNumber}
            </option>
          ))}
        </select>

        <select
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          onChange={(e) => setSelectedShip(e.target.value)}
        >
          <option>Select Ship</option>
          {ships.map((ship) => (
            <option key={ship._id} value={ship._id}>
              {ship.name}
            </option>
          ))}
        </select>

        <button
          onClick={assignShip}
          className="bg-blue-500 text-white px-4"
        >
          Assign
        </button>
      </div>

      {/* Dock Table */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow rounded text-gray-900 dark:text-white">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2">Dock</th>
              <th className="p-2">Status</th>
              <th className="p-2">Ships</th>
            </tr>
          </thead>

          <tbody>
            {docks.map((dock) => (
              <tr key={dock._id} className="border-t dark:border-gray-700 text-center">
                <td className="p-2">{dock.dockNumber}</td>
                <td className="p-2">{dock.status}</td>

                <td className="p-2">
                  {dock.currentShips?.map((ship) => (
                    <div key={ship._id} className="flex justify-between items-center mb-1">
                      <span>{ship.name}</span>
                      <button
                        onClick={() => removeShip(dock._id, ship._id)}
                        className="text-red-500 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dock;