import { combineReducers } from "redux";
import { TDetail, TLibrary, TMaterial, TUnit } from "../data/types";
import stateReducer from "./state";
const rootReducer = combineReducers({
         state: stateReducer
    })

 export type RootState = {
         state: State
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
export type Action = {
    type:string
    payload:object
}

export default rootReducer