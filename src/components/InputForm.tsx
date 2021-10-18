import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MessagesActions } from '../actions/MessagesActions';
import { TYPE_CHECKBOX, TYPE_NUMBER, TYPE_STRING } from '../data/inputforms';
import CheckBox from './CheckBox';
import NumberBox from './NumberBox';
import TextBox from './TextBox';

export type InputFormProps = {
    title:string
    inputform:[]
    onOkAction:()=>void
}

const InputForm = (props: InputFormProps) => {
        const dispatch = useDispatch()
        const [values, setValues] = useState(props.inputform.map((input: any)=>input.value))
        const controls = props.inputform.map((input: any, index: number)=>{
          switch(input.type){
            case TYPE_STRING:
              return <TextBox title={input.caption} value={values[index]} onChange={(value)=>{
                values[index] = value; setValues(()=>[...values])}}/>
            case TYPE_NUMBER:
              return <NumberBox title={input.caption} value={values[index]} onChange={(value)=>{
                values[index] = value; setValues(()=>[...values])}}/>
            case TYPE_CHECKBOX:
              return <CheckBox title={input.caption} value={values[index]} onChange={(value)=>{
                values[index] = value; setValues(()=>[...values])}}/>
            default:
            }
        })
        return <div className='modalContainer  noselect'>
                    <div className={"toolBar toolBarDialog"} onClick={(e)=>{e.stopPropagation()}}>
                      <div>{props.title}</div>
                      <hr/>
                        <div>
                          {controls}
                        </div>

                        <div className="flexCenter">
                        <button onClick={()=>{dispatch(props.onOkAction());dispatch(MessagesActions.hideDialogs())}}>OK</button>
                        <button onClick={()=>{dispatch(MessagesActions.hideDialogs())}}>{'Отмена'}</button>
                        </div>
                    </div>
                </div> 
}

export default InputForm;
