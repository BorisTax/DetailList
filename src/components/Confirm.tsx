import React from 'react';
import { useDispatch } from 'react-redux';
import { MessagesActions } from '../actions/MessagesActions';

export type ConfirmProps = {
    title:string
    onOkAction:()=>void
}

const Confirm = (props: ConfirmProps) => {
        const dispatch = useDispatch()
        return <div className='modalContainer  noselect'>
                    <div className={"toolBar toolBarDialog"} onClick={(e)=>{e.stopPropagation()}}>
                      <div>{props.title}</div>
                        <div className="flexCenter">
                        <button onClick={()=>{dispatch(props.onOkAction());dispatch(MessagesActions.hideDialogs())}}>OK</button>
                        <button onClick={()=>{dispatch(MessagesActions.hideDialogs())}}>{'Отмена'}</button>
                        </div>
                    </div>
                </div> 
}

export default Confirm;
