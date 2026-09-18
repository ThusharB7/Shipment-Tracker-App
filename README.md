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
Project Structure
nagarkot-shipment-tracker/
│
├── backend/
│   ├── controllers/
│   │   └── shipmentController.js
│   │
│   ├── routes/
│   │   └── shipmentRoutes.js
│   │
│   ├── .env.example
│   ├── db.js
│   ├── schema.sql
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ShipmentForm.jsx
│   │   │   ├── ShipmentList.jsx
│   │   │   └── ShipmentDetails.jsx
│   │   │
│   │   ├── services/
│   │   │   └── shipmentService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
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
Relationship
shipments
    │
    │ 1
    │
    │ many
    ▼
shipment_history

Each shipment can have multiple history records.

The shipment_id column is a foreign key referencing the shipments table. History records are automatically removed when their associated shipment is deleted.

Shipment Statuses

The application supports the following shipment statuses:

Booked
Picked Up
In Transit
Customs Hold
Out for Delivery
Delivered

A newly created shipment starts with the Booked status.

Every status update is recorded in the shipment history.

API Endpoints
Create Shipment
POST /api/shipments

Example request:

{
  "reference_number": "NKG-10001",
  "origin": "Mumbai",
  "destination": "Delhi",
  "expected_delivery_date": "2026-09-25"
}
List Shipments
GET /api/shipments

Optional query parameters can be used for searching and filtering.

Search by reference number:

GET /api/shipments?reference=NKG-10001

Filter by status:

GET /api/shipments?status=In%20Transit

Both filters can be used together:

GET /api/shipments?reference=NKG&status=In%20Transit
Get Shipment
GET /api/shipments/:id

Example:

GET /api/shipments/1
Update Shipment Status
PATCH /api/shipments/:id/status

Example request:

{
  "status": "In Transit"
}
Get Shipment History
GET /api/shipments/:id/history

Example:

GET /api/shipments/1/history

Returns the shipment's status changes in chronological order.

Health Check
GET /api/health

This endpoint verifies that the backend is running and that it can successfully connect to PostgreSQL.

Local Setup
Prerequisites

Make sure the following are installed:

Node.js
npm
PostgreSQL
Git
1. Clone the Repository
git clone https://github.com/ThusharB7/Shipment-Tracker-App.git
cd Shipment-Tracker-App
2. Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file inside the backend directory:

PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=nagarkot_tracker
DB_PASSWORD=your_password
DB_PORT=5432

Create the PostgreSQL database:

CREATE DATABASE nagarkot_tracker;

Run the SQL commands in:

backend/schema.sql

This creates the required shipments and shipment_history tables.

Start the backend:

npm run dev

The backend will run at:

http://localhost:5000
3. Frontend Setup

Open another terminal and navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Create a .env file inside the frontend directory:

VITE_API_URL=http://localhost:5000/api/shipments

Start the frontend:

npm run dev

The frontend will normally be available at:

http://localhost:5173
Environment Variables
Backend

Local development:

PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=nagarkot_tracker
DB_PASSWORD=your_password
DB_PORT=5432

Production:

DATABASE_URL=your_postgresql_connection_string
Frontend

Local development:

VITE_API_URL=http://localhost:5000/api/shipments

Production:

VITE_API_URL=https://shipment-tracker-app.onrender.com/api/shipments

Environment files containing secrets are excluded from Git using .gitignore.

A .env.example file is included to show the required environment variable structure without exposing actual credentials.

Data Assumptions
Shipment reference numbers are unique.
Every shipment requires a reference number, origin, destination, and expected delivery date.
A newly created shipment starts with the Booked status.
Creating a shipment creates an initial Booked history record.
Every status update creates a new history record.
Shipment history is displayed chronologically.
Status values are limited to the supported shipment statuses.
Authentication and role-based access are not included because they are outside the scope of the assessment.
The application assumes valid shipment information is provided by the user.
Design Decisions
Separate Current Status and History

The current status is stored directly in the shipments table.

This makes listing, filtering, and displaying the current shipment state straightforward.

A separate shipment_history table stores each status change so the application can provide a complete shipment timeline.

REST API

The backend exposes separate REST endpoints for shipment creation, retrieval, status updates, searching/filtering, and history retrieval.

This keeps the frontend independent from the database implementation.

Environment-Based Configuration

Database credentials and API URLs are provided through environment variables rather than being hardcoded into the application.

This allows the same codebase to be used for both local development and production deployment.

Scaling Considerations

If the application were expanded for a larger production workload, several improvements could be introduced.

Database indexes could be added to frequently queried fields such as reference_number and current_status to improve search and filtering performance.

Pagination could be added to the shipment listing endpoint to avoid loading large datasets at once.

The PostgreSQL connection pool already helps manage database connections efficiently. Additional improvements could include structured logging, centralized error handling, stronger request validation, automated database migrations, rate limiting, caching, monitoring, and application-level metrics.

For a significantly larger shipment history dataset, additional indexing or partitioning strategies could be considered based on actual query patterns.

Deployment

The application is deployed as separate frontend and backend services.

Frontend

The React/Vite frontend is deployed using Vercel.

Live URL:

https://shipment-tracker-app-57cl.vercel.app/

Backend

The Node.js/Express REST API is deployed using Render.

Live URL:

https://shipment-tracker-app.onrender.com/

Database

The production PostgreSQL database is hosted using Render PostgreSQL.

The frontend communicates with the backend through the deployed REST API, while the backend communicates with PostgreSQL.

Production Architecture
User
 │
 ▼
Vercel
React + Vite
 │
 │ HTTPS REST API
 ▼
Render
Node.js + Express
 │
 │ PostgreSQL
 ▼
Render PostgreSQL
Running the Application

For local development, run the backend and frontend in separate terminals.

Backend
cd backend
npm run dev
Frontend
cd frontend
npm run dev

Then open:

http://localhost:5173
Security Notes
Database credentials are stored using environment variables.
.env files are excluded from version control.
Production database credentials are not stored in the source code.
The frontend only communicates with the backend API and does not directly access the database.
Author

Vinay

Technical Assessment — Nagarkot Forwarders Pvt. Ltd.


### Then commit it

After replacing your README:

```powershell
git add README.md
git commit -m "Add complete project documentation"
git push

Then:

git status

You want:

nothing to commit, working tree clean
