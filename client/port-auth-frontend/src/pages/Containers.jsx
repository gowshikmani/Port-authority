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

  // Fetch containers
  const fetchContainers = async () => {
    const res = await axios.get("http://localhost:5000/api/containers");
    setContainers(res.data);
  };

  // Fetch cargo
  const fetchCargo = async () => {
    const res = await axios.get("http://localhost:5000/api/cargo");
    setCargoList(res.data);
  };

  useEffect(() => {
    fetchContainers();
    fetchCargo();
  }, []);

  // Add container
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/containers", form);
    fetchContainers();
  };

  // Update location
  const updateLocation = async (id, location) => {
    await axios.put(
      `http://localhost:5000/api/containers/${id}/location`,
      { location }
    );

    fetchContainers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Container Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          placeholder="Container ID"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, containerId: e.target.value })
          }
        />

        <input
          placeholder="Weight"
          type="number"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, weight: e.target.value })
          }
        />

        <select
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, cargoId: e.target.value })
          }
        >
          <option>Select Cargo</option>
          {cargoList.map((cargo) => (
            <option key={cargo._id} value={cargo._id}>
              {cargo.type} ({cargo.ship?.name})
            </option>
          ))}
        </select>

        <button className="bg-purple-500 text-white px-4">
          Add Container
        </button>
      </form>

      {/* Table */}
      <div className="bg-white p-4 shadow rounded">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Container ID</th>
              <th className="p-2">Weight</th>
              <th className="p-2">Cargo</th>
              <th className="p-2">Location</th>
              <th className="p-2">Move</th>
            </tr>
          </thead>

          <tbody>
            {containers.map((c) => (
              <tr key={c._id} className="border-t text-center">
                <td className="p-2">{c.containerId}</td>
                <td className="p-2">{c.weight}</td>
                <td className="p-2">
                  {c.cargo?.type} ({c.cargo?.ship?.name})
                </td>
                <td className="p-2">{c.location}</td>

                <td className="p-2">
                  <select
                    onChange={(e) =>
                      updateLocation(c._id, e.target.value)
                    }
                    className="border p-1"
                  >
                    <option>Move</option>
                    <option value="Ship">Ship</option>
                    <option value="Dock">Dock</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Truck">Truck</option>
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

export default Containers;