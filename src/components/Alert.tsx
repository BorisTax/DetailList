import React,{ FC } from 'react';
import '../Graph.css';
import '../Buttons.css';
//import {showAlert, blink} from '../actions/AppActions';
import { connect } from 'react-redux';

const Alert: FC = (props) => {

        return ( 
            <div className='modalContainer  noselect'>
                    <div className={"toolBar"} onClick={(e)=>{e.stopPropagation()}}>
                        <div>
                        {//props.captions.messages[this.props.messageKey]
                        }
                        </div>
                        <div className="flexCenter">
                        <button onClick={()=>{
                            //this.props.hideAlert()}
                        }}
                            >OK</button>
                        </div>    
                    </div>
                </div>)
}
export default Alert

