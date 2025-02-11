"use client"
import { useState } from "react";
import LoginForm from "../components/LoginForm";

export default function Page() {
    const [message,setMessage] = useState(null)
    const onResponse = (response) =>{
      setMessage(response.message)
      if(response.token && response.username){
        sessionStorage.setItem("username",response.username)
        sessionStorage.setItem("token",response.token)
      }
    }
    
  return (
      <div className="form-frame">
        <h1>Log in</h1>
        <LoginForm onResponse={onResponse}/>
        {(message)?<div>{message}</div>:null}
      </div>
  )
}





