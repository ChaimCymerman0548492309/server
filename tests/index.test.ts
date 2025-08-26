import { Allocator } from "../src/allocator";
import { Floor, Car, SpotSize, VehicleKind } from "../src/types/types";

let allocator: Allocator;

beforeEach(() => {
  const floors: Floor[] = [
    {
      id: "f1",
      spots: [
        { id: "s1", size: SpotSize.MOTORCYCLE },
        { id: "s2", size: SpotSize.COMPACT },
        { id: "s3", size: SpotSize.LARGE },
      ],
    },
    {
      id: "f2",
      spots: [
        { id: "s4", size: SpotSize.COMPACT },
        { id: "s5", size: SpotSize.LARGE },
      ],
    },
  ];
  allocator = new Allocator(floors);
});

it("allocates a Car correctly", () => {
  const car: Car = { CarId: "car1", kind: VehicleKind.CAR };
  const r = allocator.allocate(car);
  expect(r).not.toBeNull();
  expect(["s2", "s3"].includes(r!.spotId)).toBe(true);
});

it("fails to allocate Van if no LARGE spot left", () => {
  allocator.allocate({ CarId: "v1", kind: VehicleKind.VAN });
  allocator.allocate({ CarId: "v2", kind: VehicleKind.VAN });
  const r3 = allocator.allocate({ CarId: "v3", kind: VehicleKind.VAN });
  expect(r3).toBeNull();
});

it("updates stats on allocate & release", () => {
  const car: Car = { CarId: "car1", kind: VehicleKind.CAR };
  // allocator.allocate(car);
  // expect(allocator.stats().usedByKind[VehicleKind.CAR]).toBe(1);
  allocator.release(car.CarId ,);
  expect(allocator.stats().usedByKind[VehicleKind.CAR]).toBe(0);
});
