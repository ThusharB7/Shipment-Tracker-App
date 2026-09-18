Yep mate. **This time: one single code block containing the ENTIRE README.** Copy everything **inside** the outer block and paste it into GitHub's `README.md` editor. Do **not** copy the first/last ` ``` `.

````markdown
# Nagarkot Shipment Status Tracker

A full-stack shipment tracking application built as a technical assessment for Nagarkot Forwarders Pvt. Ltd.

The application allows users to create shipments, view and search shipments, filter them by status, update shipment status, and view the complete status history of a shipment.

## Live Demo

- **Frontend:** https://shipment-tracker-app-57cl.vercel.app/
- **Backend API:** https://shipment-tracker-app.onrender.com/

## Repository

- **GitHub:** https://github.com/ThusharB7/Shipment-Tracker-App

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
- Responsive dashboard interface

---

## Tech Stack

### Frontend

- **React** — Used to build the interactive shipment tracking interface with reusable components.
- **Vite** — Provides a fast development and build setup for the React application.
- **JavaScript** — Used for the frontend implementation.
- **Axios** — Used for communication between the frontend and backend REST API.
- **React Router** — Included for client-side routing and future expansion.
- **CSS** — Used for responsive dashboard styling.

### Backend

- **Node.js** — Provides the JavaScript runtime for the backend.
- **Express.js** — Used to build the REST API with routing and controller separation.
- **PostgreSQL** — Used as the relational database for shipments and shipment history.
- **pg** — PostgreSQL client used by the Node.js backend.
- **CORS** — Allows the separately deployed frontend to communicate with the backend API.
- **dotenv** — Used to manage environment-specific configuration and database credentials.

### Deployment

- **Vercel** — Used to deploy the React/Vite frontend.
- **Render** — Used to deploy the Node.js/Express backend.
- **Render PostgreSQL** — Used as the production database.

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
````

---

## Project Structure

```text
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
```

---

## Database Design

The application uses PostgreSQL with two main tables.

### `shipments`

Stores the current state and main information for each shipment.

| Column                   | Description                      |
| ------------------------ | -------------------------------- |
| `id`                     | Unique shipment ID               |
| `reference_number`       | Unique shipment reference number |
| `origin`                 | Shipment origin                  |
| `destination`            | Shipment destination             |
| `current_status`         | Current shipment status          |
| `expected_delivery_date` | Expected delivery date           |
| `created_at`             | Shipment creation timestamp      |
| `updated_at`             | Last update timestamp            |

### `shipment_history`

Stores every status change associated with a shipment.

| Column        | Description                   |
| ------------- | ----------------------------- |
| `id`          | Unique history record ID      |
| `shipment_id` | ID of the related shipment    |
| `status`      | Status recorded at that point |
| `changed_at`  | Status change timestamp       |

### Relationship

```text
shipments
    │
    │ 1
    │
    │ many
    ▼
shipment_history
```

Each shipment can have multiple history records.

The `shipment_id` column is a foreign key referencing the `shipments` table with `ON DELETE CASCADE`.

---

## Shipment Statuses

The application supports the following shipment statuses:

1. Booked
2. Picked Up
3. In Transit
4. Customs Hold
5. Out for Delivery
6. Delivered

A newly created shipment starts with the `Booked` status.

Every status update is recorded in the shipment history.

---

## API Endpoints

### Create Shipment

```http
POST /api/shipments
```

Example request:

```json
{
  "reference_number": "NKG-10001",
  "origin": "Mumbai",
  "destination": "Delhi",
  "expected_delivery_date": "2026-09-25"
}
```

### List Shipments

```http
GET /api/shipments
```

Optional query parameters can be used for searching and filtering.

Search by reference number:

```http
GET /api/shipments?reference=NKG-10001
```

Filter by status:

```http
GET /api/shipments?status=In%20Transit
```

Both filters can be used together:

```http
GET /api/shipments?reference=NKG&status=In%20Transit
```

### Get Shipment

```http
GET /api/shipments/:id
```

Example:

```http
GET /api/shipments/1
```

### Update Shipment Status

```http
PATCH /api/shipments/:id/status
```

Example request:

```json
{
  "status": "In Transit"
}
```

### Get Shipment History

```http
GET /api/shipments/:id/history
```

Example:

```http
GET /api/shipments/1/history
```

Returns the shipment's status changes in chronological order.

### Health Check

```http
GET /api/health
```

This endpoint verifies that the backend is running and can successfully connect to PostgreSQL.

---

## Steps to Run the Project Locally

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* PostgreSQL
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/ThusharB7/Shipment-Tracker-App.git
cd Shipment-Tracker-App
```

### 2. Set Up the Database

Create a PostgreSQL database named:

```text
nagarkot_tracker
```

Run the SQL commands from:

```text
backend/schema.sql
```

This creates the required tables:

* `shipments`
* `shipment_history`

### 3. Set Up the Backend

Open a terminal in the project root:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=nagarkot_tracker
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

Start the backend:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 4. Set Up the Frontend

Open a second terminal in the project root:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api/shipments
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

### 5. Open the Application

Open the following URL in your browser:

```text
http://localhost:5173
```

The frontend communicates with the backend through the REST API, while the backend connects to the PostgreSQL database.

---

## Environment Variables

### Backend

#### Local Development

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=nagarkot_tracker
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

#### Production

```env
DATABASE_URL=your_postgresql_connection_string
```

### Frontend

#### Local Development

```env
VITE_API_URL=http://localhost:5000/api/shipments
```

#### Production

```env
VITE_API_URL=https://shipment-tracker-app.onrender.com/api/shipments
```

### Environment Variable Security

Environment files containing secrets are excluded from Git using `.gitignore`.

A `.env.example` file is included to show the required environment variable structure without exposing actual credentials.

---

## Data Assumptions

* Shipment reference numbers are unique.
* Every shipment requires a reference number, origin, destination, and expected delivery date.
* A newly created shipment starts with the `Booked` status.
* Creating a shipment creates an initial `Booked` history record.
* Every status update creates a new history record.
* Shipment history is displayed chronologically.
* Status values are limited to the supported shipment statuses.
* Authentication and role-based access are not included because they are outside the scope of the assessment.
* The application assumes valid shipment information is provided by the user.

---

## Design Decisions

### Separate Current Status and History

The current status is stored directly in the `shipments` table.

This makes listing, filtering, and displaying the current shipment state straightforward.

A separate `shipment_history` table stores each status change so the application can provide a complete shipment timeline.

### REST API

The backend exposes separate REST endpoints for shipment creation, retrieval, status updates, searching/filtering, and history retrieval.

This keeps the frontend independent from the database implementation.

### Environment-Based Configuration

Database credentials and API URLs are provided through environment variables rather than being hardcoded into the application.

This allows the same codebase to be used for both local development and production deployment.

---

## Scaling Considerations

If this application needed to support 10,000 shipments and multiple concurrent users, I would first improve the database and API layer to handle larger workloads efficiently.

---

## Deployment

The application is deployed as separate frontend and backend services.

### Frontend

The React/Vite frontend is deployed using Vercel.

**Live URL:**

[https://shipment-tracker-app-57cl.vercel.app/](https://shipment-tracker-app-57cl.vercel.app/)

### Backend

The Node.js/Express REST API is deployed using Render.

**Live URL:**

[https://shipment-tracker-app.onrender.com/](https://shipment-tracker-app.onrender.com/)

### Database

The production PostgreSQL database is hosted using Render PostgreSQL.

The frontend communicates with the backend through the deployed REST API, while the backend communicates with PostgreSQL.

---

## Production Architecture

```text
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
```

---

## Security Notes

* Database credentials are stored using environment variables.
* `.env` files are excluded from version control.
* Production database credentials are not stored in the source code.
* The frontend only communicates with the backend API and does not directly access the database.

---

## Git Workflow

The project was developed using Git with incremental commits during implementation.

Major development stages were committed separately, including the initial implementation, backend deployment preparation, frontend API configuration, and project documentation.

---

## Author

**ThusharB7**

Technical Assessment — Nagarkot Forwarders Pvt. Ltd.

