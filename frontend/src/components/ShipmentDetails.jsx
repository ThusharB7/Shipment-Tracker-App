import { useEffect, useState } from "react";
import {
  getShipmentHistory,
  updateShipmentStatus,
} from "../services/shipmentService";

const statuses = [
  "Booked",
  "Picked Up",
  "In Transit",
  "Customs Hold",
  "Out for Delivery",
  "Delivered",
];

function ShipmentDetails({ shipment, onStatusUpdated }) {
  const [history, setHistory] = useState([]);
  const [newStatus, setNewStatus] = useState(shipment.current_status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getShipmentHistory(shipment.id);
        setHistory(data);
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    };

    loadHistory();
  }, [shipment.id]);

  const handleStatusUpdate = async () => {
    if (newStatus === shipment.current_status) {
      return;
    }

    try {
      setLoading(true);

      const updatedShipment = await updateShipmentStatus(
        shipment.id,
        newStatus
      );

      onStatusUpdated(updatedShipment);

      const updatedHistory = await getShipmentHistory(shipment.id);
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-card">
      <h2>Shipment Details</h2>

      <div className="details">
        <p>
          <strong>Reference:</strong>{" "}
          {shipment.reference_number}
        </p>

        <p>
          <strong>Route:</strong>{" "}
          {shipment.origin} → {shipment.destination}
        </p>

        <p>
          <strong>Expected Delivery:</strong>{" "}
          {new Date(
            shipment.expected_delivery_date
          ).toLocaleDateString("en-IN")}
        </p>

        <p>
          <strong>Current Status:</strong>{" "}
          {shipment.current_status}
        </p>
      </div>

      <div className="status-update">
        <h3>Update Status</h3>

        <select
          value={newStatus}
          onChange={(event) => setNewStatus(event.target.value)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          onClick={handleStatusUpdate}
          disabled={loading || newStatus === shipment.current_status}
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </div>

      <div className="history">
        <h3>Status History</h3>

        {history.map((item) => (
          <div className="history-item" key={item.id}>
            <strong>{item.status}</strong>

            <span>
              {new Date(item.changed_at).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShipmentDetails;