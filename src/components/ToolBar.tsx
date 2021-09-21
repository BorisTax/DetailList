import React, {ReactNode, useState} from 'react';

type ToolBarProps = {
    children?:ReactNode
    caption?:string
    noTitle?:boolean
    font?:string
}

export default function ToolBar(props: ToolBarProps){
const cap=props.caption;
return <div className={"toolBar noselect"}>
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

