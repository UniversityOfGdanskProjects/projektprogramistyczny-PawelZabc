import Tile from "./Tile"
import { useTiles } from "../hooks/useTiles"
import { useMemo } from "react"


export default function Grid({mouseLeft}){
    const {sheetConfig,tiles} = useTiles()
    if(tiles){
    const width = tiles.width
    const height = tiles.height
    const grid_tiles = useMemo(()=>tiles.tiles.map((x,i)=>{
      return <Tile key={i} id={i} tile={x}/>
  }),[tiles])
    return (
        <div onMouseLeave={mouseLeft} 
        className="tile_grid" style={{gridTemplate: `repeat(${height},${sheetConfig.tile_size+"px"})/repeat(${width},${sheetConfig.tile_size+"px"})`}}>
            {grid_tiles}
        </div>
    )}
    else{return <div>No map</div>}
    
}