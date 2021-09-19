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
    activeGroup:""

}
const stateReducer = (state : State = initialState, action : Action)=>{
    const payload:any = action.payload
    switch (action.type){
        case StateActions.SET_LIBRARY:
            const activeRootGroup = payload.rootGroups[0].name
            const activeGroup = payload.rootGroups[0].groups[0].name
            return {...state,library:action.payload,activeRootGroup,activeGroup}
        case StateActions.SET_ACTIVE_ROOT_GROUP:
            return {...state,activeRootGroup: payload}
        case StateActions.SET_ACTIVE_GROUP:
            return {...state,activeGroup: payload}
            default:
             return state;
    }
}

export default stateReducer;