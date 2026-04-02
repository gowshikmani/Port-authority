import { useEffect, useState } from "react";
import axios from "axios";

function Ships() {
  const [ships, setShips] = useState([]);
  const [form, setForm] = useState({
    name: "",
    imoNumber: "",
    arrivalTime: ""
  });

  // Fetch ships
  const fetchShips = async () => {
    const res = await axios.get("http://localhost:5000/api/ships");
    setShips(res.data);
  };

  useEffect(() => {
    const load = async () => {
      await fetchShips();
    };

    load();
  }, []);

  // Add ship
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/ships", form);
      setForm({ name: "", imoNumber: "", arrivalTime: "" });
      fetchShips();
    } catch (error) {
      console.error("Failed to add ship", error);
      alert("Failed to add ship. Check console for details.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ships</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="IMO"
          className="border p-2"
          value={form.imoNumber}
          onChange={(e) => setForm({ ...form, imoNumber: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2"
          value={form.arrivalTime}
          onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4">Add</button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">IMO</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {ships.map((ship) => (
            <tr key={ship._id} className="text-center border-t">
              <td className="p-2">{ship.name}</td>
              <td className="p-2">{ship.imoNumber}</td>
              <td className="p-2">{ship.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ships;