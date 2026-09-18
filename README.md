# Nagarkot Shipment Status Tracker

A full-stack shipment tracking application built as a technical assessment for Nagarkot Forwarders Pvt. Ltd.

The application allows users to create shipments, view and search shipments, filter them by status, update shipment status, and view the complete status history of a shipment.

## Live Demo

- Frontend: (https://shipment-tracker-app-57cl.vercel.app/)
- Backend API: (https://shipment-tracker-app.onrender.com/)

---

## Features

- Create a new shipment
- View all shipments
- Search shipments by reference number
- Filter shipments by current status
- View shipment details
- Update shipment status
- View chronological shipment status history
- Persistent PostgreSQL database
- Separate frontend and backend deployments
- REST API architecture

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Axios
- React Router
- CSS

### Backend

- Node.js
- Express.js
- JavaScript
- PostgreSQL
- `pg`
- CORS
- dotenv

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## Architecture

```text
                    ┌──────────────────────┐
                    │      React + Vite    │
                    │       Frontend       │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │    Node + Express    │
                    │      Backend API     │
                    │        Render        │
                    └──────────┬───────────┘
                               │
                               │ SQL
                               ▼
                    ┌──────────────────────┐
                    │   PostgreSQL         │
                    │   Render Database    │
                    └──────────────────────┘
