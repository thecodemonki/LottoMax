export const TILE_SIZE = 40;
export const MOVEMENT_SPEED = 200;

export const TILE_TYPES = {
  VOID: 0,
  WOOD_FLOOR: 1,
  CARPET: 2,
  DOOR_PROJECTS: 3,
  DOOR_ABOUT: 4,
  DOOR_CONTACT: 5,
  DOOR_EXPERIENCE: 6,
  DOOR_SKILLS: 7,
  INDOOR_WALL: 8,
  GRASS: 9,
  PATH: 10,
  TREE: 11,
  WATER: 12,
  POOL_DECK: 13,
  MANOR_WALL: 14,
  MANOR_DOOR_ENTER: 15,
  MANOR_DOOR_EXIT: 16,
  FRUIT_APPLE: 17,
  FRUIT_ORANGE: 18,
  FENCE: 19
};

export const ZONES = {
  OUTDOOR: 'OUTDOOR',
  INDOOR: 'INDOOR'
};

const I_8 = TILE_TYPES.INDOOR_WALL;
const I_1 = TILE_TYPES.WOOD_FLOOR;
const I_2 = TILE_TYPES.CARPET;
const I_X = TILE_TYPES.MANOR_DOOR_EXIT;
const O_0 = TILE_TYPES.VOID;

export const indoorMapData = [
  // 0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23
  [ I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_8, I_8,   3, I_8, I_8, I_8, I_8, I_8,   4, I_8, I_8, I_8, I_8, I_8, I_8,   5, I_8, I_8, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_2, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_8, I_8,   6, I_8, I_8, I_8, I_8, I_8,   7, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_1, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_1, I_1, I_1, I_1, I_1, I_8, I_1, I_1, I_1, I_1,   2,   2,   2, I_1, I_1, I_1, I_1, I_1, I_8, I_8, I_8, I_8, I_8],
  [ I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_X, I_X, I_X, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8, I_8]
];

export const indoorMapDesc = {
  data: indoorMapData,
  width: 24,
  height: 16,
  spawnIn: { x: 12 * TILE_SIZE, y: 14 * TILE_SIZE }, // When entering from outside
  spawnInteract: { x: 11 * TILE_SIZE, y: 7 * TILE_SIZE } // Initial spawn
};

const G = TILE_TYPES.GRASS;
const P = TILE_TYPES.PATH;
const T = TILE_TYPES.TREE;
const W = TILE_TYPES.WATER;
const D = TILE_TYPES.POOL_DECK;
const M = TILE_TYPES.MANOR_WALL;
const E = TILE_TYPES.MANOR_DOOR_ENTER;
const F = TILE_TYPES.FENCE;
const A = TILE_TYPES.FRUIT_APPLE;
const B = TILE_TYPES.FRUIT_ORANGE;
const V = TILE_TYPES.VOID;

export const outdoorMapData = [
  // 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29
  [ T, T, T, T, T, T, T, T, T, T, M, M, M, M, M, M, M, M, M, M, T, T, T, T, T, T, T, T, T, T],
  [ T, G, G, G, G, T, G, G, G, G, M, M, M, M, M, M, M, M, M, M, G, G, G, D, D, D, D, D, T, T],
  [ T, G, F, F, F, A, G, G, G, G, M, M, M, M, M, M, M, M, M, M, G, G, G, D, D, D, D, D, T, T],
  [ T, G, F, G, G, G, B, G, G, G, M, M, M, M, M, M, M, M, M, M, G, G, G, D, W, W, W, D, T, T],
  [ T, G, F, G, A, G, G, G, G, G, M, M, M, M, M, M, M, M, M, M, G, G, G, D, W, W, W, D, T, T],
  [ T, G, F, F, F, B, G, G, G, G, M, M, M, M, E, E, M, M, M, M, G, G, G, D, W, W, W, D, T, T],
  [ T, G, G, G, G, G, G, G, A, G, M, M, P, P, P, P, P, P, M, M, G, G, G, D, D, D, D, D, T, T],
  [ T, G, T, T, T, G, G, G, G, G, P, P, P, P, P, P, P, P, P, P, P, P, G, G, G, G, G, G, T, T],
  [ T, G, T, G, T, G, G, G, G, G, P, G, G, G, P, P, G, G, G, P, G, G, G, G, G, G, G, G, T, T],
  [ T, G, T, G, T, G, G, G, G, G, P, G, G, G, P, P, G, G, G, P, G, G, G, G, T, T, T, G, T, T],
  [ T, G, G, G, G, G, G, G, G, G, P, G, G, G, P, P, G, G, G, P, G, G, G, G, T, G, T, G, T, T],
  [ T, T, G, G, G, G, G, G, G, G, P, G, G, G, P, P, G, G, G, P, G, G, G, G, T, P, T, G, T, T],
  [ V, V, T, T, T, T, G, G, G, G, P, P, P, P, P, P, P, P, P, P, G, G, G, G, G, P, G, G, T, T],
  [ V, V, V, V, V, T, G, G, G, G, G, G, G, G, P, P, G, G, G, G, G, G, G, G, G, P, G, G, T, T],
  [ V, V, V, V, V, T, G, G, G, G, G, G, G, G, P, P, G, G, G, G, G, G, T, T, T, P, T, T, T, T],
  [ V, V, V, V, V, T, G, G, G, G, G, G, G, G, P, P, G, G, G, G, G, G, T, G, G, P, G, G, V, V],
  [ V, V, V, V, V, T, T, G, G, G, G, P, P, P, P, P, P, P, P, G, G, G, T, G, G, G, G, G, V, V],
  [ V, V, V, V, V, V, T, G, G, G, G, P, G, G, G, G, G, G, P, G, G, G, T, G, G, G, G, G, V, V],
  [ V, V, V, V, V, V, T, G, G, G, G, P, G, G, G, G, G, G, P, G, G, G, T, T, T, T, T, T, V, V],
  [ V, V, V, V, V, V, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, V, V, V, V, V, V, V]
];
// Wait, row lengths must match. They are all 30 elements long hopefully. Let me double check - yes 30 elements.

export const outdoorMapDesc = {
  data: outdoorMapData,
  width: 30,
  height: 20,
  spawnIn: { x: 15 * TILE_SIZE, y: 7 * TILE_SIZE } // Spawn below door
};

export const isSolid = (val) => [
  TILE_TYPES.VOID,
  TILE_TYPES.INDOOR_WALL,
  TILE_TYPES.TREE,
  TILE_TYPES.WATER,
  TILE_TYPES.MANOR_WALL,
  TILE_TYPES.FENCE
].includes(val);

export const isInteractable = (val) => [
  TILE_TYPES.DOOR_PROJECTS,
  TILE_TYPES.DOOR_ABOUT,
  TILE_TYPES.DOOR_CONTACT,
  TILE_TYPES.DOOR_EXPERIENCE,
  TILE_TYPES.DOOR_SKILLS,
  TILE_TYPES.MANOR_DOOR_ENTER,
  TILE_TYPES.MANOR_DOOR_EXIT,
  TILE_TYPES.FRUIT_APPLE,
  TILE_TYPES.FRUIT_ORANGE
].includes(val);

export const getTileValue = (mapData, width, height, x, y) => {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);
  if (row < 0 || row >= height || col < 0 || col >= width) return TILE_TYPES.VOID; 
  return mapData[row][col];
};

export const getLocationTitle = (x, y, currentZone) => {
  if (currentZone === ZONES.INDOOR) {
    return 'The Manor';
  } else {
    // Determine based on coordinates
    const col = Math.floor(x / TILE_SIZE);
    const row = Math.floor(y / TILE_SIZE);
    
    if (row <= 7 && col <= 10) return 'The Garden';
    if (row <= 7 && col >= 19) return 'The Pool';
    if (row >= 14) return 'The Village';
    return 'Estate Grounds';
  }
};
