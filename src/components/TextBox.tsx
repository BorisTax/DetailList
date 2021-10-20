import React, { FC } from 'react';
interface TextBoxProps {
    value:string
    title:string
    disabled?:boolean
    exceptValuesList?:string[]
    placeholder?:string
    errorMessage?:string
    onChange:(value:string,error?:string)=>void
}

const TextBox: FC<TextBoxProps> = (props: TextBoxProps) => {
        return (
        <div style={{display:"flex",flexDirection:"row"}}>
        {props.title?<span style={{fontSize:"small",marginRight:"5px", whiteSpace: "nowrap"}}>{props.title}</span>:<></>}
        <input style={{width:"100%"}}
            disabled={props.disabled}
            placeholder={props.placeholder}
            required
            value={props.value}
            onChange={(e)=>{
                        const error = props.exceptValuesList?.find(v=>v===e.target.value)?props.errorMessage:''
                        props.onChange(e.target.value,  error)
                        }}>
        </input>

        </div>
        );
    }
export default TextBox

