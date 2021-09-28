import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateActions } from '../actions/StateActions';
import { RootState } from '../reducers';
import ComboBox from './ComboBox';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
import ToolButtonBar from './ToolButtonBar';

const PrintPreviewBar: FC = (props) => {
    const state = useSelector((store: RootState) => store.state)
    const [printState, setPrintState] = useState({fontSize:`14`,orientation:true})
    const dispatch = useDispatch()
    const fonts = Array(15).fill(0).map((_, i)=>`${i+7}`)
        return (
        <>
        <ToolBar caption={"Печать"} >
            <ToolButtonBar>
                <ToolButton id="preview" onClick={()=>{dispatch(StateActions.printPdf(printState))}}/>
                <ToolButton id="orientation" onClick={()=>{
                    const orientation = !printState.orientation
                    setPrintState({...printState, orientation})
                    dispatch(StateActions.printPdf({...printState, orientation:orientation?'p':'l'}))}
                    }/>
                <ComboBox items={fonts} title='' value={printState.fontSize} onChange={(_, value)=>{
                                        setPrintState({...printState, fontSize: value})
                                        dispatch(StateActions.printPdf({...printState, fontSize: value}))
                }}/>
            </ToolButtonBar>
            <iframe id="printFrame" name="printFrame"
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
        </>
        );
    }
export default PrintPreviewBar

