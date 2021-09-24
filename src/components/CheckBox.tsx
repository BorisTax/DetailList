import React, { FC } from 'react';
interface CheckBoxProps {
    value:boolean
    title:string
    onChange:(value:boolean)=>void
}

const CheckBox: FC<CheckBoxProps> = (props: CheckBoxProps) => {
        return (
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <input type="checkbox" checked={props.value} onChange={(e)=>props.onChange(e.target.checked)}/>
        <span style={{fontSize:"small",marginRight:"5px", whiteSpace: "nowrap"}}>{props.title}</span>
        </div>
        );
    }
export default CheckBox

