"use client"
import Grid from "../components/Grid";
import {React, useState, useEffect} from "react"
import ItemMenu from "../components/ItemMenu";

export default function Home() {
  const width = 50
  const height = 50
  const size = width*height
  const [tiles,setTiles] = useState([...Array(size)].map((x,i)=>{return {color:"green",object:"none"}}))
  const [brush,setBrush] = useState(null)
  const [history,setHistory] = useState([])
  const [mouse,setMouse] = useState(false)
//   const 

  const tileClicked = (id) =>{
    if (mouse){
        setHistory(prev=>[...prev,{tile:id,new:brush.color,prev:tiles[id].color}])
    // history.push({tile:id,new:brush.color,prev:tiles[id].color})
    setTiles(prev=>prev.map((x,i)=>(i===id)?{color:brush.color}:x))
    // console.log(history)
    // console.log(tiles)
    }
    
  }
//   console.log(history)
  const undo = () =>{
    if (history.length){
        const move = history.pop()
        setTiles(prev=>prev.map((x,i)=>(i===move.tile)?{color:move.prev}:x))
    }
    // console.log(history)
    
    // console.log(move)
    
  }

  const onMouseDown = () =>{
    setMouse(true)
  }

  const onMouseUp = () => {
    setMouse(false)
  }

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.removeEventListener("keydown", ()=>undo);
    return () => {
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("keydown", ()=>undo);
    }
}, []);


  return (
    <div>
        <button onClick={undo}>undo</button>
      <ItemMenu setBrush={setBrush}/>
      <Grid width={width} height={height} tiles={tiles} tileClicked={tileClicked}/>
    </div>
    
  );
}