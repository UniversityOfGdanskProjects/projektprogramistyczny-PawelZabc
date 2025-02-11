"use client"
import {React, useState, useEffect, useRef} from "react"
import MapForm from "@/app/components/MapForm";
import Map from "@/app/components/Map";

const fetchMaps = async (username)=>{
    const token = sessionStorage.getItem("token")
    const response = await fetch(`/api/maps/${username}`, {
        method: "GET",
        headers: {
            Authorisation: `Bearer ${token}`
        }
    });
    return await response.json()
}



export default function Home() {
    const [maps,setMaps] = useState(null)
    const name = useRef()
    async function processMaps(files){
        const maps = await files
        setMaps(await maps.files.map(x=>x.slice(0, -5)))
    }

    useEffect(()=>{
        name.current = sessionStorage.getItem("username")
        if(name.current){
        processMaps(fetchMaps(name.current))}
        else{setMaps("nope")}
    },[])
    const onSubmit = async (values) => {
        const token = sessionStorage.getItem("token")
            const response = await fetch(`/api/maps/${name.current}`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    Authorisation: `Bearer ${token}`
                }
            }).then(async x=>await x.json()).catch(async x=>await x.json())
            Router.reload()
    }

  return (
    <><h1>Maps</h1>
    <div className="map_list">
        {(maps)?
        (maps==="nope")?"Not logged in":
        <>
        {maps.map((x,i)=>{
            return <Map key={i} name={x}/>
        })}
        <MapForm onSubmit={onSubmit}>
        </MapForm></>:"loading..."}
        
    </div>
    </>
  );
}