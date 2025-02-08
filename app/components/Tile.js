"use client"
import {React, useState} from "react"

export default function Tile({id,color,tileClicked}) {
    // const [color,setColor] = useState(color_init)


    return (
        <div className={`tile ${color}`} onMouseOver={()=>{
            tileClicked(id)
            // console.log(id%10,Math.floor(id/10))
            }}>
        </div>
    )
}