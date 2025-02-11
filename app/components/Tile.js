"use client"
import {React} from "react"
import { useTiles } from "@/app/hooks/useTiles";

export default function Tile({id,tile}) {
    const {tileHovered, Sprite} = useTiles()
    return (
      <div style={Sprite(tile.ground)} onMouseOver={()=>tileHovered(id)}>
        {(tile.object)?<div className="object" style={Sprite(tile.object)}/>:null}
      </div>      
    )
}