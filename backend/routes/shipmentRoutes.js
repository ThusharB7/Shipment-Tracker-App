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

// History route must come before /:id
router.get("/:id/history", getShipmentHistory);

router.get("/:id", getShipmentById);

router.patch("/:id/status", updateShipmentStatus);

module.exports = router;