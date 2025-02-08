"use client"

export default function MenuTab({name,id,selected,setSelected}){
    return (
        <div className={(selected)?"menu_tab selected":"menu_tab"} onClick={()=>{
            setSelected(id)}}>
            {name}
        </div>
    )
    
}