"use client"
import {React, useState} from "react"
import GridObject from "./gridObject"

export default function Tile({id,tile,tileClicked}) {
    // const [color,setColor] = useState(color_init)


    return (
        <div className={`tile ${tile.ground}`} onMouseOver={()=>{
            tileClicked(id)
            
            // console.log(id%10,Math.floor(id/10))
            }}>
                <GridObject object={tile.object}/>
        </div>
    )
}