import React, { FC, ReactNode } from 'react';

interface ComboBoxProps {
    items?:string[]
    size?:number
    title:string
    onChange:(value:number)=>void
}

const ComboBox: FC<ComboBoxProps> = (props: ComboBoxProps) => {
    const options = props.items?.map((i, index)=><option key={index}>{i}</option>)
        return (
        <div style={{display:"flex",flexDirection:"row"}}>
        <span style={{fontSize:"small",marginRight:"5px"}}>{props.title}</span>
        <select style={{width:"100%"}} size={!props.size?1:props.size} 
            onChange={(e)=>{
                        const index = props.items?.findIndex(i=>i==e.target.value)||0
                        props.onChange(index)
                        }}>
            {options}
        </select>

        </div>
        );
    }
export default ComboBox

