function ShipmentList({
  shipments,
  selectedShipment,
  onSelectShipment,
}) {
  return (
    <div className="shipment-list">
      <h2>Shipments</h2>

      {shipments.length === 0 ? (
        <p>No shipments found.</p>
      ) : (
        shipments.map((shipment) => (
          <div
            key={shipment.id}
            className={`shipment-card ${
              selectedShipment?.id === shipment.id ? "selected" : ""
            }`}
            onClick={() => onSelectShipment(shipment)}
          >
            <div>
              <strong>{shipment.reference_number}</strong>

              <p>
                {shipment.origin} → {shipment.destination}
              </p>
            </div>

            <span className="status">
              {shipment.current_status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default ShipmentList;