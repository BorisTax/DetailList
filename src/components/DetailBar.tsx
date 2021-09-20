import React, { FC, ReactFragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateActions } from '../actions/StateActions';
import '../styles/App.css';
import { TDetail, TLibraryDetail, TLibraryGroup, TLibraryRootGroup, TLibraryUnit } from '../data/types';
import { RootState } from '../reducers';
import ComboBox from './ComboBox';
import ToolBar from './ToolBar';

const DetailBar: FC = (props) => {
    const state = useSelector((store: RootState)=>store.state)
    const activeRootGroup: string = state.activeRootGroup
    const activeGroup: string = state.activeGroup
    const activeUnit: string = state.activeUnit
    const root: TLibraryRootGroup|undefined = state.library.rootGroups.find((rg:TLibraryRootGroup)=>rg.name===activeRootGroup)
    const group: TLibraryGroup|undefined = root?.groups?.find((g:TLibraryGroup)=>g.name===activeGroup)
    const unit: TLibraryUnit|undefined = group?.units.find((u:TLibraryUnit)=>u.name===activeUnit)
    const unitShortName = unit?.shortName
    const details = unit?.details.map((d: TLibraryDetail,index:number) => {
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
    const dispatch = useDispatch()
        return (
        <>
        <ToolBar caption={`Детали ${unitShortName||""}`}>
            <table>
                <tbody>
                  {details}  
                </tbody>
            </table>
        </ToolBar>
        </>
        );
    }
export default DetailBar

