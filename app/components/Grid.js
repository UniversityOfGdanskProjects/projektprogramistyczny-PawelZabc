import Tile from "./Tile"


export default function Grid({width,height,tiles,tileClicked}){
    const tile_size = "100px"
    // const tiles= [...Array(size)].map((x,i)=>i)

    // console.log(tiles)
    return (
        <div className="tile_grid" style={{gridTemplate: `repeat(${width},${tile_size})/repeat(${height},${tile_size})`}}>
            {tiles.map((x,i)=>{
                return <Tile key={i} id={i} color={x.color} tileClicked={tileClicked}/>
            })}
        </div>
    )
    
}