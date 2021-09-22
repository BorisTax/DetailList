import { Action, State } from ".";
import { StateActions } from "../actions/StateActions";
import { UnitListWorker } from "../data/classes";
import { TUnit } from "../data/types";
export const initLybrary={
        type:"",
        version:"",
        materials: [],
        rootGroups:[]
}
const initialState: State={
    library: initLybrary,
    detailList: [],
    unitList: [],
    materials:[],
    activeRootGroup:"",
    activeRootGroupIndex:0,
    activeGroup:"",
    activeGroupIndex:0,
    activeUnit:"",
    activeUnitIndex:0,
    activeLibraryMaterials:[],
    activeUnitCount: 1

}
const stateReducer = (state : State = initialState, action : Action)=>{
    const payload:any = action.payload
    var activeRootGroupIndex:number
    var activeGroupIndex:number
    var activeUnitIndex:number
    var activeRootGroup:string
    var activeGroup:string
    var activeUnit:string
    switch (action.type){
            case StateActions.ADD_ACTIVE_UNIT:
                const unit = state.library.rootGroups[state.activeRootGroupIndex].groups[state.activeGroupIndex].units[state.activeUnitIndex]
                const mat=Array(unit.materialsCount).fill(0).map((_, index:number) => state.library.materials[state.activeLibraryMaterials[index]].name)
                const newUnit: TUnit = {
                    name: unit.name,
                    shortName: unit.shortName,
                    groupName: state.activeGroup,
                    rootGroupName: state.activeRootGroup,
                    count: state.activeUnitCount,
                    details:[...unit.details],
                    materialsCount: unit.materialsCount,
                    materials: mat
                }
                const dList = UnitListWorker.addUnit(state.unitList,newUnit)
                return {...state, detailList: dList, activeUnitCount:1}
        case StateActions.SET_ACTIVE_UNIT_COUNT:
                    return {...state, activeUnitCount: payload}
        case StateActions.SET_LIBRARY:
            const activeFields={
                activeRootGroupIndex : 0, 
                activeRootGroup : payload.rootGroups[0].name,
                activeGroupIndex : 0,
                activeGroup : payload.rootGroups[0].groups[0].name,
                activeUnitIndex : 0,
                activeUnit : payload.rootGroups[0].groups[0].units[0].name,
                activeLibraryMaterials: Array(payload.rootGroups[0].groups[0].units[0].materialCount).fill(0)
            }
            return {...state,library:action.payload, ...activeFields}
        case StateActions.SET_ACTIVE_ROOT_GROUP:
            activeRootGroupIndex = payload
            activeRootGroup = state.library.rootGroups[activeRootGroupIndex].name
            return {...state,activeRootGroupIndex,activeRootGroup}
        case StateActions.SET_ACTIVE_GROUP:
            activeGroupIndex = payload
            activeGroup = state.library.rootGroups[state.activeRootGroupIndex].groups[activeGroupIndex].name
            activeUnit = state.library.rootGroups[state.activeRootGroupIndex].groups[activeGroupIndex].units[0].name
            return {...state,activeGroup,activeGroupIndex,activeUnit,activeUnitIndex:0}
        case StateActions.SET_ACTIVE_UNIT:
            activeUnitIndex = payload
            activeUnit = state.library.rootGroups[state.activeRootGroupIndex].groups[state.activeGroupIndex].units[activeUnitIndex].name
            return {...state,activeUnit,activeUnitIndex}
        case StateActions.SET_ACTIVE_LIBRARY_MATERIAL:
            const materialIndex = state.library.materials.findIndex(m => m.name===payload.material)
            state.activeLibraryMaterials[payload.index] = materialIndex
            return {...state}
            default:
             return state;
    }
}

export default stateReducer;