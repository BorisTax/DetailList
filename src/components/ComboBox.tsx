import React, { FC, ReactNode } from 'react';

interface ComboBoxProps {
    items?:string[]
    size?:number
    title:string
    onChange:(value:string)=>void
}

const ComboBox: FC<ComboBoxProps> = (props: ComboBoxProps) => {
    const options = props.items?.map(i=><option key={i}>{i}</option>)
        return (
        <div style={{display:"flex",flexDirection:"row"}}>
        <span>{props.title}</span>
        <select style={{width:"100%"}} size={!props.size?1:props.size} onChange={(e)=>{props.onChange(e.target.value)}}>
            {options}
        </select>

        </div>
        );
    }
export default ComboBox

