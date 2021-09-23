import React, { ReactNode } from 'react';

export default function ToolButtonBar(props: IToolButtonBarProps){
    return <div style={{display:"flex", alignItems:"center"}}>
           {props.children}
        </div>
}

interface IToolButtonBarProps {
        children?: ReactNode
}