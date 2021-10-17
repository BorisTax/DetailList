import React, { ReactNode } from 'react';

export default function InputLineBar(props: IToolButtonBarProps){
    return <>
        <div style={{display:"flex",justifyContent:"stretch", alignItems:"center"}}>
                {props.children}
                
        </div>
        </>
}

interface IToolButtonBarProps {
        children?: ReactNode
}