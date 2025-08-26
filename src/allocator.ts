import { VehicleKind, SpotSize,  Car, Floor, AllocationResult, Stats } from "./types/types";

export class Allocator {
  private floors :Floor[];
  private resourceKindMap  : Record<string , VehicleKind> = {};

  constructor(floors : Floor[]) {
    this.floors = floors;
}
allocate(car : Car) :AllocationResult | null {
this.resourceKindMap[car.CarId] = car.kind;
for (const floor of this.floors) {
  const spot = floor.spots.find(s => !s.occupiedBy && s.size >= car.kind)
  if (spot) {
    spot.occupiedBy = car.CarId;
    return { spotId: spot.id };
  }
} return null;
}

release(spotId: string , carId : string): boolean { 
  delete this.resourceKindMap[carId];
  for (const floor of this.floors) {
    const spot = floor.spots.find(s => s.id === spotId && s.occupiedBy === carId);
    if (spot) {
      spot.occupiedBy = undefined;
      return true;
    }
  }
  return false
}


  stats(): Stats {
    const totalBySize: Record<SpotSize, number> = {
      [SpotSize.MOTORCYCLE]: 0,
      [SpotSize.COMPACT]: 0,
      [SpotSize.LARGE]: 0,
    };
    const freeBySize: Record<SpotSize, number> = { ...totalBySize };
    const usedByKind: Record<VehicleKind, number> = {
      [VehicleKind.MOTORCYCLE]: 0,
      [VehicleKind.CAR]: 0,
      [VehicleKind.VAN]: 0,
    };

    this.floors.forEach(floor =>
      floor.spots.forEach(spot => {
        totalBySize[spot.size]++;
        if (spot.occupiedBy) {
          const kind = this.resourceKindMap[spot.occupiedBy];
          if (kind) usedByKind[kind]++;
        } else {
          freeBySize[spot.size]++;
        }
      })
    );

    return { totalBySize, freeBySize, usedByKind };
  }

  isFull(): boolean {
    return !this.floors.some(floor => floor.spots.some(s => !s.occupiedBy));
  }

  isEmpty(): boolean {
    return !this.floors.some(floor => floor.spots.some(s => s.occupiedBy));
  }
}
