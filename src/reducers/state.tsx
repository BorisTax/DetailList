import { Action, State } from ".";
import { StateActions } from "../actions/StateActions";
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
    activeMaterial:undefined,
    activeRootGroup:"",
    activeRootGroupIndex:0,
    activeGroup:"",
    activeGroupIndex:0,
    activeUnit:"",
    activeUnitIndex:0


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
        case StateActions.SET_LIBRARY:
            activeRootGroupIndex = 0 
            activeRootGroup = payload.rootGroups[0].name
            activeGroupIndex = 0
            activeGroup = payload.rootGroups[0].groups[0].name
            activeUnitIndex = 0
            activeUnit = payload.rootGroups[0].groups[0].units[0].name
            return {...state,library:action.payload,activeRootGroup,activeRootGroupIndex,activeGroup,activeGroupIndex,activeUnit,activeUnitIndex}
        case StateActions.SET_ACTIVE_ROOT_GROUP:
            activeRootGroupIndex = payload
            activeRootGroup = state.library.rootGroups[activeRootGroupIndex].name
            return {...state,activeRootGroupIndex,activeRootGroup}
        case StateActions.SET_ACTIVE_GROUP:
            activeGroupIndex = payload
            activeGroup = state.library.rootGroups[state.activeRootGroupIndex].groups[activeGroupIndex].name
            var activeUnit = state.library.rootGroups[state.activeRootGroupIndex].groups[activeGroupIndex].units[0].name
            return {...state,activeGroup: payload,activeGroupIndex,activeUnit,activeUnitIndex:0}
        case StateActions.SET_ACTIVE_UNIT:
            activeUnitIndex = payload
            activeUnit = state.library.rootGroups[state.activeRootGroupIndex].groups[state.activeGroupIndex].units[activeUnitIndex].name
            return {...state,activeUnit,activeUnitIndex}
            default:
             return state;
    }
}

export default stateReducer;