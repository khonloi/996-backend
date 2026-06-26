# 996 Market Backend

## Overview
The 996 Market Backend is a robust RESTful API built with NestJS. It serves as the core data engine for the e-commerce platform, managing the product catalog, categories, subcategories, and tagging systems.

## Technology Stack
*   **Framework**: NestJS
*   **Language**: TypeScript
*   **ORM**: TypeORM
*   **Database**: Configured via TypeORM (e.g., PostgreSQL or SQLite)

## Project Structure
The architecture follows a modular, domain-driven design standard in NestJS:
*   `/src/categories`: Manages top-level departments (e.g., Grocery, Electronics).
*   `/src/subcategories`: Manages nested groupings within departments.
*   `/src/products`: Manages product listings, pricing, and inventory counts.
*   `/src/tags`: Manages metadata tags for search and filtering.
*   `/src/seed.ts`: A utility script for populating the database with initial mock data.

## Getting Started

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm

### Installation
1. Navigate to the backend directory.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
The backend is configured to run on port 3000 by default. It must be running for the frontend to fetch data successfully.

*   **Development mode** (with hot-reload):
    ```bash
    npm run start:dev
    ```
*   **Production build**:
    ```bash
    npm run build
    npm run start:prod
    ```

### Database Seeding
To populate the database with initial product and category data, run the seed script:
```bash
npx ts-node src/seed.ts
```

## API Integration
The application has CORS enabled (`app.enableCors()`) to accept cross-origin requests from the Next.js frontend (running on port 3001). Standard REST endpoints are exposed for the primary entities:
*   `GET /categories` - Retrieves all departments.
*   `GET /products` - Retrieves the active product catalog.
