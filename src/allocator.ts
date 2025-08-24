import { VehicleKind, SpotSize, Resource, Floor, Spot, AllocationResult, Stats } from "./types/types";

function fits(resourceKind: VehicleKind, spotSize: SpotSize): boolean {
  switch (resourceKind) {
    case "MOTORCYCLE":
      return true;
    case "CAR":
      return spotSize === "COMPACT" || spotSize === "LARGE";
    case "VAN":
      return spotSize === "LARGE";
    default:
      return false;
  }
}

export class Allocator {
  private floors: Floor[];

  constructor(floors: Floor[]) {
    this.floors = floors;
  }

  allocate(resource: Resource): AllocationResult | null {
    for (const floor of this.floors) {
      for (const spot of floor.spots) {
        if (!spot.occupiedBy && fits(resource.kind, spot.size)) {
          spot.occupiedBy = resource.id;
          return { container: floor.id, unitId: spot.id };
        }
      }
    }
    return null;
  }

  release(resourceId: string): boolean {
    for (const floor of this.floors) {
      for (const spot of floor.spots) {
        if (spot.occupiedBy === resourceId) {
          spot.occupiedBy = undefined;
          return true;
        }
      }
    }
    return false;
  }

  stats(): Stats {
    const totalBySize: Record<SpotSize, number> = { MOTORCYCLE: 0, COMPACT: 0, LARGE: 0 };
    const freeBySize: Record<SpotSize, number> = { MOTORCYCLE: 0, COMPACT: 0, LARGE: 0 };
    const usedByKind: Record<VehicleKind, number> = { MOTORCYCLE: 0, CAR: 0, VAN: 0 };

    for (const floor of this.floors) {
      for (const spot of floor.spots) {
        totalBySize[spot.size]++;
        if (!spot.occupiedBy) {
          freeBySize[spot.size]++;
        } else {
          usedByKind[getResourceKindById(spot.occupiedBy)]++;
        }
      }
    }

    return { totalBySize, freeBySize, usedByKind };
  }

  isFull(): boolean {
    return this.floors.every(floor => floor.spots.every(spot => spot.occupiedBy !== undefined));
  }

  isEmpty(): boolean {
    return this.floors.every(floor => floor.spots.every(spot => spot.occupiedBy === undefined));
  }
}

const resourceKindMap: Record<string, VehicleKind> = {};

export function registerResource(resource: Resource) {
  resourceKindMap[resource.id] = resource.kind;
}

function getResourceKindById(resourceId: string): VehicleKind {
  const kind = resourceKindMap[resourceId];
  if (!kind) throw new Error(`Unknown resourceId: ${resourceId}`);
  return kind;
}
