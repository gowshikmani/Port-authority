import { useEffect, useState } from "react";
import axios from "axios";

function Timeline() {
  const [ships, setShips] = useState([]);

  const fetchShips = async () => {
    const res = await axios.get("http://localhost:5000/api/ships");
    // Sort by arrivalTime descending (most recent first)
    const sorted = res.data.sort((a, b) => new Date(b.arrivalTime) - new Date(a.arrivalTime));
    setShips(sorted);
  };

  useEffect(() => {
    fetchShips();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Ship Timeline</h1>

      <div className="space-y-4">
        {ships.map((ship, index) => (
          <div key={ship._id} className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              {index < ships.length - 1 && <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600"></div>}
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white">{ship.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">IMO: {ship.imoNumber}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Arrival: {new Date(ship.arrivalTime).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;