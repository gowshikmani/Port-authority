# Port Authority Management System

A full-stack web application for managing port operations including ships, cargo, containers, and docks.

## 🏗️ Architecture

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Database**: MongoDB

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn

## 🚀 Quick Start

### 1. Setup Everything

```bash
npm run setup
```

This will install dependencies for root, server, and client.

### 2. Configure MongoDB

Create or update `.env` in the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/port-authority
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/port-authority
```

### 3. Start MongoDB

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

### 4. Run Development Servers

**Option A: Run both simultaneously**
```bash
npm run dev
```

**Option B: Run separately in different terminals**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

## 📍 Access

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🔐 Authentication

1. Go to `/signup` to create an account
2. Login with your credentials
3. Access dashboard and manage port operations

## 📊 Features

### Dashboard
- View port statistics (ships, docks, cargo, containers)
- Monitor container locations

### Ships Management
- View all ships
- Add new ships with IMO number and arrival time
- Track ship status and cargo weight

### Cargo Management
- Add cargo with type, weight, and ship assignment
- Track cargo status (Pending, Loading, Unloading, Stored, Dispatched)
- Manage container associations

### Dock Management
- Assign ships to docks
- Monitor dock status and capacity
- Remove ships from docks

### Container Management
- Add containers with weight and cargo reference
- Track container locations (Ship, Dock, Warehouse, Truck)
- Move containers between locations

### UI Features
- 🌓 Dark/Light mode toggle (`Ctrl+J`)
- 🎨 Color inversion mode (`Ctrl+K`)
- 🎯 Active route highlighting
- 📱 Responsive design
- 🔓 Logout functionality

## 📁 Project Structure

```
Port-authority/
├── client/
│   └── port-auth-frontend/
│       ├── src/
│       │   ├── pages/        # Page components
│       │   ├── layout/       # Layout components
│       │   └── styles/       # CSS & Tailwind config
│       └── package.json
├── server/
│   ├── modules/              # API modules
│   │   ├── user/             # Auth
│   │   ├── ship/             # Ships
│   │   ├── cargo/            # Cargo
│   │   ├── dock/             # Docks
│   │   └── container/        # Containers
│   ├── server.js             # Main server file
│   ├── .env                  # Configuration
│   └── package.json
└── package.json              # Root configuration
```

## 🗄️ Database Models

### User
- name, email, password, timestamps

### Ship
- name, imoNumber, arrivalTime, status, cargoWeight

### Cargo
- type, weight, origin, destination, ship (ref), containers[], status, timestamps

### Dock
- dockNumber, capacity, currentShips[], status, timestamps

### Container
- containerId, type, weight, cargo (ref), location, status, timestamps

## 🔄 API Endpoints

See [server/README.md](server/README.md) for complete API documentation.

## 🛠️ Development

### Frontend Development
```bash
cd client/port-auth-frontend
npm run dev
npm run lint
```

### Backend Development
```bash
cd server
npm run dev
```

### Build for Production

Frontend:
```bash
cd client/port-auth-frontend
npm run build
npm run preview
```

## 🚨 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (`mongod`)
- Check `MONGO_URI` in `.env`
- Verify MongoDB connection string format

### Port Already in Use
- Change `PORT` in `server/.env`
- Check `npm run dev` isn't already running

### Module Not Found
- Run `npm install` in affected directory
- Delete `node_modules` and reinstall if needed

## 📝 Notes

- Passwords are stored as plain text (dev only - use bcrypt in production)
- Auth tokens stored in localStorage (use JWT in production)
- CORS enabled for localhost development

## 📄 License

ISC

## 👤 Author

Gowshik Manikandan
