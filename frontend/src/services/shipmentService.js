import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/shipments";
  
export const getShipments = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const createShipment = async (shipment) => {
  const response = await axios.post(API_URL, shipment);
  return response.data;
};

export const getShipment = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateShipmentStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/${id}/status`, {
    status,
  });
  return response.data;
};

export const getShipmentHistory = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/history`);
  return response.data;
};