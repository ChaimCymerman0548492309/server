
````markdown
# Resource Allocator (Parking-Lot Preset)

### Design & Implementation
- Implemented an **Allocator class** that manages resources (Vehicles) across Floors with Spots.  
- Vehicle types: `MOTORCYCLE`, `CAR`, `VAN`.  
- Spot types: `MOTORCYCLE`, `COMPACT`, `LARGE`.  
- Fit rules:
  - `MOTORCYCLE` → fits in any spot  
  - `CAR` → fits in `COMPACT` or `LARGE`  
  - `VAN` → fits in `LARGE` only  
- Allocation policy: **first-fit** – assigns the first floor that has compatible capacity.

### API (Express)
- `POST /allocate` → JSON body `{id, kind}` → returns a `location` or `no_capacity`  
- `POST /release` → JSON body `{id}` → returns `ok` or `not_found`  
- `GET /stats` → returns counters: `totalBySize`, `freeBySize`, `usedByKind`  
- `GET /isFull` / `GET /isEmpty` → returns a boolean

### How to Run
1. Install dependencies:
```bash
npm install
````

2. Build the TypeScript project:

```bash
npm run build
```

3. Start the server:

```bash
npm start
```

4. Test with `curl` or Postman (examples below).

### Example curl Tests

```bash
# Allocate a Car
curl -X POST http://localhost:3000/allocate \
  -H "Content-Type: application/json" \
  -d '{"id":"car1","kind":"CAR"}'

# Release a Car
curl -X POST http://localhost:3000/release \
  -H "Content-Type: application/json" \
  -d '{"id":"car1"}'

# Get Stats
curl http://localhost:3000/stats

# Check if Full
curl http://localhost:3000/isFull
```

### Design Choices

* Encapsulation: floors and spots are not exposed externally.
* TypeScript strict mode, union types, and interfaces ensure type safety.
* Deterministic allocation (first-fit policy).
* Resource registry map tracks `resourceId → kind`.

```

---


