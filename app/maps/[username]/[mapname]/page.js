"use client"
import Grid from "@/app/components/Grid";
import {React, useState, useEffect } from "react"
import ItemMenu from "@/app/components/ItemMenu";
import { useTiles } from "@/app/hooks/useTiles";
import Link from "next/link";



export default function Home() {
    const [message,setMessage] = useState(null)
    const [loading,setLoading] = useState(true)
    const {setTiles,mouse,hover,params,tiles} = useTiles()

    async function processMap(tiles){
        if (tiles){const map = await tiles
            setTiles({type:"init",value:map})
            setLoading(false)}
        
    }

    const fetchMap = async ()=>{
        const mapname = params.mapname
        const username = params.username
        const token = sessionStorage.getItem("token")
        const response = await fetch(`/api/maps/${username}/${mapname}`, {
            method: "GET",
            headers: {
                Authorisation: `Bearer ${token}`
            }});
        if(response.ok){return await response.json()}
    }
    useEffect(()=>{
        processMap(fetchMap())
    },[])
  

  const save=async()=>{
    const mapname = params.mapname
        const username = params.username
        const token = sessionStorage.getItem("token")
        const response = await fetch(`/api/maps/${username}/${mapname}`, {
            method: "PUT",
            body: JSON.stringify(tiles),
            headers: {
                Authorisation: `Bearer ${token}`
            }});
        if(response.ok){
            const message = await response.json()
            setMessage(message.message)}
  }

  const undo = (e) =>{
    if (e.code === 'KeyZ' && e.ctrlKey){
        setTiles({type:"undo"})
    }
    
  }
  const onMouseDown = (e) =>{
    const id = hover.current
    if (id!==null) {
        setTiles({type:"brush",tile:id})
    }
    mouse.current=true
  }

  const onMouseUp = () => {
    mouse.current=false
  }
  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("keydown", undo);
    return () => {
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("keydown", undo);
    }
}, []);

  return (
    <div>
      {(loading)?"loading...":
      <>
      <div className="top">
        <ItemMenu/>
        <button onClick={save}>Save</button>
        <div>{(message)?message:null}</div>
        <Link href={`/maps/${sessionStorage.getItem('username')}`}>Return</Link>
      </div>
      <Grid mouseLeft={()=>{hover.current=null}}/>
        </>}
    </div>
    
  );
}