# API Reference

## Ships

GET /api/ships  
→ Get all ships

POST /api/ships  
→ Create ship

---

## Docks

POST /api/docks/assign  
→ Assign ship to dock

POST /api/docks/remove  
→ Remove ship from dock

---

## Cargo

POST /api/cargo  
→ Add cargo to ship

PUT /api/cargo/:id/status  
→ Update cargo status

---

## Containers

POST /api/containers  
→ Create container

PUT /api/containers/:id/location  
→ Update container location