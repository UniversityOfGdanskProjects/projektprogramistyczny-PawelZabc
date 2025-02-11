"use client"
import {React, useState} from "react"
import Item from "./Item"
import SelectedItem from "./SelectedItem"
import MenuTab from "./MenuTab"
import { useTiles } from "../hooks/useTiles"


export default function ItemMenu(){
    const {sheetConfig} = useTiles()
    const [selectedMenu,setSelectedMenu] = useState(0)
    const items = sheetConfig.items
    
    return (
        <>
        <SelectedItem/>
        <div className="item_menu">
            <div className="menu_tabs">
                {items.map((x,i)=>{
                    return <MenuTab key={i} name={x.name} id={i} 
                    selected={(i===selectedMenu)} setSelected={setSelectedMenu}/>})}
            </div>
            <div className="menu_items">
            {items[selectedMenu].tiles.map((x,i)=>{
                return <Item key={i} menu={selectedMenu} item={x} id={i} />
            })}
            </div>
            
        </div>
        </>
    )
    
}