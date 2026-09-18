const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");
const shipmentRoutes = require("./routes/shipmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shipments", shipmentRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Nagarkot Shipment Tracker API is running",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      status: "OK",
      database: "Connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "ERROR",
      database: "Disconnected",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});