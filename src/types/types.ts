export type VehicleKind = "MOTORCYCLE" | "CAR" | "VAN";
export type SpotSize = "MOTORCYCLE" | "COMPACT" | "LARGE";

export interface Resource {
  id: string;
  kind: VehicleKind;
}

export interface Spot {
  id: string;
  size: SpotSize;
  occupiedBy?: string; // resourceId
}

export interface Floor {
  id: string;
  spots: Spot[];
}

export interface AllocationResult {
  container: string;
  unitId: string;
}

export interface Stats {
  totalBySize: Record<SpotSize, number>;
  freeBySize: Record<SpotSize, number>;
  usedByKind: Record<VehicleKind, number>;
}


