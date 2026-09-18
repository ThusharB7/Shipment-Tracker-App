const express = require("express");

const {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipmentStatus,
  getShipmentHistory,
} = require("../controllers/shipmentController");

const router = express.Router();

router.post("/", createShipment);

router.get("/", getShipments);

router.get("/:id", getShipmentById);

router.patch("/:id/status", updateShipmentStatus);

router.get("/:id/history", getShipmentHistory);

module.exports = router;