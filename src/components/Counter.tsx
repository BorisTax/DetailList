import React from 'react';
import ToolButton from './ToolButton';

export default function Counter(props: ICounterProps){
    const decreaseButton=<ToolButton disabled={props.disabled} title={'-1'} id="decrease" onClick={()=>{
        if(props.value>props.min){
            props.setValue(props.value - 1)
        }
        }}/>
    const increaseButton=<ToolButton disabled={props.disabled} title={'+1'} id="increase" onClick={()=>{
        if(props.value<props.max){
            props.setValue(props.value + 1)
        }
        }}/>
    const decreaseTenButton=props.ten?<ToolButton disabled={props.disabled} title={'-10'} id="decrease" onClick={()=>{
        if((props.value-props.min)>10){
            props.setValue(props.value - 10)
        } 
         }}/>:<></> 
     const increaseTenButton=props.ten? < ToolButton disabled={props.disabled} title={'+10'} id="increase" onClick={()=>{
        if((props.max-props.value)>10) { 
            props.setValue(props.value + 10)
        }
        }}/>:<></>
    return <span style={{display:"flex",justifyContent:"center", alignItems:"center"}}>{props.title}{decreaseTenButton}{decreaseButton}{props.value}{increaseButton}{increaseTenButton}</span>
}

interface ICounterProps {
    disabled?:boolean
    title?:string
    value:number
    max:number
    min:number
    ten?:boolean
    setValue:(value:number)=>void
}