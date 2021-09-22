import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import '../styles/App.css';
import { TDetail, TLibraryGroup, TLibraryRootGroup, TLibraryUnit } from '../data/types';
import { RootState } from '../reducers';
import ToolBar from './ToolBar';

const DetailBar: FC = (props) => {
    const state = useSelector((store: RootState)=>store.state)
    const root: TLibraryRootGroup|undefined = state.library.rootGroups[state.activeRootGroupIndex]
    const group: TLibraryGroup|undefined = root?.groups[state.activeGroupIndex]
    const unit: TLibraryUnit|undefined = group?.units[state.activeUnitIndex]
    const unitShortName = unit?.shortName
    const header=<tr>
                <th>Название</th>
                <th>Длина</th>
                <th>Ширина</th>
                <th>Кол-во</th>
                <th>Паз</th>
                <th>Прим.</th>
                </tr>
    const details = unit?.details.map((d: TDetail,index:number) => {
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
                </tr>
    })
        return (
        <>
        <ToolBar caption={`Детали ${unitShortName||""}`}>
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
export default DetailBar

