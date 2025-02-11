"use client"
import {React, useState} from "react"
import { useTiles } from "../hooks/useTiles"

export default function Item({item,id,menu}){
    const {Sprite,setBrush,brush} = useTiles()
    const selected = (brush.sprite&&menu===brush.sprite[0]&&id===brush.sprite[1])
    return (
        <div className={(selected)?"item selected":"item"} onClick={()=>{
            setBrush({sprite:[menu,id],type:item.type,name:item.name})}}>
            <div style={Sprite([menu,id])}></div>
            {item.name}
        </div>
    )
    
}
