import React, { FC } from 'react';
interface TextBoxProps {
    value:string
    title:string
    disabled?:boolean
    onChange:(value:string)=>void
}

const TextBox: FC<TextBoxProps> = (props: TextBoxProps) => {
        return (
        <div style={{display:"flex",flexDirection:"row"}}>
        {props.title?<span style={{fontSize:"small",marginRight:"5px", whiteSpace: "nowrap"}}>{props.title}</span>:<></>}
        <input style={{width:"100%"}}
            disabled={props.disabled}
            value={props.value}
            onChange={(e)=>{
                        props.onChange(e.target.value)
                        }}>
        </input>

        </div>
        );
    }
export default TextBox

