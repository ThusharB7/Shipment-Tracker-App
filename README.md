# Nagarkot Shipment Status Tracker

A full-stack shipment tracking application built as a technical assessment for Nagarkot Forwarders Pvt. Ltd.

The application allows users to create shipments, view and search shipments, filter them by status, update shipment status, and view the complete status history of a shipment.

## Live Demo

- **Frontend:** https://shipment-tracker-app-57cl.vercel.app/
- **Backend API:** https://shipment-tracker-app.onrender.com/

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
- REST API architecture
- Separate frontend and backend deployments
- Responsive and modern dashboard interface

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


Database Design

The application uses PostgreSQL with two main tables.

shipments

Stores the current state and main information for each shipment.

Column	Description
id	Unique shipment ID
reference_number	Unique shipment reference number
origin	Shipment origin
destination	Shipment destination
current_status	Current shipment status
expected_delivery_date	Expected delivery date
created_at	Shipment creation timestamp
updated_at	Last update timestamp
shipment_history

Stores every status change associated with a shipment.

Column	Description
id	Unique history record ID
shipment_id	ID of the related shipment
status	Status recorded at that point
changed_at	Status change timestamp


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
                    │      PostgreSQL      │
                    │    Render Database   │
                    └──────────────────────┘


