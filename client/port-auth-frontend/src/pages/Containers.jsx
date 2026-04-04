import { useEffect, useState } from "react";
import axios from "axios";

function Containers() {
  const [containers, setContainers] = useState([]);
  const [cargoList, setCargoList] = useState([]);

  const [form, setForm] = useState({
    containerId: "",
    weight: "",
    cargoId: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch containers
  const fetchContainers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/containers");
      setContainers(res.data);
    } catch (err) {
      setError("Failed to fetch containers.");
      console.error("Error fetching containers:", err);
    }
  };

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

  useEffect(() => {
    const load = async () => {
      try {
        await Promise.all([fetchContainers(), fetchCargo()]);
      } catch (err) {
        setError("Failed to load initial data.");
        console.error("Error loading initial container data:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this container?")) return;
    setError("");
    try {
      await axios.delete(`http://localhost:5000/api/containers/${id}`);
      fetchContainers();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to delete container.");
      console.error("Failed to delete container:", err);
    }
  };

  // Add container
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.containerId || !form.weight || !form.cargoId) {
      setError("Please fill all fields for the container.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/containers", form);
      setForm({ containerId: "", weight: "", cargoId: "" }); // Clear form
      await fetchContainers();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to add container.");
      console.error("Error adding container:", err);
    }
  };

  // Update location
  const updateLocation = async (id, location) => {
    setError("");
    try {
      await axios.put(
        `http://localhost:5000/api/containers/${id}/location`,
        { location }
      );
      await fetchContainers();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to update container location.");
      console.error("Error updating location:", err);
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
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Container Management</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl mb-6 flex flex-col md:flex-row gap-4 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700">
        <input
          placeholder="Container ID"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          onChange={(e) =>
            setForm({ ...form, containerId: e.target.value })
          }
          value={form.containerId}
          required
        />

        <input
          placeholder="Weight"
          type="number"
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          onChange={(e) =>
            setForm({ ...form, weight: e.target.value })
          }
          value={form.weight}
          required
          min="1"
        />

        <select
          className="border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700"
          onChange={(e) =>
            setForm({ ...form, cargoId: e.target.value })
          }
          value={form.cargoId}
          required
        >
          <option value="" disabled>Select Cargo</option>
          {cargoList.map((cargo) => (
            <option key={cargo._id} value={cargo._id}>
              {cargo.type} ({cargo.ship?.name})
            </option>
          ))}
        </select>

        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Add Container
        </button>
      </form>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Container ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Weight (kg)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cargo Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ship</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Move To</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {containers.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{c.containerId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{c.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{c.cargo?.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {c.cargo?.type} ({c.cargo?.ship?.name})
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{c.location}</td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex gap-2">
                    <select
                      onChange={(e) =>
                        updateLocation(c._id, e.target.value)
                      }
                      className="flex-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600"
                      value={c.location || "Move"}
                    >
                      <option value="" disabled>Move</option>
                      <option value="Ship">Ship</option>
                      <option value="Dock">Dock</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="Truck">Truck</option>
                    </select>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium px-2 py-1 border rounded hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {containers.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 italic">
                  No containers available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Containers;