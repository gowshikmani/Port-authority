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

  // Fetch cargo
  const fetchCargo = async () => {
    const res = await axios.get("http://localhost:5000/api/cargo");
    setCargoList(res.data);
  };

  // Fetch ships
  const fetchShips = async () => {
    const res = await axios.get("http://localhost:5000/api/ships");
    setShips(res.data);
  };

  useEffect(() => {
    fetchCargo();
    fetchShips();
  }, []);

  // Add cargo
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/cargo", form);
    fetchCargo();
  };

  // Update status
  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/cargo/${id}/status`, {
      status
    });

    fetchCargo();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cargo Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          placeholder="Type"
          className="border p-2"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />

        <input
          placeholder="Weight"
          type="number"
          className="border p-2"
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
        />

        <select
          className="border p-2"
          onChange={(e) => setForm({ ...form, shipId: e.target.value })}
        >
          <option>Select Ship</option>
          {ships.map((ship) => (
            <option key={ship._id} value={ship._id}>
              {ship.name}
            </option>
          ))}
        </select>

        <button className="bg-green-500 text-white px-4">
          Add Cargo
        </button>
      </form>

      {/* Table */}
      <div className="bg-white p-4 shadow rounded">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Type</th>
              <th className="p-2">Weight</th>
              <th className="p-2">Ship</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {cargoList.map((cargo) => (
              <tr key={cargo._id} className="border-t text-center">
                <td className="p-2">{cargo.type}</td>
                <td className="p-2">{cargo.weight}</td>
                <td className="p-2">{cargo.ship?.name}</td>
                <td className="p-2">{cargo.status}</td>

                <td className="p-2">
                  <select
                    onChange={(e) =>
                      updateStatus(cargo._id, e.target.value)
                    }
                    className="border p-1"
                  >
                    <option>Update</option>
                    <option value="Loading">Loading</option>
                    <option value="Unloading">Unloading</option>
                    <option value="Stored">Stored</option>
                    <option value="Dispatched">Dispatched</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cargo;