import React from 'react';
import '../styles/App.css';
import { useDispatch } from 'react-redux';
import { MessagesActions } from '../actions/MessagesActions';

export type AlertProps = {
    title:string
}

const Alert = (props: AlertProps) => {
        const dispatch = useDispatch()
        return ( 
            <div className='modalContainer  noselect'>
                    <div className={"toolBar toolBarDialog"} onClick={(e)=>{e.stopPropagation()}}>
                        <div>
                        {props.title}
                        </div>
                        <div className="flexCenter">
                        <button onClick={()=>{dispatch(MessagesActions.hideDialogs())}}>OK</button>
                        </div>    
                    </div>
                </div>)
}
export default Alert

