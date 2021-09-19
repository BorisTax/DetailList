import React, { FC } from 'react';

const Confirm:FC = (props) => {

        return <div className='modalContainer  noselect'>
                    <div className={"toolBar"} onClick={(e)=>{e.stopPropagation()}}>
                      <div>{
                      //this.props.captions.messages[this.props.messageKey]
                    }</div>
                        <div className="flexCenter">
                        <button onClick={()=>{
                            //this.props.hideConfirm()
                        }}
                            >OK</button>
                        <button onClick={()=>{}}>{}</button>
                        </div>
                    </div>
                </div> 
}

export default Confirm;
