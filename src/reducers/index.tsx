import { combineReducers } from "redux";
import { TDetail, TLibrary, TMaterial, TUnit } from "../data/types";
import messagesReducer from "./messages";
import stateReducer from "./state";
const rootReducer = combineReducers({
         state: stateReducer,
         messages: messagesReducer
    })

 export type RootState = {
         state: State,
         messages: Messages
 }


export type State = {
    library: TLibrary,
    detailList: TDetail[]
    unitList: TUnit[]
    materials: TMaterial[]
    activeRootGroup:string
    activeRootGroupIndex:number
    activeGroup:string
    activeGroupIndex:number
    activeUnit:string
    activeUnitIndex:number
    activeLibraryMaterials:number[]
    activeUnitCount:number
}
export type Messages = {
        type:'alert'|'confirm'
        show:boolean
        title:string
        onOkAction:()=>Action
}
export type Action = {
    type:string
    payload?:object
}

export default rootReducer