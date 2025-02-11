"use client";
import React, { createContext, useState, useContext, useRef, useReducer} from "react";
import sheetConfig from "@/app/spriteSheetConfig.json";

const TilesContext = createContext();

export const useTiles = () => useContext(TilesContext);


export default function TilesProvider({ children,params}) {
    const [brush,setBrush] = useState({sprite:sheetConfig.default_sprite,type:"ground"})
    const hover = useRef(null)
    const mouse = useRef(false)
    const history = useRef([])
    const [tiles,setTiles] = useReducer((prev,payload)=>{
        switch(payload.type){
            case "init":
                return payload.value
            case "brush":
                const id = payload.tile
                history.current.push({tile:id,prev:prev.tiles[id]})
                return {...prev,tiles:prev.tiles.map((x,i)=>(i===id)?{
                    ground:(brush.type==="ground")?brush.sprite:x.ground,
                    object:(brush.type==="object")?brush.sprite:x.object}:x)}
            case "undo":
                if (history.current.length){
                    const move = history.current.pop()
                    return {...prev,tiles:prev.tiles.map((x,i)=>(i===move.tile)?move.prev:x)}}
                else{return prev}
            default:
                return prev
        }
    },[])
    

    const tileHovered = (id) =>{
        hover.current = id
        if (mouse.current){
            setTiles({type:"brush",tile:id})
        }}
    const Sprite = ( pos ) => {
            if (!pos){return null}
            const spriteSize = sheetConfig.tile_size
            const spriteSheetUrl = "/spriteSheet.png"
            const spriteStyle = {
              width: spriteSize,
              height: spriteSize,
              backgroundImage: `url(${spriteSheetUrl})`,
              backgroundPosition: `-${pos[1] * spriteSize}px -${pos[0] * spriteSize}px`, // Position to show the correct sprite
              backgroundSize: `${spriteSize * sheetConfig.sheet_width}px ${sheetConfig.sheet_height * spriteSize}px`, // Size of the whole sprite sheet (assuming a 3x3 grid)
            };
            return spriteStyle
          };

    return (
        <TilesContext.Provider value={{params, brush,tiles, setTiles, setBrush, sheetConfig ,tileHovered,hover, mouse, Sprite}}>
            {children}
        </TilesContext.Provider>
    );
}