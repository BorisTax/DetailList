import { Action, State } from ".";
const initialState: State={
    library: {
        type:"",
        version:"",
        material: [],
        rootGroups:[]
    },
    detailList: [],
    unitList: [],
    materials:[],
    activeMaterial:undefined
}
const stateReducer = (state : State = initialState, action : Action)=>{
    switch (action.type){
        default:
             return state;
    }
}

export default stateReducer;