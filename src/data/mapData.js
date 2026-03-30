export const TILE_SIZE = 40;
export const MOVEMENT_SPEED = 400;

export const TILE_TYPES = {
  VOID: 0,
  // Indoor
  CABIN_FLOOR: 1,
  RUG: 2,
  OBJ_COMPUTER: 3, // Projects
  OBJ_BOOKSHELF: 4, // Skills
  OBJ_DIARY: 5, // About
  OBJ_PHONE: 6, // Contact
  OBJ_FILING: 7, // Experience
  CABIN_IN_WALL: 8,
  
  // Outdoor
  GRASS: 9,
  STONE_PATH: 10,
  TREE: 11,
  WATER: 12,
  FARM_DIRT: 13,
  CABIN_OUT_WALL: 14,
  CABIN_DOOR_ENTER: 15,
  CABIN_DOOR_EXIT: 16,
  CROP_PUMPKIN: 17,
  CABIN_ROOF: 18,
  WOOD_FENCE: 19,
  STONE_FENCE: 20
};

export const ZONES = {
  OUTDOOR: 'OUTDOOR',
  INDOOR: 'INDOOR'
};

const I_8 = TILE_TYPES.CABIN_IN_WALL;
const I_1 = TILE_TYPES.CABIN_FLOOR;
const I_2 = TILE_TYPES.RUG;
const I_X = TILE_TYPES.CABIN_DOOR_EXIT;

const O_C = TILE_TYPES.OBJ_COMPUTER;
const O_B = TILE_TYPES.OBJ_BOOKSHELF;
const O_D = TILE_TYPES.OBJ_DIARY;
const O_P = TILE_TYPES.OBJ_PHONE;
const O_F = TILE_TYPES.OBJ_FILING;

// Indoor Map: Small cozy 10x8 cabin
// 0  1  2  3  4  5  6  7  8  9
export const indoorMapData = [
  [I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8],
  [I_8, I_1, O_D, I_1, I_1, I_1, O_B, O_B, I_1, I_8],
  [I_8, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_8],
  [I_8, O_C, I_1, I_2, I_2, I_2, I_2, I_1, I_1, I_8],
  [I_8, I_1, I_1, I_2, I_2, I_2, I_2, I_1, I_1, I_8],
  [I_8, I_1, I_1, I_1, I_1, I_1, I_1, I_1, O_P, I_8],
  [I_8, I_1, O_F, I_1, I_1, I_1, I_1, I_1, I_1, I_8],
  [I_8, I_8, I_8, I_8, I_X, I_X, I_8, I_8, I_8, I_8]
];

export const indoorMapDesc = {
  data: indoorMapData,
  width: 10,
  height: 8,
  spawnIn: { x: 5 * TILE_SIZE, y: 6 * TILE_SIZE }, // Enter from outside
  spawnInteract: { x: 5 * TILE_SIZE, y: 4 * TILE_SIZE } // Initial spawn
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

export const outdoorMapData = [
  // 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29
  [ T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [ T, G, G, G, G, G, G, G, T, G, G, G, G, G, S, S, S, S, S, S, S, S, S, S, S, G, T, T, T, T],
  [ T, G, S, S, S, S, S, G, G, G, G, G, G, G, S, G, G, G, C, D, C, D, C, C, S, G, T, G, G, T],
  [ T, G, S, R, R, R, S, G, G, G, G, G, G, G, S, G, G, C, D, C, D, C, D, C, S, G, T, G, W, T],
  [ T, G, S, R, R, R, S, G, P, P, P, P, P, G, S, G, C, D, C, D, C, D, C, D, S, G, T, W, W, T],
  [ T, G, S, M, M, M, S, G, P, G, G, G, P, G, S, G, C, C, C, C, C, C, C, C, S, G, G, W, W, T],
  [ T, G, S, M, E, M, S, G, P, G, G, G, P, G, S, S, S, F, F, F, F, S, S, S, S, G, G, W, W, T],
  [ T, G, S, S, P, S, S, G, P, G, T, G, P, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W, W, T],
  [ T, G, G, G, P, G, G, G, P, G, T, G, P, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W, W, T],
  [ T, G, G, G, P, P, P, P, P, G, T, G, P, P, P, P, P, P, P, P, P, P, P, P, P, G, G, W, W, T],
  [ T, G, F, F, P, F, F, F, F, F, F, F, P, F, F, F, F, F, F, F, F, F, F, F, P, G, G, W, W, T],
  [ T, G, F, G, P, G, G, G, G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, G, P, G, G, W, W, T],
  [ T, G, F, G, P, G, G, G, G, G, G, G, P, G, G, G, G, T, G, G, G, T, G, G, P, G, G, G, T, T],
  [ T, G, F, G, P, P, P, P, P, P, P, P, P, G, G, T, G, G, G, G, G, G, G, T, P, G, G, G, T, T],
  [ T, G, F, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, P, G, G, T, T, T],
  [ T, G, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, P, G, G, T, T, T],
  [ T, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, P, G, T, T, T, T],
  [ T, T, T, T, T, T, T, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, P, G, T, T, T, T],
  [ V, V, V, V, V, V, T, T, T, T, T, T, T, G, G, G, G, G, P, P, P, P, P, P, P, G, T, T, T, T],
  [ V, V, V, V, V, V, V, V, V, V, V, V, T, T, T, T, T, T, T, V, V, V, V, V, V, V, V, V, V, V]
];

export const outdoorMapDesc = {
  data: outdoorMapData,
  width: 30,
  height: 20,
  spawnIn: { x: 4 * TILE_SIZE, y: 7 * TILE_SIZE } // Spawn below door
};

export const isSolid = (val) => [
  TILE_TYPES.VOID,
  TILE_TYPES.CABIN_IN_WALL,
  TILE_TYPES.OBJ_COMPUTER,
  TILE_TYPES.OBJ_BOOKSHELF,
  TILE_TYPES.OBJ_DIARY,
  TILE_TYPES.OBJ_PHONE,
  TILE_TYPES.OBJ_FILING,
  TILE_TYPES.TREE,
  TILE_TYPES.WATER,
  TILE_TYPES.CABIN_OUT_WALL,
  TILE_TYPES.CABIN_ROOF,
  TILE_TYPES.WOOD_FENCE,
  TILE_TYPES.STONE_FENCE
].includes(val);

export const isInteractable = (val) => [
  TILE_TYPES.OBJ_COMPUTER,
  TILE_TYPES.OBJ_BOOKSHELF,
  TILE_TYPES.OBJ_DIARY,
  TILE_TYPES.OBJ_PHONE,
  TILE_TYPES.OBJ_FILING,
  TILE_TYPES.CABIN_DOOR_ENTER,
  TILE_TYPES.CABIN_DOOR_EXIT
].includes(val);

export const getTileValue = (mapData, width, height, x, y) => {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);
  if (row < 0 || row >= height || col < 0 || col >= width) return TILE_TYPES.VOID; 
  return mapData[row][col];
};

export const getLocationTitle = (x, y, currentZone) => {
  if (currentZone === ZONES.INDOOR) {
    return 'Your Cabin';
  } else {
    // Determine based on coordinates
    const col = Math.floor(x / TILE_SIZE);
    const row = Math.floor(y / TILE_SIZE);
    
    if (col <= 7 && row <= 8) return 'Home';
    if (col >= 14 && row <= 7) return 'The Patch';
    return 'Stardew Valley Farm';
  }
};
