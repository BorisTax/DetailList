import React, { FC, useState } from 'react';
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

const DetailListBar: FC = (props) => {
    const state = useSelector((store: RootState)=>store.state)
    const dispatch = useDispatch()
    const materialSet = new Set()
    state.detailList.forEach((d: TDetail) => {if(!materialSet.has(d.material)) materialSet.add(d.material)})
    const curMaterials:string[] = Array.from(materialSet) as string[]
    const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0)
    const heads=state.showEdgeColumn?['№','Название','Длина','Ширина','Кол-во','Кромка','Паз','Прим.','Модуль']:['№','Название','Длина','Ширина','Кол-во','Паз','Прим.','Модуль']
    const header=<tr>
                    {heads.map(h=><th key={h}>{h}</th>)}
                </tr>
    const details = state.detailList.filter((d: TDetail) => d.material === curMaterials[currentMaterialIndex]).map((d: TDetail,index:number) => {
            let modules: string[] = []
            if ((d.modules?.size||0) > 1) d.modules?.forEach((value, key) => modules.push(`${key}-${value}`)); else modules[0] = d.modules?.keys().next().value;
            let edgeLength=""
            let edgeWidth=""
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
        return (
        <>
        <ToolBar caption={`Общий список деталей`}>
            <ToolButtonBar>
                <ToolButton id={"giblab"} title={"Экспорт в Giblab"} onClick={() => {dispatch(StateActions.exportGiblab(curMaterials[currentMaterialIndex]))}} disabled={state.detailList.length===0}/>
                <ToolButton id={"basis"} title={"Экспорт в Базис-Раскрой"} onClick={() => {}} disabled={state.detailList.length===0}/>
                <ToolButton id={"excel"} title={"Экспорт в Excel"} onClick={() => {dispatch(StateActions.exportExcel(curMaterials[currentMaterialIndex]))}} disabled={state.detailList.length===0}/>
            </ToolButtonBar>
            <CheckBox value={state.groupDetailsByUnits} title={"Объединять детали по модулям"} onChange={(value)=>dispatch(StateActions.groupDetailsByUnits(value))}/>
            <CheckBox value={state.showEdgeColumn} title={"Отображать доп. столбец по кромке"} onChange={(value)=>dispatch(StateActions.showEdgeColumn(value))}/>
            <ComboBox title={"Материал:"} items={curMaterials} value={curMaterials[currentMaterialIndex]} onChange={(value=>setCurrentMaterialIndex(value))}/>
            <table id={"resultTable"}>
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

