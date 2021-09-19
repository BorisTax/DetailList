import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import { StateActions } from '../actions/StateActions';
import ToolBar from './ToolBar';

type InformationProps = {
    order:string
    plan:string
    date:string
    disabled?:boolean
}

const InformationBar: FC<InformationProps> = (props: InformationProps) => {
        const dispatch = useDispatch()
        const info=props
        const style={display:"flex",justifyContent:"flex-end",alignItems:"center"}
        return <ToolBar caption={"Общая информация"}>
            <div  style={style}>
            <span>{"Заказ: "}</span>
            <input value={info.order} 
                disabled={props.disabled}
                onChange={(e)=>{dispatch(StateActions.setInformation({...info,order:e.target.value}))}}/>
            </div>
            <div style={style}>
            <span>{"План: "}</span>
            <input value={info.plan} 
                disabled={props.disabled}
                onChange={(e)=>{
                    dispatch(StateActions.setInformation({...info,plan:e.target.value}))}}/>
            </div>
            <div  style={style}>
            <span>{"Дата: "}</span>
            <input type="date" value={info.date} 
                disabled={props.disabled}
                onChange={(e)=>{
                    if(e.target.value!=="") dispatch(StateActions.setInformation({...info,date:e.target.value}))}}/>
            </div>
        </ToolBar>
    
}


export default InformationBar