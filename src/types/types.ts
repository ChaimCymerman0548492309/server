// export enum VehicleKind = {"MOTORCYCLE" | "CAR" | "VAN";}
export enum VehicleKind {
  "MOTORCYCLE" = 1,
  "CAR" = 2,
  "VAN" = 3,
}
// export type SpotSize = "MOTORCYCLE" | "COMPACT" | "LARGE";
export enum SpotSize {
  "MOTORCYCLE" = 1, 
  "COMPACT" = 2,
  "LARGE" = 3
}

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


