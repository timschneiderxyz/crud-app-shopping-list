<h1 align="center">CRUD-App - Shopping List</h1>

<p align="center">
  A modern full-stack shopping list application with complete CRUD functionality, powered by Astro, TypeScript, React, Express and MongoDB.
</p>

<p align="center">
  <a aria-label="Apache 2.0 License" href="https://github.com/timschneiderxyz/crud-app-shopping-list/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-apache 2.0-7aa2f7?style=for-the-badge&labelColor=1a1b26" alt="Apache 2.0 License">
  </a>
</p>

## Tech Stack

**Frontend:** Astro, Tailwind CSS, TypeScript, React

**Backend:** Express, TypeScript, MongoDB

**Development Tools:** Node.js, pnpm, Docker, Biome

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (Version 22 or higher)
- pnpm
- Docker
- Make

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone git@github.com:timschneiderxyz/crud-app-shopping-list.git
   cd crud-app-shopping-list
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development environment:**
   ```bash
   make dev
   ```

This command will:
- Start a MongoDB Docker container
- Launch both frontend and backend in development mode
- Automatically stop the MongoDB container when you stop the development servers

The application will be available at:
- Frontend: [http://localhost:4321](http://localhost:4321)
- Backend: [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `make dev` - Start MongoDB container and both frontend and backend in development mode
- `make clean` - Remove all node_modules and build artifacts
- `make nuke` - Clean everything and reinstall dependencies
- `pnpm dev` - Start both frontend and backend in development mode
- `pnpm build` - Build both frontend and backend for production
- `pnpm format` - Format code with Biome
- `pnpm lint` - Lint code with Biome
- `pnpm check` - Format and Lint code with Biome

**Frontend**
- `pnpm --filter frontend dev` - Start frontend in development mode
- `pnpm --filter frontend build` - Build frontend for production
- `pnpm --filter frontend preview` - Preview production build

**Backend**
- `pnpm --filter backend dev` - Start backend in development mode
- `pnpm --filter backend build` - Build backend for production
- `pnpm --filter backend start` - Start production backend server


## Environment Variables

### Frontend

| **Variable**  | **Default Value**       | **Description** |
|:--------------|:------------------------|:----------------|
| `BACKEND_URL` | `http://localhost:3000` | Backend URL     |

### Backend

| **Variable**   | **Default Value**                                                            | **Description**             |
|:---------------|:-----------------------------------------------------------------------------|:----------------------------|
| `EXPRESS_PORT` | `3000`                                                                       | Port for the Express server |
| `FRONTEND_URL` | `http://localhost:4321`                                                      | Frontend URL                |
| `MONGODB_URI`  | `mongodb://mongouser:mongopw@localhost:27017/shopping-list?authSource=admin` | MongoDB connection string   |
