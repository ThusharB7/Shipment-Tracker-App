import { useEffect, useState } from "react";
import ShipmentForm from "./components/ShipmentForm";
import ShipmentList from "./components/ShipmentList";
import ShipmentDetails from "./components/ShipmentDetails";
import { getShipments } from "./services/shipmentService";

function App() {
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadShipments = async () => {
    try {
      const data = await getShipments({
        reference: search,
        status: statusFilter,
      });

      setShipments(data);
    } catch (error) {
      console.error("Failed to load shipments:", error);
    }
  };

  useEffect(() => {
    loadShipments();
  }, []);

  const handleShipmentCreated = (shipment) => {
    setShipments((previous) => [shipment, ...previous]);
    setSelectedShipment(shipment);
  };

  const handleStatusUpdated = (updatedShipment) => {
    setShipments((previous) =>
      previous.map((shipment) =>
        shipment.id === updatedShipment.id
          ? updatedShipment
          : shipment
      )
    );

    setSelectedShipment(updatedShipment);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await loadShipments();
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Shipment Status Tracker</h1>
          <p>Track shipments from booking to delivery.</p>
        </div>
      </header>

      <main className="container">
        <ShipmentForm
          onShipmentCreated={handleShipmentCreated}
        />

        <div className="filters">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search reference number..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="">All Statuses</option>
              <option value="Booked">Booked</option>
              <option value="Picked Up">Picked Up</option>
              <option value="In Transit">In Transit</option>
              <option value="Customs Hold">Customs Hold</option>
              <option value="Out for Delivery">
                Out for Delivery
              </option>
              <option value="Delivered">Delivered</option>
            </select>

            <button type="submit">Search</button>
          </form>
        </div>

        <div className="content">
          <ShipmentList
            shipments={shipments}
            selectedShipment={selectedShipment}
            onSelectShipment={setSelectedShipment}
          />

          {selectedShipment ? (
            <ShipmentDetails
              shipment={selectedShipment}
              onStatusUpdated={handleStatusUpdated}
            />
          ) : (
            <div className="empty-state">
              <h2>Select a shipment</h2>
              <p>
                Choose a shipment from the list to view its
                details and history.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;