import React, { FC } from 'react';
interface ComboBoxProps {
    value:string
    items?:string[]
    size?:number
    title:string
    disabled?:boolean
    onChange:(index:number, value:string)=>void
}

const ComboBox: FC<ComboBoxProps> = (props: ComboBoxProps) => {
    const options = props.items?.map((i, index)=><option key={index} selected={props.value===i?true:false}>{i}</option>)
        return (
        <div style={{display:"flex",flexDirection:"row"}}>
        {props.title?<span style={{fontSize:"small",marginRight:"5px", whiteSpace: "nowrap"}}>{props.title}</span>:<></>}
        <select style={{width:"100%"}} size={!props.size?1:props.size} 
            disabled={props.disabled}
            onChange={(e)=>{
                        const index = props.items?.findIndex(i=>i === e.target.value)||0
                        props.onChange(index, e.target.value)
                        }}>
            {options}
        </select>

        </div>
        );
    }
export default ComboBox

