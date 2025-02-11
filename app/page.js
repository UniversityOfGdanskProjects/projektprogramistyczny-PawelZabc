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
    <div>
      <Link href={"/login"}>Log in</Link>
      <Link href={"/signup"}>Sign up</Link>
      {(name)?<Link href={"/maps/"+name}>Maps</Link>:null}
      
    </div>
    </>
  );
}
