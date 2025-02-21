"use client"
import {React, useState ,useEffect, useLayoutEffect} from "react"
import Item from "./Item"
import SelectedItem from "./SelectedItem"
import MenuTab from "./MenuTab"


export default function ItemMenu({setBrush}){
    const [selectedMenu,setSelectedMenu] = useState("ground")
    const [selectedItem,setSelectedItem] = useState({name:"grass",color:"green",type:"ground"})
    useEffect(
        ()=>{setBrush(selectedItem)}
            ,[selectedItem])
    // useEffect(
    //     ()=>{console.log("re-rendered")}
    // )
    const items = {
    "ground":[
        {name:"grass",color:"green",type:"ground"},
        {name:"water",color:"blue",type:"ground"},
        {name:"lava",color:"red",type:"ground"},
        {name:"wall",color:"brown",type:"ground"},
        {name:"remove ground",color:"none",type:"ground"}
    ],
    "objects":[{name:"tree",color:"green",type:"object"},
        {name:"shield",color:"blue",type:"object"},
        {name:"campfire",color:"red",type:"object"},
        {name:"chest",color:"brown",type:"object"},
        {name:"remove object",color:"none",type:"object"}
    ],
    "enemies":[{name:"goblin",color:"green",type:"object"},
        {name:"blue slime",color:"blue",type:"object"},
        {name:"red slime",color:"red",type:"object"}]
}
// console.log(Object.keys(items))
    
    return (
        <div id="top">
        <SelectedItem item={selectedItem}/>
        <div className="item_menu">
            <div className="menu_tabs">
                {Object.keys(items).map((x,i)=>{
                    return <MenuTab key = {i} name={x} id={x} selected={(x===selectedMenu)} setSelected={setSelectedMenu}/>
                })}
                
            </div>
            <div className="menu_items">
            {items[selectedMenu].map((x,i)=>{
                return <Item key={i} item={x} id={i} selected={(x.name===selectedItem.name)} setSelected={setSelectedItem} />
            })}
            </div>
            
        </div>
        </div>
    )
    
}