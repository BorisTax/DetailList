import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/App.css';
import { TDetail } from '../data/types';
import { RootState } from '../reducers';
import ComboBox from './ComboBox';
import ToolBar from './ToolBar';
import CheckBox from './CheckBox';
import { StateActions } from '../actions/StateActions';
import ToolButtonBar from './ToolButtonBar';
import ToolButton from './ToolButton';
import { DetailListWorker } from '../data/classes';
import Counter from './Counter';

const DetailListBar: FC = (props) => {
    const state = useSelector((store: RootState)=>store.state)
    const dispatch = useDispatch()
    const curMaterials: string[] = Object.keys(state.detailList)
    const curMaterialName: string = state.activeDetailListMaterial||curMaterials[0]
    const heads = DetailListWorker.getHeaders(state.showEdgeColumn)
    const header=<tr>
                    {heads.map(h=><th key={h}>{h}</th>)}
                </tr>
    const curMaterial = state.library?.materials.find(m=>m.name===curMaterialName)
    let detCount = 0
    const details = state.detailList[curMaterialName]?.map((d: TDetail,index:number) => {
            let modules: string[] = []
            if ((d.modules?.size||0) > 1) d.modules?.forEach((value, key) => modules.push(`${key}-${value}`)); else modules[0] = d.modules?.keys().next().value;
            let edgeLength=""
            let edgeWidth=""
            detCount += d.count
            if(d.edgeLength1||d.edgeLength2) edgeLength="singleEdge"
            if(d.edgeLength1&&d.edgeLength2) edgeLength="doubleEdge"
            if(d.edgeWidth1||d.edgeWidth2) edgeWidth="singleEdge"
            if(d.edgeWidth1&&d.edgeWidth2) edgeWidth="doubleEdge"
            const td=[]
            td.push(<td className="tdLeft">{index+1}</td>)
            td.push(<td className="tdLeft">{d.name}</td>)
            td.push(<td className={edgeLength}>{d.length}</td>)
            td.push(<td className={edgeWidth}>{d.width}</td>)
            td.push(<td>{d.count}</td>)
            if(state.showEdgeColumn) td.push(<td>{d.edgeColumn}</td>)
            td.push(<td>{d.paz}</td>)
            td.push(<td>{d.comment}</td>)
            td.push(<td className="tdLeft">{modules.join(', ')}</td>)
            return <tr key={index}>
                    {td}
                </tr>
    })
    const edge = curMaterialName&&state.materialData.totalEdgeLength[curMaterialName]?Object.keys(state.materialData.totalEdgeLength[curMaterialName]).map(edge=><div>{`Кромка ${edge}мм - ${state.materialData.totalEdgeLength[curMaterialName][edge]}м`}</div>):<></>
    const materialDiv = curMaterials.length?<div style={{fontSize:"small"}}>
                    <CheckBox value={state.groupDetailsByUnits} title={"Объединять детали по модулям"} onChange={(value)=>dispatch(StateActions.groupDetailsByUnits(value))}/>
                    <CheckBox value={state.showEdgeColumn} title={"Отображать доп. столбец по кромке"} onChange={(value)=>dispatch(StateActions.showEdgeColumn(value))}/>
                    <ComboBox title={"Материал:"} items={curMaterials} value={curMaterialName} onChange={((_, value)=>dispatch(StateActions.setActiveDetailListMaterial(value)))}/>
                    <div>{`Размер плиты: ${curMaterial?.length}x${curMaterial?.width}`}</div>
                    <div style={{display:"flex"}}>
                        <Counter title={'Плит: '} value={state.materialData.plateCount[curMaterialName]} min={1} max={10000} setValue={(value)=>dispatch(StateActions.setActiveDetailListMaterialCount(value))}/>
                    </div>
                        
                    {edge}
                    <div>{`Деталей: ${detCount}`}</div>
                </div>:<></>
        return (
        <ToolBar caption={`Общий список деталей`}>
            <ToolButtonBar>
                <ToolButton id = {"giblab"} title = {"Экспорт в Giblab"} onClick={() => {dispatch(StateActions.exportGiblab(curMaterialName))}} disabled={!details||(details.length===0)}/>
                <ToolButton id = {"basis"} title = {"Экспорт в Базис-Раскрой"} onClick={() => {dispatch(StateActions.exportBasis(curMaterialName))}} disabled={!details||(details.length===0)}/>
                <ToolButton id = {"vacuum"} title = {"Экспорт для вакуумировки"} onClick={() => {dispatch(StateActions.exportVacuum(curMaterialName))}} disabled={!details||(details.length===0)}/>
            </ToolButtonBar>
            {materialDiv}
            <div className="tableContainer">
            <table id={"resultTable"}>
                {header}
                <tbody>
                  {details}  
                </tbody>
            </table>
            </div>
        </ToolBar>
        );
    }
export default DetailListBar

