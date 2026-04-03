# Port Authority Server

Backend API for Port Authority Management System

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas URI)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/port-authority
NODE_ENV=development
```

3. Start MongoDB:
```bash
# For local MongoDB
mongod
```

4. Start the server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will be available at `http://localhost:5000`

## Health Check

```bash
curl http://localhost:5000/health
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Ships
- `GET /api/ships` - Get all ships
- `POST /api/ships` - Create new ship

### Cargo
- `GET /api/cargo` - Get all cargo
- `POST /api/cargo` - Add new cargo
- `PUT /api/cargo/:id/status` - Update cargo status

### Docks
- `POST /api/docks/assign` - Assign ship to dock
- `POST /api/docks/remove` - Remove ship from dock

### Containers
- `GET /api/containers` - Get all containers
- `POST /api/containers` - Add new container
- `PUT /api/containers/:id/location` - Update container location

## Database Models

- **User** - Authentication user
- **Ship** - Port ships with cargo weight tracking
- **Cargo** - Cargo items with status and ship reference
- **Dock** - Dock facilities with ship assignments
- **Container** - Containers with location tracking
