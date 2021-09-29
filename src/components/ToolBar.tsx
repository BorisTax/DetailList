import React, {FormEvent, ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { HRStyle } from '../styles/styles';
type ToolBarProps = {
    children?:ReactNode
    caption?:string
    noTitle?:boolean
    font?:string
    onClick?:(e: FormEvent)=>void
}

export default function ToolBar(props: ToolBarProps){
const cap=props.caption;
return <div className={"toolBar noselect col-xs-12 col-sm-12 col-md-6 col-lg-6"} onClick={(e)=>{if(props.onClick) props.onClick(e)}}>
       {!props.noTitle?
        <>
         <div className={"toolBarHeader"}>
            {cap}
        </div>
        <hr/>
        </>
        :<></>}
        {props.children}
</div>
}

