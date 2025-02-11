"use client"
import { useTiles } from "../hooks/useTiles"

export default function SelectedItem(){
    const {Sprite,brush,setBrush} = useTiles()
    return (
        <div className={"item"} onClick={()=>setBrush({type:"object",sprite:null,name:"remove"})}>
            selected:
            <div style={Sprite(brush.sprite)}></div>
            {brush.name}
            </div>
    )
    
}