import { VehicleKind, SpotSize, Resource, Floor, Spot, AllocationResult, Stats } from "./types/types";

function fits(resourceKind: VehicleKind, spotSize: SpotSize): boolean {
  const fitMatrix: Record<VehicleKind, SpotSize[]> = {
    "MOTORCYCLE": ["MOTORCYCLE", "COMPACT", "LARGE"],
    "CAR": ["COMPACT", "LARGE"],
    "VAN": ["LARGE"]
  };
  
  return fitMatrix[resourceKind].includes(spotSize);
}

export class Allocator {
  private floors: Floor[];
  private resourceKindMap: Record<string, VehicleKind> = {};

  constructor(floors: Floor[]) {
    this.floors = floors;
  }

  allocate(resource: Resource): AllocationResult | null {
    this.resourceKindMap[resource.id] = resource.kind;
    
    for (const floor of this.floors) {
      const availableSpot = floor.spots.find(spot => 
        !spot.occupiedBy && fits(resource.kind, spot.size)
      );
      
      if (availableSpot) {
        availableSpot.occupiedBy = resource.id;
        return { container: floor.id, unitId: availableSpot.id };
      }
    }
    
    return null;
  }

  release(resourceId: string): boolean {
    delete this.resourceKindMap[resourceId];
    
    for (const floor of this.floors) {
      const spot = floor.spots.find(spot => spot.occupiedBy === resourceId);
      if (spot) return !!(spot.occupiedBy = undefined);
    }
    return false;
  }

  stats(): Stats {
  const totalBySize: Record<SpotSize, number> = { MOTORCYCLE: 0, COMPACT: 0, LARGE: 0 };
  const freeBySize: Record<SpotSize, number> = { MOTORCYCLE: 0, COMPACT: 0, LARGE: 0 };
  const usedByKind: Record<VehicleKind, number> = { MOTORCYCLE: 0, CAR: 0, VAN: 0 };

  this.floors.forEach(floor => {
    floor.spots.forEach(spot => {
      totalBySize[spot.size]++;
      
      if (spot.occupiedBy) {
        const kind = this.resourceKindMap[spot.occupiedBy];
        if (kind) usedByKind[kind]++;
      } else {
        freeBySize[spot.size]++;
      }
    });
  });

  return { totalBySize, freeBySize, usedByKind };
}
  isFull(): boolean {
    return this.floors.every(floor => floor.spots.every(spot => spot.occupiedBy !== undefined));
  }

  isEmpty(): boolean {
    return this.floors.every(floor => floor.spots.every(spot => spot.occupiedBy === undefined));
  }

  private getResourceKindById(resourceId: string): VehicleKind {
    const kind = this.resourceKindMap[resourceId];
    if (!kind) throw new Error(`Unknown resourceId: ${resourceId}`);
    return kind;
  }
}