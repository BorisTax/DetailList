import React, { FC } from 'react';
interface NumberBoxProps {
    value:number
    title:string
    disabled?:boolean
    onChange:(value:number)=>void
}

const NumberBox: FC<NumberBoxProps> = (props: NumberBoxProps) => {
        return (
        <div style={{display:"flex",flexDirection:"row"}}>
        {props.title?<span style={{fontSize:"small",marginRight:"5px", whiteSpace: "nowrap"}}>{props.title}</span>:<></>}
        <input style={{width:"100%"}}
            disabled={props.disabled}
            value={props.value}
            onChange={(e)=>{
                        const v = Math.round(+e.target.value)
                        if (!isNaN(v)) {
                            props.onChange(v)
                        }
                        }}>
        </input>

        </div>
        );
    }
export default NumberBox

