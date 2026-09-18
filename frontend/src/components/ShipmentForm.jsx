import { useState } from "react";
import { createShipment } from "../services/shipmentService";

function ShipmentForm({ onShipmentCreated }) {
  const [formData, setFormData] = useState({
    reference_number: "",
    origin: "",
    destination: "",
    expected_delivery_date: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const shipment = await createShipment(formData);

      onShipmentCreated(shipment);

      setFormData({
        reference_number: "",
        origin: "",
        destination: "",
        expected_delivery_date: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create shipment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Create Shipment</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="reference_number"
          placeholder="Reference Number"
          value={formData.reference_number}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="origin"
          placeholder="Origin"
          value={formData.origin}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="expected_delivery_date"
          value={formData.expected_delivery_date}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Shipment"}
        </button>
      </form>
    </div>
  );
}

export default ShipmentForm;