const pool = require("../db");

// Create a new shipment
const createShipment = async (req, res) => {
  try {
    const {
      reference_number,
      origin,
      destination,
      expected_delivery_date,
    } = req.body;

    if (
      !reference_number ||
      !origin ||
      !destination ||
      !expected_delivery_date
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const shipmentResult = await pool.query(
      `INSERT INTO shipments
       (reference_number, origin, destination, current_status, expected_delivery_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        reference_number,
        origin,
        destination,
        "Booked",
        expected_delivery_date,
      ]
    );

    const shipment = shipmentResult.rows[0];

    // Add initial status to history
    await pool.query(
      `INSERT INTO shipment_history (shipment_id, status)
       VALUES ($1, $2)`,
      [shipment.id, "Booked"]
    );

    res.status(201).json(shipment);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Reference number already exists",
      });
    }

    res.status(500).json({
      message: "Failed to create shipment",
    });
  }
};

// Get all shipments
const getShipments = async (req, res) => {
  try {
    const { status, reference } = req.query;

    let query = `
      SELECT *
      FROM shipments
      WHERE 1 = 1
    `;

    const values = [];

    if (status) {
      values.push(status);
      query += ` AND current_status = $${values.length}`;
    }

    if (reference) {
      values.push(`%${reference}%`);
      query += ` AND reference_number ILIKE $${values.length}`;
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch shipments",
    });
  }
};

// Get one shipment
const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM shipments WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Shipment not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch shipment",
    });
  }
};

// Update shipment status
const updateShipmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Booked",
      "Picked Up",
      "In Transit",
      "Customs Hold",
      "Out for Delivery",
      "Delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid shipment status",
      });
    }

    const shipmentResult = await pool.query(
      `UPDATE shipments
       SET current_status = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (shipmentResult.rows.length === 0) {
      return res.status(404).json({
        message: "Shipment not found",
      });
    }

    // Record status change
    await pool.query(
      `INSERT INTO shipment_history (shipment_id, status)
       VALUES ($1, $2)`,
      [id, status]
    );

    res.json(shipmentResult.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update shipment status",
    });
  }
};

// Get shipment history
const getShipmentHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const shipmentResult = await pool.query(
      `SELECT id FROM shipments WHERE id = $1`,
      [id]
    );

    if (shipmentResult.rows.length === 0) {
      return res.status(404).json({
        message: "Shipment not found",
      });
    }

    const result = await pool.query(
      `SELECT *
       FROM shipment_history
       WHERE shipment_id = $1
       ORDER BY changed_at ASC`,
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch shipment history",
    });
  }
};

module.exports = {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipmentStatus,
  getShipmentHistory,
};