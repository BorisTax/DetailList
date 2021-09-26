import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessagesActions } from '../actions/MessagesActions';
import { StateActions } from '../actions/StateActions';

import { TUnit } from '../data/types';
import { RootState, State } from '../reducers';
import Counter from './Counter';
import InformationBar, { InformationProps } from './InformationBar';
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
    const moveSelectedRowUp = (index: number) => {
        const selRows = [...selectedRows]
        selRows[index-1]=true
        selRows[index]=false
        return selRows
    } 
    const moveSelectedRowDown = (index: number) => {
        const selRows = [...selectedRows]
        selRows[index+1]=true
        selRows[index]=false
        return selRows
    } 
    const onlySelectedRowIndexes = selectedRows.map((r,index)=>r?index:-1).filter(r=>r>=0)
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
            const count=(selectedRows[index]&&(onlySelectedRowIndexes.length===1))?<Counter value={u.count} min={1} max={1000} setValue={(value)=>dispatch(StateActions.setUnitCountInPlan(index,value))} />:u.count
            return <tr key={index} className={selectedRows[index]?`trSelected`:''} onClick={(e) => {setSelectedRows(setSelected(index, e.shiftKey));e.stopPropagation()}}>
                    <td className="tdLeft">{index+1}</td>
                    <td className="tdLeft">{u.groupName}</td>
                    <td className="tdLeft">{u.name}</td>
                    <td>{count}</td>
                    {u.materials.map((m, index)=><td key={index}>{m}</td>)}
                </tr>
    })
    const info: InformationProps = {...state.information}
        return (
        <>
        <ToolBar caption={"План"} onClick={(e)=>{setSelectedRows(selectedRows.map(r=>false))}}>
            <InformationBar {...info}/>
            <hr/>
            <ToolButtonBar>
                <ToolButton id={"new"} title={"Очистить список"} onClick={() => dispatch(MessagesActions.confirmClearingUnitListInPlan())} disabled={state.unitList.length===0}/>
                <ToolButton id={"open"} title={"Загрузить список"} onClick={() => dispatch(MessagesActions.openPlan(state.library))} />
                <ToolButton id={"save"} title={"Сохранить список"} onClick={() => dispatch(StateActions.savePlan())} disabled={state.unitList.length===0}/>
                <ToolButton id={"delete"} title={"Удалить выделенные строки"} onClick={() => dispatch(MessagesActions.confirmDeletingUnitsFromPlan(selectedRows))} disabled={selectedRows.every(r=>!r)||(selectedRows.length===0)}/>
                <ToolButton id={"up"} title={"Переместить вверх"} onClick={() => {dispatch(StateActions.moveUp(onlySelectedRowIndexes[0]));setSelectedRows(moveSelectedRowUp(onlySelectedRowIndexes[0]))}} disabled={(onlySelectedRowIndexes.length!==1)||(selectedRows[0])}/>
                <ToolButton id={"down"} title={"Переместить вниз"} onClick={() => {dispatch(StateActions.moveDown(onlySelectedRowIndexes[0]));;setSelectedRows(moveSelectedRowDown(onlySelectedRowIndexes[0]))}} disabled={(onlySelectedRowIndexes.length!==1)||(selectedRows[selectedRows.length-1])}/>
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

