import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessagesActions } from '../actions/MessagesActions';
import { StateActions } from '../actions/StateActions';

import { TUnit } from '../data/types';
import { RootState, State } from '../reducers';
import Counter from './Counter';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
import ToolButtonBar from './ToolButtonBar';

const UnitListBar: FC = (props) => {
    const state: State = useSelector((store: RootState)=>store.state)
    const [selectedRows,setSelectedRows] = useState(state.unitList.map(u=>false))
    useEffect(()=>{setSelectedRows(state.unitList.map(()=>false))},[state.unitList])
    const setSelected = (index: number, shift: boolean) => {
        const selRows = [...selectedRows]
        if(!shift) selRows.fill(false)
        selRows[index] = !selRows[index]
        return selRows
    }
    const dispatch = useDispatch()
    
    const header=<tr>
            <th>№</th>
            <th>Вид</th>
            <th>Модуль</th>
            <th>Кол-во</th>
            <th>Материал 1</th>
            <th>Материал 2</th>
            </tr>
    const units = state.unitList.map((u: TUnit, index:number) => {
            return <tr key={index} className={selectedRows[index]?`trSelected`:''} onClick={(e) => setSelectedRows(setSelected(index, e.shiftKey))}>
                    <td className="tdLeft">{index+1}</td>
                    <td className="tdLeft">{u.groupName}</td>
                    <td className="tdLeft">{u.name}</td>
                    <td><Counter value={u.count} min={1} max={1000} setValue={(value)=>dispatch(StateActions.setUnitCountInPlan(index,value))} /></td>
                    {u.materials.map((m, index)=><td key={index}>{m}</td>)}
                </tr>
    })
        return (
        <>
        <ToolBar caption={"План"}>
            <ToolButtonBar>
                <ToolButton id={"new"} title={"Очистить список"} onClick={() => dispatch(MessagesActions.confirmClearingUnitListInPlan())} disabled={state.unitList.length===0}/>
                <ToolButton id={"delete"} title={"Удалить выделенные строки"} onClick={() => dispatch(MessagesActions.confirmDeletingUnitsFromPlan(selectedRows))} disabled={selectedRows.every(r=>!r)||(selectedRows.length===0)}/>
            </ToolButtonBar>
            <table style={{fontSize:"small"}}>
                {header}
                <tbody>
                  {units}  
                </tbody>
            </table>
        </ToolBar>
        </>
        );
    }
export default UnitListBar

