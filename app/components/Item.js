"use client"
import {React, useState} from "react"

export default function Item({item,id,selected,setSelected}){
    return (
        <div className={(selected)?"item selected":"item"} onClick={()=>{
            setSelected(item)}}>
            <div className={`color ${item.color}`}></div>
            {item.name}

        </div>
    )
    
}