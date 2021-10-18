import React, { FC, useState } from 'react';
interface NumberBoxProps {
    value:number
    title:string
    disabled?:boolean
    onChange:(value:number)=>void
}

const NumberBox: FC<NumberBoxProps> = (props: NumberBoxProps) => {
        const [value, setValue] = useState(props.value)
        return (
        <div style={{display:"flex",flexDirection:"row"}}>
        {props.title?<span style={{fontSize:"small",marginRight:"5px", whiteSpace: "nowrap"}}>{props.title}</span>:<></>}
        <input style={{width:"100%"}}
            disabled={props.disabled}
            value={value}
            onChange={(e)=>{
                        const v = Math.round(+e.target.value)
                        if (!isNaN(v)) {
                            setValue(v)
                            props.onChange(value)
                        }
                        
                        }}>
        </input>

        </div>
        );
    }
export default NumberBox

