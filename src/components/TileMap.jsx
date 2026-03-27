import { TILE_SIZE, TILE_TYPES } from '../data/mapData';

export default function TileMap({ mapDesc }) {
  const { data, width, height } = mapDesc;

  return (
    <div className="tilemap" style={{ width: width * TILE_SIZE, height: height * TILE_SIZE }}>
      {data.map((row, y) => (
        <div key={y} className="tile-row" style={{ height: TILE_SIZE }}>
          {row.map((tileType, x) => (
            <div 
              key={`${x}-${y}`} 
              className={`tile tile-type-${tileType} ${tileType === TILE_TYPES.TREE ? 'tree' : ''} ${tileType === TILE_TYPES.WATER ? 'pool-water' : ''}`}
              style={{ width: TILE_SIZE, height: TILE_SIZE }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
