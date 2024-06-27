import { Division, Services } from "./types"

const wallServicePrices: Record<Services['walls'], number> = {
    none: 0,
    paint: 15,
    stucco: 23,
    repair: 23,
    plasterboard: 55,
    wallpaper: 20,
    tiles: 25,
}
  
const ceilingServicePrices: Record<Services['ceiling'], number> = {
    none: 0,
    paint: 15,
    stucco: 23,
    repair: 23,
    plasterboard: 55,
}
  
const floorServicePrices: Record<Services['floor'], number> = {
    none: 0,
    laminate: 25,
    vinyl: 20,
    tiles: 25,
    stone_repair: 30,
    stone: 40,
    parquet_repair: 30,
    parquet: 40,
}

export const calculateEstimation = (divisions: Division[]): number => {
    const totals = divisions.map((division) => {
        const floorSquareMeters = division.measures.width * division.measures.length;
        const floorPrice = floorServicePrices[division.services.floor] * floorSquareMeters;
        const ceilingPrice = ceilingServicePrices[division.services.ceiling] * floorSquareMeters;

        const wallsSquareMeters = (2 * (division.measures.width * division.measures.height)) + (2 * (division.measures.length * division.measures.height));
        const wallsPrice = wallServicePrices[division.services.walls] * wallsSquareMeters;

        return floorPrice + ceilingPrice + wallsPrice
    });

    return totals.reduce((acc, total) => acc + total, 0);
}