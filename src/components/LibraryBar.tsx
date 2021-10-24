import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateActions } from '../actions/StateActions';
import 'bootstrap/dist/css/bootstrap.min.css'
import { TLibraryGroup, TLibraryRootGroup, TLibraryUnit, TMaterial } from '../data/types';
import { RootState, State } from '../reducers';
import ComboBox from './ComboBox';
import Counter from './Counter';
import DetailBar from './DetailBar';
import InputLineBar from './InputLineBar';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
import ToolButtonBar from './ToolButtonBar';
import { MessagesActions } from '../actions/MessagesActions';
import { getMaterialInputForm } from '../data/inputforms';

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
    const details = group?.units[state.activeUnitIndex].details
    if(!groups) groups = []
    const materialsList=[]
    for(let i=0;i<group?.units[state.activeUnitIndex].materialsCount;i++)
        materialsList.push(<InputLineBar>
                            <ComboBox 
                                value={state.library.materials[state.activeLibraryMaterials[i]].name} 
                                items={state.library.materials.map(m=>m.name)}
                                title={`Материал ${i+1}`}
                                onChange={(index, value)=>{dispatch(StateActions.setActiveLibraryMaterial(i, value))}}
                                />
                            <ToolButton id='edit' onClick={()=>{
                                const materials = state.library.materials.map((m: TMaterial)=>m.name).filter(m=>m!==state.library.materials[state.activeLibraryMaterials[i]].name)
                                const inputForm = getMaterialInputForm(materials,state.library.materials[state.activeLibraryMaterials[i]], false)
                                dispatch(MessagesActions.showMaterialEditDialog(inputForm, false, state.activeLibraryMaterials[i]))}
                                }/>
                            <ToolButton id='add' onClick={()=>{
                                const materials = state.library.materials.map((m: TMaterial)=>m.name)
                                const inputForm = getMaterialInputForm(materials,state.library.materials[state.activeLibraryMaterials[i]], true)
                                dispatch(MessagesActions.showMaterialEditDialog(inputForm, true, 0))}
                                }/>
                            </InputLineBar>) 
    const materialsDiv=<div>
            {materialsList}
    </div>

    const activeUnitDiv=<div style={{display:"flex",alignItems:"center",margin:"5px 0px"}}>
                            <span>{'Кол-во: '}</span>
                            <div style={{display:"flex",alignItems:"center"}}>
                            <Counter value={state.activeUnitCount} ten={true} min={1} max={10000} setValue={(value)=>dispatch(StateActions.setActiveUnitCount(value))}/>
                            <button onClick={()=>dispatch(StateActions.addActiveUnit())}>{"Добавить в план >>"}</button>
                            </div>
                        </div>
    const dispatch = useDispatch()
        return (
        <ToolBar caption={"Библиотека"}>
            
                <ToolButtonBar>
                    <ToolButton id={"open"} title={"Загрузить"} onClick={()=>dispatch(StateActions.openLibrary())}/>
                    <ToolButton id={"save"} title={"Сохранить"} onClick={()=>dispatch(StateActions.saveLibrary())} disabled={!state.library.type}/>
                </ToolButtonBar>
            <div style={{display:"grid",gridTemplateColumns:"60px auto auto", gridAutoColumns:'minmax(100px, min-content)', fontSize:"small"}}>
                {(rootGroups.length > 0) && <>
                                             <div className='textRight'>{`Группа:`}</div>   
                                             <ComboBox value={activeRootGroup} items={rootGroups} title={``} onChange={(index: number)=>{dispatch(StateActions.setActiveRootGroup(index))}}/>
                                                <div>
                                                <ToolButton id='edit' onClick={()=>{}}/>
                                                <ToolButton id='add' onClick={()=>{}}/>
                                                </div>
                                            </>}
                {(groups.length > 0) && <>
                                            <div className='textRight'>{'Вид:'}</div>  
                                            <ComboBox value={activeGroup} items={groups} title={""} onChange={(index: number)=>{dispatch(StateActions.setActiveGroup(index))}}/>
                                            <div>
                                            <ToolButton id='edit' onClick={()=>{}}/>
                                            <ToolButton id='add' onClick={()=>{}}/>
                                            </div>
                                        </>}
                {units && <>
                            <div className='textRight'>{`Модуль:`}</div>  
                            <ComboBox value={activeUnit} items={units} title={""} onChange={(index)=>{dispatch(StateActions.setActiveUnit(index))}}/>
                            <div>
                            <ToolButton id='edit' onClick={()=>{}}/>
                            <ToolButton id='add' onClick={()=>{}}/>
                            </div>
                        </>}
                
            </div>
            {materialsDiv}
            {units?activeUnitDiv:<></>}
            {details?<DetailBar details={details||[]} unitShortName={activeUnitShort}/>:<></>}
        </ToolBar>
        );
    }
export default LibraryBar

