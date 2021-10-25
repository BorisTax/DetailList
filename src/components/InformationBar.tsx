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
        return <div style={{display:'grid',gridTemplateColumns:'50px min-content'}}>
            <div className='textRight'>{"Заказ:"}</div>
            <input value={info.order} 
                disabled={props.disabled}
                onChange={(e)=>{dispatch(StateActions.setInformation({...info,order:e.target.value}))}}/>
            <div className='textRight'>{"План:"}</div>
            <input value={info.plan} 
                disabled={props.disabled}
                onChange={(e)=>{
                    dispatch(StateActions.setInformation({...info,plan:e.target.value}))}}/>
            <div className='textRight'>{"Дата:"}</div>
            <input type="date" value={info.date} 
                disabled={props.disabled}
                onChange={(e)=>{
                    if(e.target.value!=="") dispatch(StateActions.setInformation({...info,date:e.target.value}))}}/>
            </div>
}


export default InformationBar