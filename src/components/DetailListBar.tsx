import React, { FC, ReactFragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateActions } from '../actions/StateActions';
import '../styles/App.css';
import { TDetail, TLibraryDetail, TLibraryGroup, TLibraryRootGroup, TLibraryUnit } from '../data/types';
import { RootState } from '../reducers';
import ComboBox from './ComboBox';
import ToolBar from './ToolBar';

const DetailListBar: FC = (props) => {
    const state = useSelector((store: RootState)=>store.state)
    const header=<tr>
                <th>Название</th>
                <th>Длина</th>
                <th>Ширина</th>
                <th>Кол-во</th>
                <th>Паз</th>
                <th>Прим.</th>
                <th>Модуль</th>
                </tr>
    const details = state.detailList.map((d: TDetail,index:number) => {
            let modules: string[] = []
            if ((d.modules?.size||0) > 1) d.modules?.forEach((value, key) => modules.push(`${key}-${value}`)); else modules[0] = d.modules?.keys().next().value;
            let edgeLength=""
            let edgeWidth=""
            if(d.edgeLength1||d.edgeLength2) edgeLength="singleEdge"
            if(d.edgeLength1&&d.edgeLength2) edgeLength="doubleEdge"
            if(d.edgeWidth1||d.edgeWidth2) edgeWidth="singleEdge"
            if(d.edgeWidth1&&d.edgeWidth2) edgeWidth="doubleEdge"
            return <tr key={index}>
                    <td className="tdLeft">{d.name}</td>
                    <td className={edgeLength}>{d.length}</td>
                    <td className={edgeWidth}>{d.width}</td>
                    <td>{d.count}</td>
                    <td>{d.paz}</td>
                    <td>{d.comment}</td>
                    <td>{modules.join(', ')}</td>
                </tr>
    })
    const dispatch = useDispatch()
        return (
        <>
        <ToolBar caption={`Общий список деталей`}>
            <table>
                {header}
                <tbody>
                  {details}  
                </tbody>
            </table>
        </ToolBar>
        </>
        );
    }
export default DetailListBar

