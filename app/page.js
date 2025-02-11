"use client"
import {React, useState, useLayoutEffect} from "react"
import Link from "next/link";

export default function Home() {
  const [name,setName] = useState(null)
  useLayoutEffect(()=>{
    setName(sessionStorage.getItem("username"))
  },[])

  return (
    <>
    <h1>Main page</h1>
    <div className="links">
      <div className="link"><Link href={"/login"}>Log in</Link></div>
      <div className="link"><Link href={"/signup"}>Sign up</Link></div>
      
      {(name)?<div className="link"><Link href={"/maps/"+name}>Maps</Link></div>:null}
    </div>
    </>
  );
}
