# Database Design

## Relationships

Ship → Dock (one-to-one)
Ship → Cargo (one-to-many)
Cargo → Container (one-to-many)

## Collections

### Ship
- name
- imoNumber
- status
- dock

### Dock
- dockNumber
- capacity
- currentShips

### Cargo
- type
- weight
- ship

### Container
- containerId
- cargo
- location