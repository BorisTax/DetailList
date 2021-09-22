import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateActions } from '../actions/StateActions';

import { TLibraryGroup, TLibraryRootGroup, TLibraryUnit } from '../data/types';
import { RootState, State } from '../reducers';
import ComboBox from './ComboBox';
import Counter from './Counter';
import ToolBar from './ToolBar';

const LibraryBar: FC = (props) => {
    const state: State = useSelector((store: RootState)=>store.state)
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
    const materialsList=[]
    for(let i=0;i<group?.units[state.activeUnitIndex].materialsCount;i++)
        materialsList.push(<ComboBox 
                                key={i} 
                                value={state.library.materials[state.activeLibraryMaterials[i]].name} 
                                items={state.library.materials.map(m=>m.name)}
                                title={`Материал ${i+1}`}
                                onChange={(index, value)=>{dispatch(StateActions.setActiveLibraryMaterial(i, value))}}
                                />)
    const materialsDiv=<div>
            {materialsList}
    </div>

    const activeUnitDiv=<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"5px 0px"}}>
                            <span>{activeUnitShort}</span>
                            <div style={{display:"flex",alignItems:"center"}}>
                            <Counter value={state.activeUnitCount} min={1} max={10000} setValue={(value)=>dispatch(StateActions.setActiveUnitCount(value))}/>
                            <button onClick={()=>dispatch(StateActions.addActiveUnit())}>{"Добавить в план >>"}</button>
                            </div>
                        </div>
    const dispatch = useDispatch()
        return (
        <>
        <ToolBar caption={"Библиотека"}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"stretch",fontSize:"small"}}>
                <button onClick={()=>dispatch(StateActions.openLibrary())}>Загрузить</button>
                <br/>
                {rootGroups.length>0?<div><ComboBox value={activeRootGroup} items={rootGroups} title={`Группа:`} onChange={(value: number)=>{dispatch(StateActions.setActiveRootGroup(value))}}/></div>:<></>}
                {groups.length>0?<div><ComboBox value={activeGroup} items={groups} title={"Вид:"} onChange={(value: number)=>{dispatch(StateActions.setActiveGroup(value))}}/></div>:<></>}
                {units?<div><ComboBox value={activeUnit} items={units} title="" size={15} onChange={(value)=>{dispatch(StateActions.setActiveUnit(value))}}/></div>:<></>}
                {materialsDiv}
                {units?activeUnitDiv:<></>}
            </div>
        </ToolBar>
        </>
        );
    }
export default LibraryBar

