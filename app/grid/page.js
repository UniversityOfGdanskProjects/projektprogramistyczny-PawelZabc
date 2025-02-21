"use client"
import Grid from "../components/Grid";
import {React, useState, useEffect} from "react"
import ItemMenu from "../components/ItemMenu";

export default function Home() {
  const width = 50
  const height = 50
  const size = width*height
  const [tiles,setTiles] = useState([...Array(size)].map((x,i)=>{return {ground:"green",object:"none"}}))
  const [brush,setBrush] = useState(null)
  const [history,setHistory] = useState([])
  const [mouse,setMouse] = useState(false)
//   let hover = null
  const [hover,setHover] = useState(null)

  const tileClicked = (id) =>{
    // hover = id
    if (mouse){
        setHistory(prev=>[...prev,{tile:id,prev:tiles[id]}])
    // history.push({tile:id,new:brush.color,prev:tiles[id].color})
    // console.log(brush)
        setTiles(prev=>prev.map((x,i)=>(i===id)?{
            ground:(brush.type==="ground")?brush.color:x.ground,
            object:(brush.type==="object")?brush.color:x.object}:x))
    // console.log(history)
    // console.log(tiles)
    }
    
  }
  const getHover = () => {
    return hover
  }
//   console.log(history)
  const undo = () =>{
    if (history.length){
        const move = history.pop()
        setTiles(prev=>prev.map((x,i)=>(i===move.tile)?move.prev:x))
    }
    // console.log(history)
    
    // console.log(move)
    
  }
  const onMouseDown = (e) =>{
    setTiles(prev=>prev.map((x,i)=>(i===5)?{ground:"red",object:"blue"}:x))
    if (hover!==null) {
        setHistory(prev=>[...prev,{tile:id,new:brush.color,prev:tiles[id].ground,type:brush.type}])
    // history.push({tile:id,new:brush.color,prev:tiles[id].color})
        setTiles(prev=>prev.map((x,i)=>(i===id)?{color:brush.ground}:x))
        // tileClicked()
    }
    setMouse(true)
  }

  const onMouseUp = () => {
    setMouse(false)
  }
  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    // window.removeEventListener("keydown", ()=>undo);
    return () => {
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        // window.removeEventListener("keydown", ()=>undo);
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