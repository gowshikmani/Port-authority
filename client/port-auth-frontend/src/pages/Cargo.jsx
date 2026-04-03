import { useEffect, useState } from "react";
import axios from "axios";

function Cargo() {
  const [cargoList, setCargoList] = useState([]);
  const [ships, setShips] = useState([]);

  const [form, setForm] = useState({
    type: "",
    weight: "",
    shipId: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch cargo
  const fetchCargo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cargo");
      setCargoList(res.data);
    } catch (err) {
      setError("Failed to fetch cargo list.");
      console.error("Error fetching cargo:", err);
    }
  };

  // Fetch ships
  const fetchShips = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ships");
      setShips(res.data);
    } catch (err) {
      setError("Failed to fetch ships.");
      console.error("Error fetching ships:", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        await Promise.all([fetchCargo(), fetchShips()]);
      } catch (err) {
        setError("Failed to load initial data.");
        console.error("Error loading initial cargo data:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Add cargo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        type: form.type.trim(),
        weight: Number(form.weight),
        shipId: form.shipId
      };

      if (!payload.type || !payload.weight || !payload.shipId) {
        setError("Please fill all cargo fields.");
        return;
      }

      await axios.post("http://localhost:5000/api/cargo", payload);
      setForm({ type: "", weight: "", shipId: "" });
      await fetchCargo();
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.error || "Failed to add cargo.");
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    if (!status || status === "Update") return;
    setError("");

    try {
      await axios.put(`http://localhost:5000/api/cargo/${id}/status`, {
        status
      });
      await fetchCargo();
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.error || "Failed to update status.");
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
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Cargo Management</h1>

      {error && <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded">{error}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl mb-6 flex flex-col md:flex-row gap-4 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700">
        <input
          placeholder="Type"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
        />

        <input
          placeholder="Weight"
          type="number"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
          required
          min={1}
        />

        <select
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          value={form.shipId}
          onChange={(e) => setForm({ ...form, shipId: e.target.value })}
          required
        >
          <option value="" disabled>
            Select Ship
          </option>
          {ships.map((ship) => (
            <option key={ship._id} value={ship._id}>
              {ship.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Add Cargo
        </button>
      </form>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Weight (kg)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ship</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {cargoList.map((cargo) => (
              <tr key={cargo._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{cargo.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{cargo.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{cargo.ship?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    cargo.status === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                    cargo.status === "Loading" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                    cargo.status === "Unloading" ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" :
                    cargo.status === "Stored" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}>
                    {cargo.status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <select
                    onChange={(e) =>
                      updateStatus(cargo._id, e.target.value)
                    }
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Update
                    </option>
                    <option value="Loading">Loading</option>
                    <option value="Unloading">Unloading</option>
                    <option value="Stored">Stored</option>
                    <option value="Dispatched">Dispatched</option>
                  </select>
                </td>
              </tr>
            ))}
            {cargoList.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 italic">
                  No cargo available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cargo;