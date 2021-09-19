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
                <button onClick={()=>dispatch(StateActions.openLibrary())}>Загрузить</button>
                <br/>
                {rootGroups.length>0?<div><ComboBox items={rootGroups} onChange={(value: string)=>{dispatch(StateActions.setActiveRootGroup(value))}}/></div>:<></>}
                {groups.length>0?<div><ComboBox items={groups} onChange={(value: string)=>{dispatch(StateActions.setActiveGroup(value))}}/></div>:<></>}
                {units?<div><ComboBox items={units} size={15} onChange={()=>{}}/></div>:<></>}
        </ToolBar>
        </>
        );
    }
export default LibraryBar

