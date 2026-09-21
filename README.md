# ENACO Retail

[![Tests](https://github.com/MduForCa/enaco_retail/actions/workflows/test.yml/badge.svg)](https://github.com/MduForCa/enaco_retail/actions/workflows/test.yml)
[![Build](https://github.com/MduForCa/enaco_retail/actions/workflows/build.yml/badge.svg)](https://github.com/MduForCa/enaco_retail/actions/workflows/build.yml)

A retail point-of-sale and inventory management application for small and medium-sized retail businesses.

Built as a practical full-stack engineering project — covering requirements, API design, database modelling, frontend development, automated testing, containerization, and CI/CD.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Python · Django · Django REST Framework |
| **Database** | PostgreSQL |
| **Frontend** | React · TypeScript · Vite |
| **DevOps** | Docker · Docker Compose · GitHub Actions |

---

## Architecture

All services run in Docker containers via Docker Compose.

---

## Features

- Product management (create, list, retrieve)
- Product SKU and barcode identification
- Inventory management with stock transactions
- Stock receipts and sales processing
- Automatic stock reduction after sales
- REST API with serialization and validation
- PostgreSQL persistence with referential integrity
- Automated tests (pytest) with 35 passing tests
- CI/CD pipeline (GitHub Actions)
- Dockerized backend and database environment

---

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local frontend development)

### 1. Clone the repository

```bash
git clone https://github.com/MduForCa/enaco_retail.git
cd enaco_retail

