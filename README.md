# ENACO Retail

![Tests](https://github.com/MduForCa/enaco_retail/actions/workflows/test.yml/badge.svg)
![Build](https://github.com/MduForCa/enaco_retail/actions/workflows/build.yml/badge.svg)

# ENACO Retail

ENACO Retail is a retail point-of-sale and inventory management application designed for small and medium-sized retail businesses.

The project is being developed as a practical full-stack software engineering project, covering business requirements, application development, database design, API development, frontend development, containerization, and version control.

## Technology Stack

### Backend

* Python
* Django
* Django REST Framework
* PostgreSQL

### Frontend

* React
* TypeScript
* Vite

### Infrastructure & Development

* Docker
* Docker Compose
* Git
* GitHub

## Current Features

* Product management
* Product SKU and barcode identification
* Inventory management
* Stock receipts
* Sales processing
* Automatic stock reduction after sales
* REST API
* PostgreSQL persistence
* Dockerized backend and database environment

## Application Architecture

```text
React / TypeScript Frontend
            │
            │ HTTP / REST API
            ▼
     Django REST Framework
            │
            ▼
        PostgreSQL
```

The backend and PostgreSQL database run in Docker containers. The React frontend currently runs separately during development.

## Project Structure

```text
enaco_retail/
│
├── backend/
│   ├── products/
│   ├── inventory/
│   ├── sales/
│   ├── manage.py
│   ├── Dockerfile
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── compose.yaml
├── .gitignore
└── README.md
```

## Running the Backend

Clone the repository:

```bash
git clone https://github.com/MduForCa/enaco_retail.git
cd enaco_retail
```

Create the environment configuration required by Docker Compose.

The project expects database configuration similar to:

```text
DB_NAME=enaco_retail
DB_USER=...
DB_PASSWORD=...
```

Start the backend and PostgreSQL:

```bash
docker compose up --build
```

The Django API will be available at:

```text
http://localhost:8000/
```

## Frontend

From the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will provide the frontend address in the terminal.

## Development Approach

The project is being developed incrementally around real retail workflows rather than as a collection of isolated coding exercises.

The development process includes:

* Translating business requirements into application functionality
* Designing database models and relationships
* Implementing business logic in the backend
* Exposing functionality through REST APIs
* Building the user interface with React
* Containerizing application infrastructure
* Using Git for source control and change tracking
* Testing functionality throughout development

## Planned Development

Future areas include:

* Cashier-focused POS interface
* Barcode-based product entry
* Cart and checkout workflow
* Cash, card and mobile-money payment handling
* Supervisor authorization for selected POS actions
* Sales reporting and analytics
* User and role management
* Improved deployment and production configuration
* Automated testing and CI/CD

## Status

**Active development**

ENACO Retail is a portfolio and product-development project and is evolving as functionality and engineering practices are added.
