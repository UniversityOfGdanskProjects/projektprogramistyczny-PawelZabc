"use client"

export default function SelectedItem({item}){
    return (
        <div className={"item"}>
            selected:
            <div className={`color ${item.color}`}></div>
            {item.name}
            </div>
    )
    
}