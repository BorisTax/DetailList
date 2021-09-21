import { count } from 'console';
import React, { FC, ReactFragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateActions } from '../actions/StateActions';

import { TLibraryGroup, TLibraryRootGroup, TLibraryUnit } from '../data/types';
import { RootState } from '../reducers';
import ComboBox from './ComboBox';
import Counter from './Counter';
import ToolBar from './ToolBar';

const LibraryBar: FC = (props) => {
    const state = useSelector((store: RootState)=>store.state)
    const [count, setCount] = useState(1);
    const activeRootGroup: string = state.activeRootGroup
    const activeGroup: string = state.activeGroup
    const activeUnit: string = state.activeUnit
    const rootGroups: string[] = state.library.rootGroups.map((rg: TLibraryRootGroup) => rg.name)
    const root: TLibraryRootGroup|undefined = state.library.rootGroups[state.activeRootGroupIndex]
    let groups: string[]|undefined = root?.groups.map((g: TLibraryGroup) => g.name)
    const group: TLibraryGroup|undefined = root?.groups[state.activeGroupIndex]
    const units: string[]|undefined = group?.units.map((u: TLibraryUnit) => u.name)
    const activeUnitShort: string|undefined = group?.units[state.activeUnitIndex].shortName
    if(!groups) groups = []
    const activeUnitDiv=<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"5px 0px"}}>
                            <span>{activeUnitShort}</span>
                            <Counter value={count} min={1} max={10000} setValue={setCount}/>
                            <button>{"Добавить >>"}</button>
                        </div>
    const dispatch = useDispatch()
        return (
        <>
        <ToolBar caption={"Библиотека"}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"stretch",fontSize:"small"}}>
                <button onClick={()=>dispatch(StateActions.openLibrary())}>Загрузить</button>
                <br/>
                {rootGroups.length>0?<div><ComboBox items={rootGroups} title={`Группа:`} onChange={(value: number)=>{dispatch(StateActions.setActiveRootGroup(value))}}/></div>:<></>}
                {groups.length>0?<div><ComboBox items={groups} title={"Вид:"} onChange={(value: number)=>{dispatch(StateActions.setActiveGroup(value))}}/></div>:<></>}
                {activeUnitDiv}
                {units?<div><ComboBox items={units} title="" size={15} onChange={(value)=>{dispatch(StateActions.setActiveUnit(value))}}/></div>:<></>}
            </div>
        </ToolBar>
        </>
        );
    }
export default LibraryBar

