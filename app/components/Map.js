"use client"
import {React, useState} from "react"
import DeleteButton from "./DeleteButton"
import Link from "next/link"
import DownloadButton from "./DownloadButton"

export default function Map({name}){
    const username = sessionStorage.getItem("username")
    return( <map className="map">
        <p>{name}</p>
        <Link href={`/maps/${username}/${name}`}>Open</Link>
        <DownloadButton mapname={name}></DownloadButton>
        <DeleteButton mapname={name}></DeleteButton>
        </map>)
    
}



