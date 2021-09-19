import React, { FC, ReactNode } from 'react';

interface ComboBoxProps {
    items?:string[]
    size?:number
    onChange:(value:string)=>void
}

const ComboBox: FC<ComboBoxProps> = (props: ComboBoxProps) => {
    const options = props.items?.map(i=><option key={i}>{i}</option>)
        return (
        <>
        <select size={!props.size?1:props.size} onChange={(e)=>{props.onChange(e.target.value)}}>
            {options}
        </select>
        </>
        );
    }
export default ComboBox

