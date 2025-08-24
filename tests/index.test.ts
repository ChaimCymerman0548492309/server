import { Allocator, registerResource } from "../src/allocator";
import { VehicleKind, Floor, Resource } from "../src/types/types";

let allocator: Allocator;

beforeEach(() => {
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

  allocator = new Allocator(floors);
});

// --- Test 1: Compatibility: allocate Car to COMPACT/LARGE ---
it("allocates a Car to COMPACT or LARGE spot (first-fit)", () => {
  const car: Resource = { id: "car1", kind: "CAR" };
  registerResource(car);

  const result = allocator.allocate(car);
  expect(result).not.toBeNull();
  expect(result?.unitId === "f1s2" || result?.unitId === "f1s3").toBe(true);
});

// --- Test 2: Incompatibility: Van cannot allocate if no LARGE spot ---
it("does not allocate Van when only smaller spots remain", () => {
  const van1: Resource = { id: "van1", kind: "VAN" };
  const van2: Resource = { id: "van2", kind: "VAN" };

  registerResource(van1);
  registerResource(van2);

  // Allocate first Van to first LARGE spot
  const r1 = allocator.allocate(van1);
  expect(r1).not.toBeNull();
  expect(r1?.unitId).toBe("f1s3"); // first LARGE spot

  // Allocate second Van → only one LARGE spot left (f2s2)
  const r2 = allocator.allocate(van2);
  expect(r2).not.toBeNull();
  expect(r2?.unitId).toBe("f2s2");

  // Allocate third Van → no LARGE spots left
  const van3: Resource = { id: "van3", kind: "VAN" };
  registerResource(van3);
  const r3 = allocator.allocate(van3);
  expect(r3).toBeNull();
});

// --- Test 3: Counters after allocate → release ---
it("updates stats correctly after allocate and release", () => {
  const car: Resource = { id: "car1", kind: "CAR" };
  registerResource(car);

  const alloc = allocator.allocate(car);
  expect(alloc).not.toBeNull();

  let stats = allocator.stats();
  expect(stats.freeBySize["COMPACT"]).toBe(1); // f2s1 is still free
  expect(stats.usedByKind["CAR"]).toBe(1);

  // Release
  const released = allocator.release(car.id);
  expect(released).toBe(true);

  stats = allocator.stats();
  expect(stats.freeBySize["COMPACT"]).toBe(2); // both COMPACT spots free
  expect(stats.usedByKind["CAR"]).toBe(0);
});


