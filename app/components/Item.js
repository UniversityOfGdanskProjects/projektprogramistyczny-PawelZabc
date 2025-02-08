"use client"
import {React, useState} from "react"

export default function Item({item,setBrush,id,selected,setSelected}){
    return (
        <div className={(selected)?"item selected":"item"} onClick={()=>{
            setSelected(id)}}>
            <div className={`color ${item.color}`}></div>
        </div>
    )
    
}