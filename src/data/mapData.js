export const TILE_SIZE = 40;
export const MOVEMENT_SPEED = 720;

export const TILE_TYPES = {
  VOID: 0,
  GRASS: 9,
  STONE_PATH: 10,
  TREE: 11,
  WATER: 12,
  FARM_DIRT: 13,
  CABIN_OUT_WALL: 14,
  CABIN_DOOR_ENTER: 15,
  CROP_PUMPKIN: 17,
  CABIN_ROOF: 18,
  WOOD_FENCE: 19,
  STONE_FENCE: 20,
  SHED_WALL: 21,
  SHED_DOOR_ENTER: 22,
  SHED_ROOF: 23,
  MANSION_IN_FLOOR: 24,
  MANSION_IN_WALL: 25,
  MANSION_IN_EXIT: 26,
  FRUIT_TREE: 27,
  FIREPLACE: 28,
  BOOKSHELF: 29,
  DESK: 30,
  RUG: 31
};

export const ZONES = {
  OUTDOOR: 'OUTDOOR',
  MANSION: 'MANSION'
};

const G = TILE_TYPES.GRASS;
const P = TILE_TYPES.STONE_PATH;
const T = TILE_TYPES.TREE;
const W = TILE_TYPES.WATER;
const D = TILE_TYPES.FARM_DIRT;
const M = TILE_TYPES.CABIN_OUT_WALL;
const E = TILE_TYPES.CABIN_DOOR_ENTER;
const F = TILE_TYPES.WOOD_FENCE;
const S = TILE_TYPES.STONE_FENCE;
const R = TILE_TYPES.CABIN_ROOF;
const C = TILE_TYPES.CROP_PUMPKIN;
const V = TILE_TYPES.VOID;
const FT = TILE_TYPES.FRUIT_TREE;

// Interior
const iF = TILE_TYPES.MANSION_IN_FLOOR;
const iW = TILE_TYPES.MANSION_IN_WALL;
const iE = TILE_TYPES.MANSION_IN_EXIT;
const FP = TILE_TYPES.FIREPLACE;
const BS = TILE_TYPES.BOOKSHELF;
const DK = TILE_TYPES.DESK;
const RG = TILE_TYPES.RUG;

export const outdoorMapData = [
  // 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39
  [ T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [ T, G, G, G, G, G, G, G, T, G, G, G, G, G, S, S, S, S, S, S, S, S, S, S, S, G, T, T, T, T, T, T, T, T, T, G, G, G, G, T],
  [ T, G, S, S, S, S, S, G, G, G, G, G, G, G, S, G, G, G, C, D, C, D, C, C, S, G, T, G, G, G, G, G, G, T, T, G, P, P, G, T],
  [ T, G, S, R, R, R, S, G, G, G, G, G, G, G, S, G, G, C, D, C, D, C, D, C, S, G, T, G, G, G, G, G, G, G, G, G, P, P, G, T],
  [ T, G, S, R, R, R, S, G, P, P, P, P, P, G, S, G, C, D, C, D, C, D, C, D, S, G, T, G, FT,G, FT,G, G, G, G, G, P, P, G, T],
  [ T, G, S, M, M, M, S, G, P, G, G, G, P, G, S, G, C, C, C, C, C, C, C, C, S, G, T, G, G, G, G, G, G, G, G, G, P, P, G, T],
  [ T, G, S, M, E, M, S, G, P, G, G, G, P, G, S, S, S, F, F, F, F, S, S, S, S, G, T, G, G, W, W, W, W, W, G, G, P, P, G, T],
  [ T, G, S, S, P, S, S, G, P, G, T, G, P, G, G, G, G, G, G, G, G, G, G, G, G, G, T, G, G, W, W, W, W, W, G, G, P, P, G, T],
  [ T, G, G, G, P, G, G, G, P, G, T, G, P, G, G, G, G, G, G, G, G, G, G, G, G, G, T, G, G, W, W, W, W, W, G, G, P, P, G, T],
  [ T, G, G, G, P, P, P, P, P, G, T, G, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, G, T],
  [ T, G, F, F, P, F, F, F, F, F, F, F, P, F, F, F, F, F, F, F, F, F, F, F, P, G, G, G, G, G, G, G, G, G, G, G, P, P, G, T],
  [ T, G, F, G, P, G, G, G, G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, G, P, P, G, T],
  [ T, G, F, G, P, G, G, G, G, G, G, G, P, G, G, G, G, T, G, G, G, T, G, G, P, G, G, G, G, G, G, G, G, G, G, G, P, P, G, T],
  [ T, G, F, G, P, P, P, P, P, P, P, P, P, G, G, T, G, G, G, G, G, G, G, T, P, G, G, G, T, T, T, T, T, T, T, T, P, P, G, T],
  [ T, G, F, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, P, G, G, T, T, T, T, T, T, T, T, T, P, P, G, T],
  [ T, G, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, P, G, G, T, T, T, T, T, T, T, T, T, P, P, G, T],
  [ T, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, P, G, T, T, T, T, T, T, T, T, T, T, P, P, G, T],
  [ T, T, T, T, T, T, T, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, P, G, T, T, T, T, T, T, T, T, T, T, P, P, G, T],
  [ V, V, V, V, V, V, T, T, T, T, T, T, T, G, G, G, G, G, P, P, P, P, P, P, P, G, T, T, T, T, T, T, T, T, T, T, P, P, G, T],
  [ V, V, V, V, V, V, V, V, V, V, V, V, T, T, T, T, T, T, T, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V]
];

export const mansionMapData = [
  [iW, iW, iW, iW, iW, iW, iW, iW, iW, iW],
  [iW, iF, BS, BS, iF, iF, FP, iF, DK, iW],
  [iW, iF, iF, iF, iF, iF, iF, iF, iF, iW],
  [iW, iF, iF, RG, RG, RG, iF, iF, iF, iW],
  [iW, iF, iF, RG, RG, RG, iF, iF, iF, iW],
  [iW, iF, iF, iF, iF, iF, iF, iF, iF, iW],
  [iW, iF, iF, iF, iF, iF, iF, iF, iF, iW],
  [iW, iW, iW, iW, iE, iW, iW, iW, iW, iW]
];

export const outdoorMapDesc = {
  data: outdoorMapData,
  width: 40,
  height: 20,
  spawnIn: { x: 4 * TILE_SIZE + TILE_SIZE / 2, y: 7 * TILE_SIZE + TILE_SIZE / 2 }
};

export const mansionMapDesc = {
  data: mansionMapData,
  width: 10,
  height: 8,
  spawnIn: { x: 4 * TILE_SIZE + TILE_SIZE / 2, y: 6 * TILE_SIZE + TILE_SIZE / 2 }
};

export const isSolid = (val) => [
  TILE_TYPES.VOID,
  TILE_TYPES.TREE,
  TILE_TYPES.WATER,
  TILE_TYPES.CABIN_OUT_WALL,
  TILE_TYPES.CABIN_ROOF,
  TILE_TYPES.WOOD_FENCE,
  TILE_TYPES.STONE_FENCE,
  TILE_TYPES.SHED_WALL,
  TILE_TYPES.SHED_ROOF,
  TILE_TYPES.MANSION_IN_WALL,
  TILE_TYPES.FRUIT_TREE,
  TILE_TYPES.FIREPLACE,
  TILE_TYPES.BOOKSHELF,
  TILE_TYPES.DESK
].includes(val);

export const isInteractable = (val) => [
  TILE_TYPES.CABIN_DOOR_ENTER,
  TILE_TYPES.MANSION_IN_EXIT,
  TILE_TYPES.FRUIT_TREE,
  TILE_TYPES.CROP_PUMPKIN
].includes(val);

export const getTileValue = (mapData, width, height, x, y) => {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);
  if (row < 0 || row >= height || col < 0 || col >= width) return TILE_TYPES.VOID; 
  return mapData[row][col];
};

export const getLocationTitle = (x, y, zone) => {
  if (zone === ZONES.MANSION) return 'The Manor';
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);
  
  if (col <= 7 && row <= 8) return 'Home';
  if (col >= 28 && row <= 9) return 'The Pool Area';
  if (col >= 24 && row <= 8) return 'The Orchard';
  if (col >= 30 && row >= 10) return 'Village Town';
  if (col >= 14 && row <= 8 && col < 24) return 'The Patch';
  return 'Stardew Valley Farm';
};
