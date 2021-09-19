import React, {ReactNode, useState} from 'react';

type ToolBarProps = {
    children?:ReactNode
    caption?:string
    noTitle?:boolean
    font?:string
}

export default function ToolBar(props: ToolBarProps){
const [expanded,setExpanded]=useState(true)
const cap=props.caption;
const contents =  expanded?props.children:<></>
return <div className={"toolBar noselect"}>
       {!props.noTitle?
        <>
         <div className={"toolBarHeader"} style={{fontSize:props.font}}>
            <div className={"noselect"} >{cap}&nbsp;&nbsp;</div>
            <div id={expanded?"minimize":"maximize"} className={"toolBarHeaderButton"} onClick={()=>{setExpanded(!expanded)}}></div>
        </div>
        <hr/>
        </>
        :<></>}
        {contents}
</div>
}

