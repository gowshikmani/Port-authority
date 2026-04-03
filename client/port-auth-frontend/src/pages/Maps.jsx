import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from "axios";
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Maps() {
  const [docks, setDocks] = useState([]);
  const [ships, setShips] = useState([]);
  const [selectedPort, setSelectedPort] = useState('newyork');

  const ports = {
    newyork: { name: 'New York', lat: 40.7128, lng: -74.0060 },
    losangeles: { name: 'Los Angeles', lat: 33.7182, lng: -118.2893 },
    london: { name: 'London', lat: 51.5074, lng: -0.1278 },
    tokyo: { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    singapore: { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
    rotterdam: { name: 'Rotterdam', lat: 51.9244, lng: 4.4777 },
    shanghai: { name: 'Shanghai', lat: 31.2304, lng: 121.4737 },
    dubai: { name: 'Dubai', lat: 25.2048, lng: 55.2708 }
  };

  const fetchData = async () => {
    const docksRes = await axios.get("http://localhost:5000/api/docks");
    const shipsRes = await axios.get("http://localhost:5000/api/ships");
    setDocks(docksRes.data);
    setShips(shipsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get position: use real GPS if available, else mock relative to selected port
  const getPosition = (item, type) => {
    if (item.location && item.location.lat && item.location.lng) {
      return [item.location.lat, item.location.lng];
    }
    // Fallback to mock
    const port = ports[selectedPort];
    const offset = type === 'dock' ? docks.indexOf(item) * 0.005 : ships.indexOf(item) * 0.005;
    return [port.lat + offset, port.lng + offset];
  };

  const currentPort = ports[selectedPort];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Port Map</h1>

      {/* Port Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Port Location
        </label>
        <select
          value={selectedPort}
          onChange={(e) => setSelectedPort(e.target.value)}
          className="border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-600"
        >
          {Object.entries(ports).map(([key, port]) => (
            <option key={key} value={key}>{port.name}</option>
          ))}
        </select>
      </div>

      <div className="h-96 w-full">
        <MapContainer center={[currentPort.lat, currentPort.lng]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {docks.map((dock) => (
            <Marker key={dock._id} position={getPosition(dock, 'dock')}>
              <Popup>
                <div>
                  <h3>Dock {dock.dockNumber}</h3>
                  <p>Status: {dock.status}</p>
                  <p>Capacity: {dock.capacity}</p>
                  <p>Current Ships: {dock.currentShips.length}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {ships.map((ship) => (
            <Marker key={ship._id} position={getPosition(ship, 'ship')}>
              <Popup>
                <div>
                  <h3>Ship {ship.name}</h3>
                  <p>IMO: {ship.imoNumber}</p>
                  <p>Status: {ship.status}</p>
                  <p>Arrival: {new Date(ship.arrivalTime).toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Maps;