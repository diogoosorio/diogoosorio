export interface Services {
  walls: 'paint' | 'stucco' | 'repair' | 'plasterboard' | 'wallpaper' | 'tiles' | 'none';
  ceiling: 'paint' | 'stucco' | 'repair' | 'plasterboard' | 'none';
  floor: 'laminate' | 'vinyl' | 'tiles' | 'stone_repair' | 'stone' | 'parquet_repair' | 'parquet' | 'none';
  electricity: boolean;
}

export interface WaterServices {
  sewage: boolean;
  plumbing: boolean;
  gas: boolean;
}

interface BaseDivision {
  name: string;
  measures: {
    width: number;
    length: number;
    height: number;
  };
  services: Services;
}

export interface SimpleDivision extends BaseDivision {
  kind: 'living_room' | 'bedroom' | 'hallway';
}

export interface WaterDivision extends BaseDivision {
  kind: 'bathroom' | 'kitchen';
  services: Services & WaterServices;
}

export type Division = SimpleDivision | WaterDivision;

export interface RenovationForm {
  divisions: Division[];
}

export type DivisionKind = SimpleDivision['kind'] | WaterDivision['kind'];
