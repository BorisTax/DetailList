import React, { FC, useState } from 'react';
import { useDispatch} from 'react-redux';
import { StateActions } from '../actions/StateActions';
import ComboBox from './ComboBox';
import Counter from './Counter';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
import ToolButtonBar from './ToolButtonBar';

const PrintPreviewBar = (props: any) => {
    const [printState, setPrintState] = useState({fontSize:`14`,orientation:true})
    const dispatch = useDispatch()
    const fonts = Array(15).fill(0).map((_, i)=>`${i+7}`)
        return (
        <ToolBar caption={"Печать"} >
            <ToolButtonBar>
                <ToolButton id="preview" onClick={()=>{dispatch(StateActions.printPdf(printState))}}/>
                <ToolButton id="orientation" onClick={()=>{
                    setPrintState({...printState, orientation:!printState.orientation});
                    dispatch(StateActions.printPdf({...printState, orientation:!printState.orientation}))
                    }
                    }/>
                <div style={{paddingLeft:"10px"}}>
                <ComboBox items={fonts} title='Шрифт' value={printState.fontSize} onChange={(_, value)=>{
                                        setPrintState({...printState, fontSize: value})
                                        dispatch(StateActions.printPdf({...printState, fontSize: value}))
                }}/>
                </div>

            </ToolButtonBar>
            <iframe id="printFrame" name="printFrame" title="printFrame"
            onLoad={
                function(){
                    const frame = document.getElementById('printFrame')
                    if(frame) {
                        frame.style.width = '100%';
                        frame.style.height = '1000px'
                    }

                }
            }
            />
        </ToolBar>
        );
    }
export default PrintPreviewBar

