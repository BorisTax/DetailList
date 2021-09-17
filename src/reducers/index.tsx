import { combineReducers } from "redux";
import stateReducer from "./state";

const rootReducer = combineReducers({
         state: stateReducer
    })


export type State = {

}
export type Action = {
    type:string
    payload:object
}

export default rootReducer