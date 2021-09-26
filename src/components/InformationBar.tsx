import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import { StateActions } from '../actions/StateActions';

export type InformationProps = {
    order:string
    plan:string
    date:string
    disabled?:boolean
}

const InformationBar: FC<InformationProps> = (props: InformationProps) => {
        const dispatch = useDispatch()
        const info=props
        const style={display:"flex",alignItems:"center"}
        return <div style={{padding:"5px"}}>
            <div  style={style}>
            <span style={{marginRight:"5px"}}>{"Заказ:"}</span>
            <input value={info.order} 
                disabled={props.disabled}
                onChange={(e)=>{dispatch(StateActions.setInformation({...info,order:e.target.value}))}}/>
            </div>
            <div style={style}>
            <span style={{marginRight:"5px"}}>{"План:"}</span>
            <input value={info.plan} 
                disabled={props.disabled}
                onChange={(e)=>{
                    dispatch(StateActions.setInformation({...info,plan:e.target.value}))}}/>
            </div>
            <div  style={style}>
            <span style={{marginRight:"5px"}}>{"Дата:"}</span>
            <input type="date" value={info.date} 
                disabled={props.disabled}
                onChange={(e)=>{
                    if(e.target.value!=="") dispatch(StateActions.setInformation({...info,date:e.target.value}))}}/>
            </div>
            </div>
}


export default InformationBar