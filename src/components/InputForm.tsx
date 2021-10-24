import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MessagesActions } from '../actions/MessagesActions';
import { TYPE_CHECKBOX, TYPE_NUMBER, TYPE_STRING } from '../data/inputforms';
import CheckBox from './CheckBox';
import NumberBox from './NumberBox';
import TextBox from './TextBox';

export type InputFormProps = {
    title:string
    ext?:any
    inputform:[]
    onOkAction:(values:any[], ext:any)=>void
}

const InputForm = (props: InputFormProps) => {
        const dispatch = useDispatch()
        const [state, setState] = useState({values:props.inputform.map((input: any)=>input.value),error:''})
        const controls = props.inputform.map((input: any, index: number)=>{
          switch(input.type){
            case TYPE_STRING:
              return <TextBox 
                      title={input.caption} 
                      value={state.values[index]} 
                      exceptValuesList = {input.ext?.exceptList||[]}
                      placeholder = {input.ext?.placeholder}
                      errorMessage = {input.ext?.errorMessage}
                      onChange={(value, error)=>{state.values[index] = value; setState(()=>({error:error||'',values:[...state.values]}))}}
                      />
            case TYPE_NUMBER:
              return <NumberBox title={input.caption} value={state.values[index]} onChange={(value)=>{
                state.values[index] = value; setState(()=>({...state,values:[...state.values]}))}}/>
            case TYPE_CHECKBOX:
              return <CheckBox title={input.caption} value={state.values[index]} onChange={(value)=>{
                state.values[index] = value; setState(()=>({...state, values:[...state.values]}))}}/>
            default:
            }
        })
        return <div className='modalContainer  noselect'>
                    <div className={"toolBar toolBarDialog"} onClick={(e)=>{e.stopPropagation()}}>
                      <div>{props.title}</div>
                      <hr/>
                      <form onSubmit={(e)=>{
                          e.preventDefault();
                          dispatch(props.onOkAction(state.values, props.ext));
                          dispatch(MessagesActions.hideDialogs())}}
                          >
                        <div>
                          {controls}
                        </div>

                        <div className="flexCenter">
                        <button type='submit' disabled={!!state.error} >OK</button>
                        <button onClick={()=>{dispatch(MessagesActions.hideDialogs())}}>{'Отмена'}</button>
                        </div>
                        </form>
                        {state.error&&<div style={{color:'red'}}>{state.error}</div>}
                    </div>
                </div> 
}

export default InputForm;
