import { count } from 'console';
import React, { FC, ReactFragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateActions } from '../actions/StateActions';

import { TLibraryGroup, TLibraryRootGroup, TLibraryUnit, TMaterial, TUnit } from '../data/types';
import { RootState, State } from '../reducers';
import ComboBox from './ComboBox';
import Counter from './Counter';
import ToolBar from './ToolBar';

const UnitListBar: FC = (props) => {
    const state: State = useSelector((store: RootState)=>store.state)
    const dispatch = useDispatch()
    const header=<tr>
            <th>Вид</th>
            <th>Модуль</th>
            <th>Кол-во</th>
            <th>Материал 1</th>
            <th>Материал 2</th>
            </tr>
    const units = state.unitList.map((u: TUnit, index:number) => {
            return <tr key={index}>
                    <td className="tdLeft">{u.groupName}</td>
                    <td className="tdLeft">{u.name}</td>
                    <td>{u.count}</td>
                    {u.materials.map((m, index)=><td key={index}>{m}</td>)}
                </tr>
    })
        return (
        <>
        <ToolBar caption={"План"}>
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

