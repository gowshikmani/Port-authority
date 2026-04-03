import { useEffect, useState } from "react";
import axios from "axios";

function Ships() {
  const [ships, setShips] = useState([]);
  const [form, setForm] = useState({
    name: "",
    imoNumber: "",
    arrivalTime: "",
    lat: "",
    lng: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch ships
  const fetchShips = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ships");
      setShips(res.data);
    } catch (err) {
      setError("Failed to fetch ships.");
      console.error("Error fetching ships:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      await fetchShips(); // fetchShips handles its own loading/error
    };

    load();
  }, []);

  // Add ship
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.imoNumber || !form.arrivalTime || !form.lat || !form.lng) {
      setError("Please fill all fields for the ship.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/ships", form);
      setForm({ name: "", imoNumber: "", arrivalTime: "", lat: "", lng: "" });
      fetchShips();
    } catch (error) {
      console.error("Failed to add ship", error);
      setError(error?.response?.data?.error || "Failed to add ship.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Ships Management</h1>

      {error && <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded">{error}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl mb-6 grid grid-cols-1 md:grid-cols-6 gap-4 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700">
        <input
          placeholder="Name"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="IMO"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          value={form.imoNumber}
          onChange={(e) => setForm({ ...form, imoNumber: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          value={form.arrivalTime}
          onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
          required
        />
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          value={form.lat}
          onChange={(e) => setForm({ ...form, lat: e.target.value })}
          required
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          value={form.lng}
          onChange={(e) => setForm({ ...form, lng: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors col-span-full md:col-span-1">Add Ship</button>
      </form>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">IMO Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Arrival Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location (Lat, Lng)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {ships.map((ship) => (
            <tr key={ship._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{ship.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{ship.imoNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(ship.arrivalTime).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{ship.lat}, {ship.lng}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  ship.status === "Docked" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                }`}>
                  {ship.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {/* Add any ship-specific actions here if needed */}
              </td>
            </tr>
          ))}
          {ships.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 italic">
                No ships available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Ships;