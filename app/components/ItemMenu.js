"use client"
import {React, useState ,useEffect} from "react"
import Item from "./Item"


export default function ItemMenu({setBrush}){
    const [selected,setSelected] = useState(0)
    useEffect(
        
        ()=>{setBrush(items[selected])}
            ,[selected])

    const items = [
        {name:"grass",color:"green"},
        {name:"water",color:"blue"},
        {name:"lava",color:"red"},
        {name:"wall",color:"brown"}
    ]
    
    return (
        <div className="item_menu">
            {items.map((x,i)=>{
                return <Item key={i} item={x} id={i} selected={(i===selected)} setSelected={setSelected} />
            })}
        </div>
    )
    
}