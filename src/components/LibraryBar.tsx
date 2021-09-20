import React, { FC, ReactFragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateActions } from '../actions/StateActions';

import { TLibraryGroup, TLibraryRootGroup, TLibraryUnit } from '../data/types';
import { RootState } from '../reducers';
import ComboBox from './ComboBox';
import ToolBar from './ToolBar';

const LibraryBar: FC = (props) => {
    const state = useSelector((store: RootState)=>store.state)
    const activeRootGroup: string = state.activeRootGroup
    const activeGroup: string = state.activeGroup
    const activeUnit: string = state.activeUnit
    const rootGroups: string[] = state.library.rootGroups.map((rg: TLibraryRootGroup) => rg.name)
    const root: TLibraryRootGroup|undefined = state.library.rootGroups.find((rg:TLibraryRootGroup)=>rg.name===activeRootGroup)
    let groups: string[]|undefined = root?.groups.map((g: TLibraryGroup) => g.name)
    const group: TLibraryGroup|undefined = root?.groups?.find((g:TLibraryGroup)=>g.name===activeGroup)
    const units: string[]|undefined = group?.units.map((u: TLibraryUnit) => u.name)
    if(!groups) groups = []

    const dispatch = useDispatch()
        return (
        <>
        <ToolBar caption={"Библиотека"}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"stretch",fontSize:"small"}}>
                <button onClick={()=>dispatch(StateActions.openLibrary())}>Загрузить</button>
                <br/>
                {rootGroups.length>0?<div><ComboBox items={rootGroups} title={`Группа:`} onChange={(value: string)=>{dispatch(StateActions.setActiveRootGroup(value))}}/></div>:<></>}
                {groups.length>0?<div><ComboBox items={groups} title={"Вид:"} onChange={(value: string)=>{dispatch(StateActions.setActiveGroup(value))}}/></div>:<></>}
                {activeUnit}
                {units?<div><ComboBox items={units} title="" size={15} onChange={(value)=>{dispatch(StateActions.setActiveUnit(value))}}/></div>:<></>}
            </div>
        </ToolBar>
        </>
        );
    }
export default LibraryBar

