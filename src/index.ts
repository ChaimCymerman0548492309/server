// src/server.ts
import express from "express";
import { Allocator,  } from "./allocator";
import { VehicleKind, Resource, Floor } from "./types/types";
import router from "./router";

const app = express();
const port = 3000;

app.use(express.json());

const floors: Floor[] = [
  {
    id: "floor1",
    spots: [
      { id: "f1s1", size: "MOTORCYCLE" },
      { id: "f1s2", size: "COMPACT" },
      { id: "f1s3", size: "LARGE" },
    ],
  },
  {
    id: "floor2",
    spots: [
      { id: "f2s1", size: "COMPACT" },
      { id: "f2s2", size: "LARGE" },
    ],
  },
];

const allocator = new Allocator(floors);

app.post("/allocate", (req, res) => {
  const { id, kind } = req.body as { id: string; kind: VehicleKind };
  if (!id || !kind) return res.status(400).json({ error: "Missing id or kind" });

  const resource: Resource = { id, kind };
  // registerResource(resource);

  const result = allocator.allocate(resource);
  if (result) res.json({ status: "ok", location: result });
  else res.json({ status: "no_capacity" });
});

app.post("/release", (req, res) => {
  const { id } = req.body as { id: string };
  if (!id) return res.status(400).json({ error: "Missing id" });

  const success = allocator.release(id);
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