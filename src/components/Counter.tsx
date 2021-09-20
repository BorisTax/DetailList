import React from 'react';
import ToolButton from './ToolButton';

export default function Counter(props: ICounterProps){
    const decreaseButton=<ToolButton disabled={props.disabled} id="decrease" onClick={()=>{
        if(props.value>props.min){
            props.setValue(props.value-1)
        }
        }}/>
    const increaseButton=<ToolButton disabled={props.disabled} id="increase" onClick={()=>{
        if(props.value<props.max){
            props.setValue(props.value+1)
        }
        }}/>
    return <span style={{display:"flex",alignItems:"center"}}>{decreaseButton}{props.value}{increaseButton}</span>
}

interface ICounterProps {
    disabled?:boolean
    value:number,
    max:number,
    min:number,
    setValue:(value:number)=>number
}