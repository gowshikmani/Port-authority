# Port Authority Task TODO

## Plan Breakdown & Progress Tracking

### 1. Fix Dock Validation
- [x] Client: Edit Dock.jsx - Add validation in handleAddDock
- [x] Server: Edit dock.controller.js - Add NaN check in createDock

### 2. Add Delete for Ships
- [x] Server: Edit ship.controller.js - Add deleteShip function
- [x] Server: Edit ship.routes.js - Add DELETE /:id route
- [x] Client: Edit Ships.jsx - Add delete button & handleDelete

### 3. Add Delete for Cargo
- [x] Server: Edit cargo.controller.js - Add deleteCargo function
- [x] Server: Edit cargo.routes.js - Add DELETE /:id route
- [x] Client: Edit Cargo.jsx - Add delete button & handleDelete

### 4. Add Delete for Docks
- [x] Server: Edit dock.controller.js - Add deleteDock function
- [x] Server: Edit dock.routes.js - Add DELETE /:id route
- [x] Client: Edit Dock.jsx - Add delete button & handleDelete in table

### 5. Add Delete for Containers
- [x] Server: Edit container.controller.js - Add deleteContainer function
- [x] Server: Edit container.routes.js - Add DELETE /:id route
- [x] Client: Edit Containers.jsx - Add delete button & handleDelete

### 6. Testing & Completion
- [ ] Restart server
- [ ] Test validation fix and all deletes

Completed steps will be marked [x]. Current progress: Starting edits.
