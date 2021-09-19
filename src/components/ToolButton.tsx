import React, {useState} from 'react';

export default function ToolButton(props: IToolButtonProps){
    const [pressed, setPressed]=useState(false)
    let className=props.disabled?"buttonDisabled":"button"
    className+=pressed?" buttonDown":" buttonUp";
    return <div
                id={props.id}
                className={className+" noselect"}
                title={props.title}
                onClick={()=>{if(!props.disabled)props.onClick()}}
                onMouseDown={()=>{setPressed(true)}}
                onMouseUp={()=>{setPressed(false)}}
                onMouseLeave={()=>{setPressed(false)}}
                >
        </div>

}

interface IToolButtonProps {
        disabled?:boolean
        id:string
        title?:string
        onClick:()=>void

}