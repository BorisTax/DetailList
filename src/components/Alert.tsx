import React from 'react';
import '../Graph.css';
import '../Buttons.css';
import { useDispatch, useSelector } from 'react-redux';
import { Messages, RootState } from '../reducers';
import { MessagesActions } from '../actions/MessagesActions';

const Alert = () => {
        const state: Messages = useSelector((store: RootState) => store.messages)
        const dispatch = useDispatch()
        return ( 
            <div className='modalContainer  noselect'>
                    <div className={"toolBar toolBarDialog"} onClick={(e)=>{e.stopPropagation()}}>
                        <div>
                        {state.title}
                        </div>
                        <div className="flexCenter">
                        <button onClick={()=>{dispatch(MessagesActions.hideDialogs())}}>OK</button>
                        </div>    
                    </div>
                </div>)
}
export default Alert

