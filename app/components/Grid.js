import Tile from "./Tile"
import { useTiles } from "../hooks/useTiles"
import { useMemo } from "react"


export default function Grid({ mouseLeft }) {
  const { sheetConfig, tiles } = useTiles()

  const grid_tiles = useMemo(() => {
    if (!tiles) return []
    return tiles.tiles.map((x, i) => (
      <Tile key={i} id={i} tile={x} />
    ))
  }, [tiles])

  if (!tiles) {
    return <div>No map</div>
  }

  const width = tiles.width
  const height = tiles.height

  return (
    <div
      onMouseLeave={mouseLeft}
      className="tile_grid"
      style={{
        gridTemplate: `repeat(${height}, ${sheetConfig.tile_size}px) / repeat(${width}, ${sheetConfig.tile_size}px)`
      }}
    >
      {grid_tiles}
    </div>
  )
}
