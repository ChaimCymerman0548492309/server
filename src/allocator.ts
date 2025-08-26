import { VehicleKind, SpotSize, Resource, Floor, AllocationResult, Stats } from "./types/types";

export class Allocator {
  private floors: Floor[];
  private resourceKindMap: Record<string, VehicleKind> = {};

  constructor(floors: Floor[]) {
    this.floors = floors;
  }

  allocate(resource: Resource): AllocationResult | null {
    this.resourceKindMap[resource.id] = resource.kind;

    for (const floor of this.floors) {
      const spot = floor.spots.find(
        s => !s.occupiedBy && s.size >= resource.kind // מנגנון "<" במקום fitMatrix
      );
      if (spot) {
        spot.occupiedBy = resource.id;
        return { container: floor.id, unitId: spot.id };
      }
    }
    return null;
  }

  release(resourceId: string): boolean {
    delete this.resourceKindMap[resourceId];
    for (const floor of this.floors) {
      const spot = floor.spots.find(s => s.occupiedBy === resourceId);
      if (spot) {
        spot.occupiedBy = undefined;
        return true;
      }
    }
    return false;
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

  // מקוצר את isFull / isEmpty
  isFull(): boolean {
    return !this.floors.some(floor => floor.spots.some(s => !s.occupiedBy));
  }

  isEmpty(): boolean {
    return !this.floors.some(floor => floor.spots.some(s => s.occupiedBy));
  }
}
