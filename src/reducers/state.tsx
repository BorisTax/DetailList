import { Action, State } from ".";

const stateReducer = (state : State = {}, action : Action)=>{
    switch (action.type){
        default:
             return state;
    }
}

export default stateReducer;