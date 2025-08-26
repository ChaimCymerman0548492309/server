// src/server.ts
import express from "express";
import { Allocator,  } from "./allocator";
import { VehicleKind, Car, Floor, SpotSize } from "./types/types";
import router from "./router";

const app = express();
const port = 3000;

app.use(express.json());

const floors = [
  {
    id: "floor1",
    spots: [
      { id: "f1s1", size: SpotSize.MOTORCYCLE },
      { id: "f1s2", size: SpotSize.COMPACT },
      { id: "f1s3", size: SpotSize.LARGE },
    ],
  },
  {
    id: "floor2",
    spots: [
      { id: "f2s1", size: SpotSize.COMPACT },
      { id: "f2s2", size: SpotSize.LARGE },
    ],
  },
];
const allocator = new Allocator(floors);

app.post("/allocate", (req, res) => {
  const { CarId, kind } = req.body as { CarId: string; kind: VehicleKind };
  if (!CarId || !kind) return res.status(400).json({ error: "Missing id or kind" });

  const resource: Car = { CarId, kind };
  // registerResource(resource);

  const result = allocator.allocate(resource);
  if (result) res.json({ status: "ok", location: result });
  else res.json({ status: "no_capacity" });
});

app.post("/release", (req, res) => {
  const { id ,CarId } = req.body as { id: string ; CarId: string };
  if (!id || !CarId) return res.status(400).json({ error: "Missing id" });

  const success = allocator.release(id ,CarId );
  res.json({ status: success ? "ok" : "not_found" });
});

app.get("/stats", (req, res) => {
  const stats = allocator.stats();
  res.json(stats);
});

app.get("/isFull", (req, res) => res.json({ isFull: allocator.isFull() }));
app.get("/isEmpty", (req, res) => res.json({ isEmpty: allocator.isEmpty() }));

app.use("/items", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// why to use a database of MongoDB and not a SQL database?

// folre :[
//   id :
//   name 
// ]

// spot :[
//   floreID
//   id 
//   size 
//   occupieByCarID
// ]


// car : [
//   id 
//   kind

// ]

// SELECT * FROM spot WHRE occupieByCarID IS NULL AND size = 'LARGE' LIMIT 1;