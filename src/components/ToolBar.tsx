import React, {FormEvent, ReactNode } from 'react';

type ToolBarProps = {
    children?:ReactNode
    caption?:string
    noTitle?:boolean
    font?:string
    onClick?:(e: FormEvent)=>void
}

export default function ToolBar(props: ToolBarProps){
const cap=props.caption;
return <div className={"toolBar noselect"} onClick={(e)=>{if(props.onClick) props.onClick(e)}}>
       {!props.noTitle?
        <>
         <div className={"toolBarHeader"} style={{fontSize:props.font}}>
            <div className={"noselect"} >{cap}&nbsp;&nbsp;</div>
        </div>
        <hr/>
        </>
        :<></>}
        {props.children}
</div>
}

