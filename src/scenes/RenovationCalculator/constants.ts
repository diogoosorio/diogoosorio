import { DivisionKind, Services } from "./types";

export const divisionKinds: [DivisionKind, string][] = [
  ['living_room', 'Sala de Estar'],
  ['bedroom', 'Quarto'],
  ['kitchen', 'Cozinha'],
  ['bathroom', 'Casa de Banho'],
  ['hallway', 'Corredor'],
];

export const wallServices: [Services['walls'], string][] = [
  ['paint', 'Só Pintura'],
  ['stucco', 'Estuque + Pintura'],
  ['repair', 'Preparação + Pintura'],
  ['plasterboard', 'Pladur + Pintura'],
  ['wallpaper', 'Papel de Parede'],
  ['tiles', 'Azulejos'],
];

export const ceilingServices: [Services['ceiling'], string][] = [
  ['paint', 'Pintura'],
  ['stucco', 'Estuque + Pintura'],
  ['repair', 'Reparação + Pintura'],
  ['plasterboard', 'Teto Falso'],
];

export const floorServices: [Services['floor'], string][] = [
  ['laminate', 'Soalho Flutuante'],
  ['vinyl', 'Vinílico'],
  ['tiles', 'Azulejos'],
  ['stone_repair', 'Reparação Pedra'],
  ['stone', 'Pedra'],
  ['parquet_repair', 'Reparação Parquet'],
  ['parquet', 'Parquet'],
];