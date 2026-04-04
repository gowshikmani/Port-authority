import { useEffect, useState } from "react";
import axios from "axios";

function Dock() {
  const [docks, setDocks] = useState([]);
  const [ships, setShips] = useState([]);
  const [selectedDock, setSelectedDock] = useState("");
  const [selectedShip, setSelectedShip] = useState("");
  const [dockForm, setDockForm] = useState({ dockNumber: "", capacity: 1, lat: "", lng: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      try {
        await Promise.all([fetchDocks(), fetchShips()]);
      } catch (err) {
        setError("Failed to load data.");
        console.error("Error loading dock data:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Add dock
  const handleAddDock = async (e) => {
    e.preventDefault();
    setError("");
    const latNum = parseFloat(dockForm.lat);
    const lngNum = parseFloat(dockForm.lng);
    if (!dockForm.dockNumber || isNaN(latNum) || isNaN(lngNum)) {
      setError("Dock number, latitude, and longitude are required and must be valid numbers.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/docks", { ...dockForm, lat: latNum, lng: lngNum });
      setDockForm({ dockNumber: "", capacity: 1, lat: "", lng: "" });
      fetchDocks();
    } catch (error) {
      console.error("Failed to add dock", error);
      setError(error?.response?.data?.error || "Failed to add dock.");
    }
  };

  // Assign ship to dock
  const assignShip = async () => {
    setError("");
    if (!selectedDock || !selectedShip) {
      setError("Please select both a dock and a ship.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/docks/assign", {
        dockId: selectedDock,
        shipId: selectedShip
      });
      await fetchDocks();
      await fetchShips();
      setSelectedDock("");
      setSelectedShip("");
    } catch (error) {
      console.error("Failed to assign ship:", error);
      setError(error?.response?.data?.error || "Failed to assign ship.");
    }
  };

  // Remove ship
  const removeShip = async (dockId, shipId) => {
    setError("");
    try {
      await axios.post("http://localhost:5000/api/docks/remove", {
        dockId,
        shipId
      });
      await fetchDocks();
      await fetchShips(); // Also fetch ships to update their status
    } catch (error) {
      console.error("Failed to remove ship:", error);
      setError(error?.response?.data?.error || "Failed to remove ship.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this dock?")) return;
    setError("");
    try {
      await axios.delete(`http://localhost:5000/api/docks/${id}`);
      fetchDocks();
      fetchShips();
    } catch (error) {
      console.error("Failed to delete dock", error);
      setError(error?.response?.data?.error || "Failed to delete dock.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dock Management</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      {/* Add Dock Form */}
      <form onSubmit={handleAddDock} className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700">
        <input
          type="text"
          placeholder="Dock Number"
          value={dockForm.dockNumber}
          onChange={(e) => setDockForm({ ...dockForm, dockNumber: e.target.value })}
          required
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={dockForm.capacity}
          onChange={(e) => setDockForm({ ...dockForm, capacity: parseInt(e.target.value) })}
          min="1"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
        />
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={dockForm.lat}
          onChange={(e) => setDockForm({ ...dockForm, lat: e.target.value })}
          required
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={dockForm.lng}
          onChange={(e) => setDockForm({ ...dockForm, lng: e.target.value })}
          required
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors col-span-full md:col-span-1"
        >
          Add Dock
        </button>
      </form>

      {/* Assignment Section */}
      <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl mb-6 flex flex-col md:flex-row gap-4 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700">
        <label htmlFor="select-dock" className="sr-only">Select Dock</label>
        <select
          id="select-dock"
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

        <label htmlFor="select-ship" className="sr-only">Select Ship</label>
        <select
          id="select-ship"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          onChange={(e) => setSelectedShip(e.target.value)}
        >
          <option>Select Ship</option>
          {ships.filter(ship => ship.status !== "Docked").map((ship) => (
            <option key={ship._id} value={ship._id}>
              {ship.name} ({ship.status})
            </option>
          ))}
        </select>


        <button onClick={assignShip} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Assign
        </button>
      </div>

      {/* Dock Table */}
      <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dock Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Capacity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ships</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {docks.map((dock) => (
              <tr key={dock._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{dock.dockNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{dock.capacity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    dock.status === "Available" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}>
                    {dock.status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {dock.currentShips?.map((ship) => (
                    <div key={ship._id} className="flex items-center justify-between py-1">
                      <span className="font-medium text-gray-900 dark:text-white">{ship.name}</span>
                      <button
                        onClick={() => removeShip(dock._id, ship._id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 ml-2 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(dock._id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {docks.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 italic">
                  No docks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dock;